import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";

const ErrorPage: NextPage = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const { t: errorT } = useTranslation("common");
  const { t } = useTranslation("landing");

  React.useEffect(() => {
    const err = router.query.error as string;

    setError(err);
  }, [router]);

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

      <main style={{ marginTop: "100px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 500 }}>{error}</h2>
        <Link href="/">
          <a
            href="/"
            style={{ display: "block", marginTop: "10px", textDecoration: "underline" }}
            className="nav-link"
          >
            {errorT("back_home")}
          </a>
        </Link>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "landing"])),
  },
});

export default ErrorPage;
