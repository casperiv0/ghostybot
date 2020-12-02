import { parseCookies } from "nookies";
import { dashboard } from "../../../../config.json";
import fetch from "node-fetch";

const Settings = ({ guild }) => {
  return (
    <>
      <div className="page-title">
        <h4>{guild?.name} - Custom commands</h4>
        <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
          Return
        </a>
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
      isAuth: data.invalid_token ? false : true,
      guild: data?.guild,
    },
  };
}

export default Settings;
