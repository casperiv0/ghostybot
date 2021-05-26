import * as React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
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
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  guild: Guild | null;
  isAuth: boolean;
  error: string | undefined;
}

const CustomCommands: React.FC<Props> = ({ guild, isAuth, error }: Props) => {
  const [message, setMessage] = React.useState<string | null>(null);
  const [commands, setCommands] = React.useState<CustomCommand[]>(guild?.custom_commands ?? []);
  const router = useRouter();
  const { t } = useTranslation("guilds");
  const { t: commonT } = useTranslation("common");

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  React.useEffect(() => {
    setCommands(guild?.custom_commands ?? []);
  }, [guild?.custom_commands]);

  React.useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

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
        <title>
          {t("manage_custom_commands")} - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
        </title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <CreateCommandModal guild={guild} />
      <EditCommandModal guild={guild} />
      <div className="page-title">
        <h4>
          {guild?.name} - {t("manage_custom_commands")}
        </h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              {commonT("return")}
            </a>
          </Link>
          <button className="btn btn-primary  ml-5" onClick={addCmd}>
            {t("add_command")}
          </button>
        </div>
      </div>

      {commands?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("response")}</th>
              <th>{t("actions")}</th>
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
                      {t("delete")}
                    </button>
                    <button onClick={() => handleEdit(cmd.name)} className="btn btn-sm btn-green">
                      {t("edit")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>{t("no_commands")}</p>
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
      ...(await serverSideTranslations(ctx.locale!, ["guilds", "footer", "profile", "common"])),
      isAuth: data.error !== "invalid_token",
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default CustomCommands;
