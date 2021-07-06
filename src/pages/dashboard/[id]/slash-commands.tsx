import * as React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Head from "next/head";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Logger from "utils/Logger";
import { openModal } from "@components/modal";
import CreateCommandModal from "@components/modal/create-command";
import EditCommandModal from "@components/modal/edit-command";
import AlertMessage from "@components/AlertMessage";
import Guild from "types/Guild";
import Loader from "@components/Loader";

interface Props {
  guild: Guild | null;
  isAuth: boolean;
  error: string | undefined;
}

const CustomSlashCommands: React.FC<Props> = ({ guild, isAuth, error }: Props) => {
  const [message, setMessage] = React.useState<string | null>(null);
  const [commands, setCommands] = React.useState(guild?.slash_commands ?? []);
  const router = useRouter();
  const { t } = useTranslation("guilds");
  const { t: commonT } = useTranslation("common");

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  React.useEffect(() => {
    setCommands(guild?.slash_commands ?? []);
  }, [guild?.slash_commands]);

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
          }/slash-commands?name=${encodeURIComponent(name)}`,
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
      pathname: `/dashboard/${guild?.guild_id}/slash-commands`,
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
          {t("manage_slash_commands")} - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
        </title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}

      <div className="page-title">
        <h4>
          {guild?.name} - {t("manage_slash_commands")}
        </h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              {commonT("return")}
            </a>
          </Link>
          {guild.slash_commands !== null ? (
            <button className="btn btn-primary  ml-5" onClick={addCmd}>
              {t("add_slash_command")}
            </button>
          ) : null}
        </div>
      </div>

      {guild.slash_commands !== null ? (
        <>
          <CreateCommandModal slash guild={guild} />
          <EditCommandModal slash guild={guild} />

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
                        <button
                          onClick={() => deleteCommand(cmd.name)}
                          className="btn btn-sm btn-red"
                        >
                          {t("delete")}
                        </button>
                        <button
                          onClick={() => handleEdit(cmd.name)}
                          className="btn btn-sm btn-green"
                        >
                          {t("edit")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>{t("no_slash_commands")}</p>
          )}
        </>
      ) : (
        <AlertMessage
          message={
            <>
              <a
                href={
                  "https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=applications.commands+bot&permissions=8"
                }
              >
                {t("re_authorize")}
              </a>
            </>
          }
        />
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

export default CustomSlashCommands;
