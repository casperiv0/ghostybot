import Link from "next/link";

const Landing = () => {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-content-landing">
          <a href="#" className="nav-icon">
            Ghostybot
          </a>
          <div className="nav-links">
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
            <a
              href="/add"
              className="nav-link invite-btn"
            >
              Invite
            </a>
            <a className="nav-link" href="/support">
              Support server
            </a>
          </div>
        </div>
      </nav>

      <main className="main">
        <h1>Ghostybot</h1>
        <p>
          Custom Discord bot for your community needs! Moderation, music, games,
          economy and more!
        </p>
        <div className="btn-container">
          <a
            target="_blank"
            rel="noreferrer opener"
            className="main-btn"
            href="/add"
          >
            Add To discord
          </a>
          <Link href="/dashboard">
            <a className="main-btn">Open Dashboard</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Landing;
