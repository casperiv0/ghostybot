import Link from "next/link";

const Landing = () => {
  return (
    <div className="container">
      <div className="content">
        <nav className="nav-bar">
          <div className="nav-content">
            <a href="#" className="nav-icon">
              Ghostybot
            </a>
            <div className="nav-links">
              <a href="/dashboard" className="nav-link">
                Dashboard
              </a>
              <a
                href="https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8"
                className="nav-link invite-btn"
              >
                Invite
              </a>
              <a className="nav-link" href="https://discord.gg/XxHrtkA">
                Support server
              </a>
            </div>
          </div>
        </nav>

        <main className="main">
          <h1>Ghostybot</h1>
          <p>
            Custom Discord bot for your community needs! Moderation, music,
            games, economy and more!
          </p>
          <div className="btn-container">
            <a
              target="_blank"
              rel="noreferrer opener"
              className="main-btn"
              href="https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8"
            >
              Add To discord
            </a>
            <Link href="/dashboard">
              <a className="main-btn">Open Dashboard</a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
