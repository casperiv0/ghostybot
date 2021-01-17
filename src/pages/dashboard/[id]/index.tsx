import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { parseCookies } from "nookies";
import Link from "next/link";
import Head from "next/head";
import { dashboard } from "../../../../config.json";
import GuildData from "../../../interfaces/Guild";
import { GetServerSideProps } from "next";

interface Props {
  guild: GuildData;
  isAuth: boolean;
}

const Guild: FC<Props> = ({ guild, isAuth }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
    if (!guild.id) {
      router.push("/dashboard?message=Guild was not found");
      return;
    }
  }, [guild, isAuth, router]);

  return (
    <>
      <Head>
        <title>
          Viewing {guild?.name} - {dashboard.botName}
        </title>
      </Head>
      <div className="page-title">
        <h4>Current guild: {guild.name}</h4>
        <a className="btn btn-primary" href="/dashboard">
          Return
        </a>
      </div>

      <div className="grid">
        <Link href={`/dashboard/${guild.id}/commands`}>
          <a href={`/dashboard/${guild.id}/commands`} className="btn btn-primary">
            Custom commands
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/manage-commands`}>
          <a href={`/dashboard/${guild.id}/manage-commands`} className="btn btn-primary">
            Enable/disable commands
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/manage-categories`}>
          <a href={`/dashboard/${guild.id}/manage-categories`} className="btn btn-primary">
            Enable/disable categories
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/settings`}>
          <a href={`/dashboard/${guild.id}/settings`} className="btn btn-primary">
            Guild Settings
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/blacklisted-words`}>
          <a href={`/dashboard/${guild.id}/blacklisted-words`} className="btn btn-primary">
            Manage blacklisted words
          </a>
        </Link>
        <Link href={`/dashboard/${guild.id}/store`}>
          <a href={`/dashboard/${guild.id}/store`} className="btn btn-primary">
            Manage Store
          </a>
        </Link>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  const data = await (
    await fetch(`${dashboard.dashboardUrl}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json();

  return {
    props: {
      isAuth: data.error !== "invalid_token",
      guild: data?.guild || {},
    },
  };
};

export default Guild;
