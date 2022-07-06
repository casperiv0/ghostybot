import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { AlertMessage } from "@components/AlertMessage";
import { Guild } from "types/Guild";
import { Loader } from "@components/Loader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { parse } from "superjson";

interface Props {
  isAuth: boolean;
  guilds: Guild[];
}

const Dashboard: React.FC<Props> = ({ isAuth, guilds }: Props) => {
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null>(null);
  const { t } = useTranslation("guilds");

  React.useEffect(() => {
    const { query } = router;
    setMessage((query.message && `${query.message}`) || null);

    if (!isAuth) {
      router.push("/api/auth/login");
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return <Loader full />;
  }

  return (
    <>
      <AlertMessage
        message={
          <>
            {t("beta")} <a href="https://discord.gg/XxHrtkA">https://discord.gg/XxHrtkA</a>
          </>
        }
      />
      {message ? <AlertMessage message={message} /> : null}
      <div className="page-title">
        <h4>{t("select_a_server")}</h4>
      </div>

      <div className="grid">
        {guilds.map((guild) => {
          return (
            <Link key={guild.id} href={guild.inGuild ? `/dashboard/${guild.id}` : "#"}>
              <a
                aria-disabled={!guild.inGuild}
                href={!guild.inGuild ? "#" : `/dashboard/${guild.id}`}
                className={`card guild-card ${!guild.inGuild ? "disabled" : ""}`}
                aria-label={!guild.inGuild ? t("bot_in_guild") : undefined}
              >
                {guild.icon === null ? (
                  <div className="guild-card-img no-image">{guild.nameAcronym}</div>
                ) : (
                  <Image
                    alt={guild.name}
                    className="guild-card-img"
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${
                      guild.icon.startsWith("a_") ? "gif" : "webp"
                    }`}
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
  const res = await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds`, {
    headers: {
      Auth: cookies.token,
    },
  });

  const data = parse<any>(await res.json());

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["guild", "guilds", "footer", "profile"])),
      isAuth: data.error !== "invalid_token",
      guilds: data?.guilds ?? [],
    },
  };
};

export default Dashboard;
