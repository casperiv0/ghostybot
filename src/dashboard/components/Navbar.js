import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { dashboard } from "../../../config.json";
import { useRouter } from "next/router";
import Image from "next/image";
import Loader from "./Loader";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(async () => {
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
  }, []);

  if (loading) {
    return <Loader full />;
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <a className="nav-icon-link" href="/dashboard">
          GhostyBot Dashboard
        </a>
        <div className="dropdown-container">
          <button className="nav-link-dropdown">
            <Image
              width="40"
              height="40"
              src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}`}
            />
          </button>

          <div className="dropdown">
            <div className="dropdown-content">
              <a href="/dashboard" className="dropdown-link">
                My servers
              </a>
              <a href="/api/auth/logout" className="dropdown-link logout">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
