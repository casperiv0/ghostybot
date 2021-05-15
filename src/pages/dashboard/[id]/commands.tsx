import * as React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Logger from "handlers/Logger";
import { openModal } from "@components/modal";
import CreateCommandModal from "@components/modal/create-command";
import EditCommandModal from "@components/modal/edit-command";
import AlertMessage from "@components/AlertMessage";
import Guild from "types/Guild";
import Loader from "@components/Loader";
import { CustomCommand } from "@/src/models/Guild.model";

interface Props {
  guild: Guild | null;
  isAuth: boolean;
  error: string | undefined;
}

const CustomCommands: FC<Props> = ({ guild, isAuth, error }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const [commands, setCommands] = React.useState<CustomCommand[]>(guild?.custom_commands ?? []);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
  }, [router, isAuth]);

  useEffect(() => {
    setCommands(guild?.custom_commands ?? []);
  }, [guild?.custom_commands]);

  async function deleteCommand(name: string) {
    try {
      const data = await (
        await fetch(
          `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${
            guild?.id
          }/commands?name=${encodeURIComponent(name)}`,
          {
            method: "DELETE",
          },
        )
      ).json();

      if (data.status === "success") {
        setMessage(data.message);
        setCommands((prev) => prev.filter((v) => v.name.toLowerCase() !== name.toLowerCase()));
        return;
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
      pathname: `/dashboard/${guild?.guild_id}/commands`,
      query: {
        edit: name,
      },
    });
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

      {commands?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {commands?.map((cmd, idx) => {
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
        <p>This guild does not have any custom commands yet</p>
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
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default CustomCommands;
