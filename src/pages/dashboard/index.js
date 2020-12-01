import { parseCookies } from "nookies";
import Image from "next/image";
import { dashboard } from "../../../config.json";

const Dashboard = ({ guilds }) => {
  return (
    <>
      <h4 className="page-title">Please select a server</h4>

      <div className="grid">
        {guilds.map((guild, idx) => {
          return (
            <a
              href={guild.inGuild ? `/dashboard/${guild.id}` : null}
              key={idx}
              className={`card guild-card ${!guild.inGuild ? "disabled" : ""}`}
              aria-label={
                !guild.inGuild ? "The bot must be in this guild!" : null
              }
            >
              <Image
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`}
                width="65"
                height="65"
              />
              <p>{guild.name}</p>
            </a>
          );
        })}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const data = await (
    await fetch(`${dashboard.dashboardUrl}/api/guilds`, {
      headers: {
        Auth: cookies?.token,
      },
    })
  ).json();

  return {
    props: {
      guilds: data.guilds,
    },
  };
}

export default Dashboard;
