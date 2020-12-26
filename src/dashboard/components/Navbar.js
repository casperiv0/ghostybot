import { useCallback, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { dashboard, owners } from "../../../config.json";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Loader from "./Loader";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchAuth = useCallback(async () => {
    const cookies = parseCookies();
    const data = await (
      await fetch(`${dashboard.dashboardUrl}/api/auth`, {
        method: "POST",
        headers: {
          auth: cookies.token,
        },
      })
    ).json();

    setLoading(false);

    if (data.invalid_token) {
      return router.push("/api/auth/login");
    }

    setUser(data.user);
  }, [router]);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  if (loading) {
    return <Loader full />;
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <Link href="/dashboard">
          <a className="nav-icon-link">{dashboard.botName} <span className="nav-icon-extra">Dashboard</span></a>
        </Link>
        <div className="dropdown-container">
          <button className="nav-link-dropdown">
            <label htmlFor="image" className="sr-only">
              Dropdown Menu
            </label>
            <Image
              width="40"
              height="40"
              alt="dropdown"
              src={
                user?.avatar === null
                  ? "https://cdn.discordapp.com/embed/avatars/0.png"
                  : `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp`
              }
            />
          </button>

          <div className="dropdown">
            <div className="dropdown-content">
              <Link href="/dashboard">
                <a className="dropdown-link">My servers</a>
              </Link>
              <Link href="/add">
                <a className="dropdown-link">Invite {dashboard.botName}</a>
              </Link>
              {owners.includes(user?.id) ? (
                <Link href="/bot-settings">
                  <a className="dropdown-link">Bot Settings</a>
                </Link>
              ) : null}
              <Link href="/logout">
                <a className="dropdown-link logout">Logout</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
