import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback, FC } from "react";
import fetch from "node-fetch";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import Guild from "../../../interfaces/Guild";

interface Props {
  guild: Guild;
  isAuth: boolean;
  botCommands: string[];
  error: string | undefined;
}

const ManageCommands: FC<Props> = ({ botCommands, guild, isAuth, error }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [filtered, setFiltered] = useState(botCommands);
  const [length, setLength] = useState(20);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
  }, [router, isAuth]);

  const observer = useRef<IntersectionObserver>();
  const lastRef = useCallback(
    (node) => {
      if (length > botCommands.length) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLength((p) => p + 20);
        }
      });
      if (node) observer.current?.observe(node);
    },
    [length, botCommands],
  );

  useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

  function handleSearch(value: string) {
    let filter: string[];

    if (value === "@enabled") {
      filter = botCommands.filter((cmd) => {
        return !guild.disabled_commands.find((c) => c === cmd);
      });
    } else if (value === "@disabled") {
      filter = botCommands.filter((cmd) => {
        return !!guild.disabled_commands.find((c) => c === cmd);
      });
    } else {
      filter = botCommands.filter((cmd) => cmd.toLowerCase().includes(value.toLowerCase()));
    }

    setFiltered(filter);
  }

  async function updateCommand(type: string, cmdName: string) {
    const data = await (
      await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/commands`, {
        method: "PUT",
        body: JSON.stringify({
          name: cmdName,
          type: type,
        }),
      })
    ).json();

    if (data.status === "success") {
      router.push(
        `/dashboard/${guild.id}/manage-commands?message=Successfully ${
          type === "enable" ? "enabled" : "disabled"
        } command: ${cmdName}`,
      );
    }
  }

  if (error) {
    return <AlertMessage type="error" message={error} />;
  }

  return (
    <>
      <Head>
        <title>Manage commands - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}</title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <div className="page-title">
        <h4>{guild?.name} - Enable/disable commands</h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              Return
            </a>
          </Link>
        </div>
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="search">
          Search for commands
        </label>
        <input
          id="search"
          className="form-input"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search query | @enabled | @disabled"
        />
      </div>

      <div className="grid">
        {filtered
          ?.slice(0, length)
          ?.filter((cmd) => !["help", "enable", "disable"].includes(cmd))
          ?.map((cmd, idx) => {
            const isDisabled = guild.disabled_commands?.find((c) => c === cmd);
            return (
              <div ref={lastRef} id={`${idx}`} key={cmd} className="card cmd-card">
                <p>{cmd}</p>

                <div>
                  <button
                    onClick={() => updateCommand(isDisabled ? "enable" : "disable", cmd)}
                    className="btn btn-secondary"
                  >
                    {isDisabled ? "Enable" : "Disable"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  const data = await (
    await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json();

  return {
    props: {
      isAuth: data.error !== "invalid_token",
      guild: data?.guild || {},
      botCommands: data.botCommands || [],
      error: data?.error || null,
    },
  };
};

export default ManageCommands;
