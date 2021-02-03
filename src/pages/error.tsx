import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dashboard } from "../../config.json";

const ErrorPage: NextPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const err = router.query.error as string;

    setError(err);
  }, [router]);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-content-landing">
          <a href="/" className="nav-icon">
            {dashboard.botName}
          </a>
          <div className="nav-links">
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
            <a href="/add" className="nav-link invite-btn">
              Invite
            </a>
            <a className="nav-link" href="/support">
              Support server
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
            Back home
          </a>
        </Link>
      </main>
    </>
  );
};

export default ErrorPage;
