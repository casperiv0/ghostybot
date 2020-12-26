import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import Link from "next/link";
import Head from "next/head";
import { dashboard } from "../../../../config.json";

const Guild = ({ guild, isAuth }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      return router.push("/login");
    }
    if (!guild.id) {
      return router.push("/dashboard?message=Guild was not found");
    }
  }, [guild, isAuth, router]);

  return (
    <>
      <Head>
        <title>Viewing {guild?.name} / {dashboard.botName} Dashboard</title>
      </Head>
      <div className="page-title">
        <h4>Current guild: {guild.name}</h4>
        <a className="btn btn-primary" href="/dashboard">
          Return
        </a>
      </div>

      <div className="grid">
        <Link href={`/dashboard/${guild.id}/commands`}>
          <a className="btn btn-primary">Custom commands</a>
        </Link>
        <Link href={`/dashboard/${guild.id}/manage-commands`}>
          <a className="btn btn-primary">Enable/disable commands</a>
        </Link>
        <Link href={`/dashboard/${guild.id}/manage-categories`}>
          <a className="btn btn-primary">Enable/disable categories</a>
        </Link>
        <Link href={`/dashboard/${guild.id}/settings`}>
          <a className="btn btn-primary">Guild Settings</a>
        </Link>
        <Link href={`/dashboard/${guild.id}/blacklisted-words`}>
          <a className="btn btn-primary">Manage blacklisted words</a>
        </Link>
        <Link href={`/dashboard/${guild.id}/store`}>
          <a className="btn btn-primary">Manage Store</a>
        </Link>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
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
}

export default Guild;
