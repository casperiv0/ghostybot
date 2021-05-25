import * as React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";
import fetch from "node-fetch";
import AlertMessage from "@components/AlertMessage";
import Guild from "types/Guild";
import Loader from "@components/Loader";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  guild: Guild | null;
  isAuth: boolean;
  botCommands: string[];
  error: string | undefined;
}

const ManageCommands: React.FC<Props> = ({ botCommands, guild, isAuth, error }: Props) => {
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null>(null);
  const [filtered, setFiltered] = React.useState(botCommands);
  const [length, setLength] = React.useState(20);
  const { t } = useTranslation(["guilds", "common"]);

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  const observer = React.useRef<IntersectionObserver>();
  const lastRef = React.useCallback(
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

  React.useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

  function handleSearch(value: string) {
    let filter: string[];

    if (value === "@enabled") {
      filter = botCommands.filter((cmd) => {
        return !guild?.disabled_commands.find((c) => c === cmd);
      });
    } else if (value === "@disabled") {
      filter = botCommands.filter((cmd) => {
        return !!guild?.disabled_commands.find((c) => c === cmd);
      });
    } else {
      filter = botCommands.filter((cmd) => cmd.toLowerCase().includes(value.toLowerCase()));
    }

    setFiltered(filter);
  }

  async function updateCommand(type: string, cmdName: string) {
    const data = await (
      await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild?.id}/commands`, {
        method: "PUT",
        body: JSON.stringify({
          name: cmdName,
          type,
        }),
      })
    ).json();

    if (data.status === "success") {
      router.push(
        `/dashboard/${guild?.id}/manage-commands?message=Successfully ${
          type === "enable" ? "enabled" : "disabled"
        } command: ${cmdName}`,
      );
    }
  }

  if (!isAuth) {
    return <Loader full />;
  }

  if (error) {
    return <AlertMessage type="error" message={error} />;
  }

  if (!guild) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t("manage_commands")} - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
        </title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <div className="page-title">
        <h4>
          {guild?.name} - {t("manage_commands")}
        </h4>

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
          {t("search_for_commands")}
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
                    {isDisabled ? t("enable") : t("disable")}
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
      ...(await serverSideTranslations(ctx.locale!, ["guilds", "footer", "profile", "common"])),
      isAuth: data.error !== "invalid_token",
      botCommands: data.botCommands ?? [],
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default ManageCommands;
