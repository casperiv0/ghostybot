import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  stats: Record<string, any>;
}

const StatsPage: NextPage<Props> = ({ stats }) => {
  const { t } = useTranslation("landing");
  const { t: tStats } = useTranslation("stats");

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
          </div>
        </div>
      </nav>

      <main style={{ marginTop: "1rem" }}>
        <h1>{tStats("bot_stats")}</h1>

        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              <strong>{stats.guilds.formatted}</strong> {tStats("guilds")}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              <strong>{stats.channels.formatted}</strong> {tStats("channels")}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              <strong>{stats.users.formatted}</strong> {tStats("users")}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              <strong>{stats.commands.formatted}</strong> {tStats("commands")}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              <strong>{stats.memory.formatted}</strong> {tStats("memory_usage")}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/bot`);

  const data = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["landing", "stats", "footer", "profile"])),
      stats: data,
    },
  };
};

export default StatsPage;
