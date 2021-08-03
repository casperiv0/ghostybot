import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  isAuth: boolean;
}

const Landing: NextPage<Props> = ({ isAuth }) => {
  const { t } = useTranslation("landing");

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-content-landing">
          <a href="/" className="nav-icon">
            {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
          </a>
          <div className="nav-links">
            <a href="/dashboard" className="nav-link">
              {t("dashboard")}
            </a>
            <a href="/add" className="nav-link invite-btn">
              {t("invite")}
            </a>
            <a className="nav-link" href="/support">
              {t("support_server")}
            </a>
            <a className="nav-link" href="/stats">
              {t("stats")}
            </a>
          </div>
        </div>
      </nav>

      <main className="main">
        <h1>{process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}</h1>
        <p>
          A feature-rich Discord bot with +200 commands for Discord servers. Economy, util, fun,
          music, admin and more! Built with Next.js and Discord.js
        </p>
        <div className="btn-container">
          <a target="_blank" rel="noreferrer opener" className="main-btn" href="/add">
            {t("add_to_discord")}
          </a>

          {isAuth ? (
            <Link href="/dashboard">
              <a href="/dashboard" className="main-btn">
                {t("open_dashboard")}
              </a>
            </Link>
          ) : (
            <a href="/api/auth/login" className="main-btn">
              {t("open_dashboard")}
            </a>
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const res = await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/auth`, {
    method: "POST",
    headers: {
      Auth: cookies?.token,
    },
  });

  const data = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["landing", "footer", "profile"])),
      isAuth: data.error !== "invalid_token",
    },
  };
};

export default Landing;
