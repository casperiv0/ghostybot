import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { dashboard } from "../../../config.json";
import AlertMessage from "../../dashboard/components/AlertMessage";
import Guild from "../../interfaces/Guild";

interface Props {
  isAuth: boolean;
  guilds: Guild[];
}

const Dashboard: FC<Props> = ({ isAuth, guilds }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
    if (!isAuth) {
      router.push("/api/auth/login");
      return;
    }
  }, [isAuth, router]);

  return (
    <>
      <AlertMessage message="This dashboard is still in beta! It could be that some thing will not work, if you found an issue please report this at: https://discord.gg/XxHrtkA" />
      {message ? <AlertMessage message={message} /> : null}
      <div className="page-title">
        <h4>Please select a server</h4>
      </div>

      <div className="grid">
        {guilds.map((guild) => {
          return (
            <Link key={guild.id} href={guild.inGuild ? `/dashboard/${guild.id}` : "/dashboard"}>
              <a
                href={`/dashboard/${guild.id}`}
                className={`card guild-card ${!guild.inGuild ? "disabled" : ""}`}
                aria-label={!guild.inGuild ? "The bot must be in this guild!" : undefined}
              >
                {guild.icon === null ? (
                  <div className="guild-card-img"></div>
                ) : (
                  <Image
                    alt={guild.name}
                    className="guild-card-img"
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`}
                    width="65"
                    height="65"
                  />
                )}
                <p>{guild.name}</p>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
      isAuth: data.error !== "invalid_token",
      guilds: data?.guilds || [],
    },
  };
};

export default Dashboard;
