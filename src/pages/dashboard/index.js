import { parseCookies } from "nookies";
import Image from "next/image";
import { dashboard } from "../../../config.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AlertMessage from "../../dashboard/components/AlertMessage";

const Dashboard = ({ isAuth, guilds }) => {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(router.query?.message);
    if (!isAuth) {
      return router.push("/api/auth/login");
    }
  }, [isAuth]);

  return (
    <>
      {message ? <AlertMessage message={message} /> : null}
      <div className="page-title">
        <h4>Please select a server</h4>
      </div>

      <div className="grid">
        {guilds.map((guild) => {
          return (
            <a
              href={guild.inGuild ? `/dashboard/${guild.id}` : null}
              key={guild.id}
              className={`card guild-card ${!guild.inGuild ? "disabled" : ""}`}
              aria-label={
                !guild.inGuild ? "The bot must be in this guild!" : null
              }
            >
              {guild.icon === null ? (
                <div className="guild-card-img"></div>
              ) : (
                <Image
                  className="guild-card-img"
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`}
                  width="65"
                  height="65"
                />
              )}
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
      isAuth: data.invalid_token ? false : true,
      guilds: data?.guilds || [],
    },
  };
}

export default Dashboard;
