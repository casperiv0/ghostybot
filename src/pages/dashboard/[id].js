import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { dashboard } from "../../../config.json";

const Guild = ({ guild }) => {
  const router = useRouter();
  useEffect(() => {
    if (!guild.id) {
      return router.push("/dashboard?message=Guild was not found");
    }
  }, [guild]);

  return (
    <>
      <h4 className="page-title">Current guild: {guild.name}</h4>
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
      guild: data?.guild,
    },
  };
}

export default Guild;
