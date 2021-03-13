import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Logger from "../../../modules/Logger";
import { openModal } from "../../../dashboard/components/modal";
import CreateCommandModal from "../../../dashboard/components/modal/create-command";
import EditCommandModal from "../../../dashboard/components/modal/edit-command";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import Guild from "../../../interfaces/Guild";

interface Props {
  guild: Guild;
  isAuth: boolean;
  error: string | undefined;
}

const CustomCommands: FC<Props> = ({ guild, isAuth, error }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
  }, [router, isAuth]);

  useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

  async function deleteCommand(name: string) {
    try {
      const data = await (
        await fetch(
          `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${
            guild.id
          }/commands?name=${encodeURIComponent(name)}`,
          {
            method: "DELETE",
          }
        )
      ).json();

      if (data.status === "success") {
        router.push(`/dashboard/${guild.id}/commands?message=${data.message}`);
      }

      setMessage(data?.error);
    } catch (e) {
      Logger.error("delete_command", e);
    }
  }

  function addCmd() {
    openModal("createCommandModal");
  }

  function handleEdit(name: string) {
    router.push({
      pathname: `/dashboard/${guild.guild_id}/commands`,
      query: {
        edit: name,
      },
    });
  }

  if (error) {
    return <AlertMessage type="error" message={error} />;
  }

  return (
    <>
      <Head>
        <title>Manage custom commands - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}</title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <CreateCommandModal guild={guild} />
      <EditCommandModal guild={guild} />
      <div className="page-title">
        <h4>{guild?.name} - Custom commands</h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              Return
            </a>
          </Link>
          <button className="btn btn-primary  ml-5" onClick={addCmd}>
            Add command
          </button>
        </div>
      </div>

      {guild?.custom_commands?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guild?.custom_commands?.map((cmd, idx) => {
              return (
                <tr key={idx}>
                  <td>{cmd.name}</td>
                  <td className="cmd-response">{cmd.response}</td>
                  <td className="table-actions">
                    <button onClick={() => deleteCommand(cmd.name)} className="btn btn-sm btn-red">
                      Delete
                    </button>
                    <button onClick={() => handleEdit(cmd.name)} className="btn btn-sm btn-green">
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>This guid does not have any custom commands yet</p>
      )}
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
      error: data?.error || null,
    },
  };
};

export default CustomCommands;
