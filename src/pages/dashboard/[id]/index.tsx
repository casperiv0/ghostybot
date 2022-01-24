import { useRouter } from "next/router";
import * as React from "react";
import { parseCookies } from "nookies";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Guild as GuildData } from "types/Guild";
import { AlertMessage } from "@components/AlertMessage";
import { Loader } from "@components/Loader";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  guild: GuildData | null;
  isAuth: boolean;
  error: string | undefined;
}

const Guild: React.FC<Props> = ({ guild, isAuth, error }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("guilds");
  const { t: commonT } = useTranslation("common");

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }

    if (!guild?.id) {
      router.push("/dashboard?message=Guild was not found");
    }
  }, [guild, isAuth, router]);

  if (!isAuth) {
    return <Loader full />;
  }

  if (error && isAuth) {
    return <AlertMessage type="error" message={error} />;
  }

  if (!guild) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Viewing {guild?.name} - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
        </title>
      </Head>
      <div className="page-title">
        <h4>
          {commonT("current_guild")}: {guild.name}
        </h4>
        <Link href="/dashboard">
          <a href="/dashboard" className="btn btn-primary">
            {commonT("return")}
          </a>
        </Link>
      </div>

      <div className="grid">
        <Link href={`/dashboard/${guild.id}/slash-commands`}>
          <a href={`/dashboard/${guild.id}/slash-commands`} className="btn btn-primary">
            {t("manage_slash_commands")}
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/manage-commands`}>
          <a href={`/dashboard/${guild.id}/manage-commands`} className="btn btn-primary">
            {t("manage_commands")}
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/manage-categories`}>
          <a href={`/dashboard/${guild.id}/manage-categories`} className="btn btn-primary">
            {t("manage_categories")}
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/settings`}>
          <a href={`/dashboard/${guild.id}/settings`} className="btn btn-primary">
            {t("settings")}
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/store`}>
          <a href={`/dashboard/${guild.id}/store`} className="btn btn-primary">
            {t("manage_store")}
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/reaction-role`}>
          <a href={`/dashboard/${guild.id}/reaction-role`} className="btn btn-primary">
            Manage Reaction Roles
          </a>
        </Link>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  const data = (await (
    await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json()) as any;

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["guilds", "footer", "profile", "common"])),
      isAuth: data.error !== "invalid_token",
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default Guild;
