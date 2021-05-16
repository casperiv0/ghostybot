import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";

interface Props {
  isAuth: boolean;
}

const Landing: NextPage<Props> = ({ isAuth }) => {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-content-landing">
          <a href="/" className="nav-icon">
            {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
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

      <main className="main">
        <h1>{process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}</h1>
        <p>
          Custom Discord bot for your community needs! Moderation, music, games, economy and more!
        </p>
        <div className="btn-container">
          <a target="_blank" rel="noreferrer opener" className="main-btn" href="/add">
            Add To discord
          </a>

          {isAuth ? (
            <Link href="/dashboard">
              <a href="/dashboard" className="main-btn">
                Open Dashboard
              </a>
            </Link>
          ) : (
            <a href="/api/auth/login" className="main-btn">
              Open Dashboard
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
      isAuth: data.error !== "invalid_token",
    },
  };
};

export default Landing;
