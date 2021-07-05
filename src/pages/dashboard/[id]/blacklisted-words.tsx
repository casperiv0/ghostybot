import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import * as React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";
import AlertMessage from "@components/AlertMessage";
import { openModal } from "@components/modal";
import AddBlacklistedWord from "@components/modal/add-blacklistedword";
import Logger from "utils/Logger";
import Guild from "types/Guild";
import Loader from "@components/Loader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

interface Props {
  guild: Guild | null;
  isAuth: boolean;
  error: string | undefined;
}

const BlacklistedWords: React.FC<Props> = ({ guild, isAuth, error }: Props) => {
  const [message, setMessage] = React.useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation("guilds");
  const { t: commonT } = useTranslation("common");

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  React.useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

  async function deleteWord(word: string) {
    try {
      const data = await (
        await fetch(
          `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${
            guild?.id
          }/blacklisted-words?word=${encodeURIComponent(word)}`,
          {
            method: "DELETE",
          },
        )
      ).json();

      if (data.status === "success") {
        router.push(`/dashboard/${guild?.id}/blacklisted-words?message=${data.message}`);
      }

      setMessage(data?.error);
    } catch (e) {
      Logger.error("delete_blacklisted_words", e);
    }
  }

  function addWord() {
    openModal("addBlacklistedWord");
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
          {t("manage_blacklisted_words")} - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
        </title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <AddBlacklistedWord guild={guild} />
      <div className="page-title">
        <h4>
          {guild?.name} - {t("manage_blacklisted_words")}
        </h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              {commonT("return")}
            </a>
          </Link>
          <button className="btn btn-primary ml-5" onClick={addWord}>
            Add word
          </button>
        </div>
      </div>

      {guild.blacklistedwords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>{t("words")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {guild.blacklistedwords.map((word, idx) => {
              return (
                <tr key={idx}>
                  <td className="cmd-response">{word}</td>
                  <td className="table-actions">
                    <button onClick={() => deleteWord(word)} className="btn btn-sm btn-red">
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>{t("no_words")}</p>
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

export default BlacklistedWords;
