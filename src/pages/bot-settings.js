import { useEffect, useState } from "react";
import Head from "next/head";
import { parseCookies } from "nookies";
import AlertMessage from "../dashboard/components/AlertMessage";
import { owners, dashboard } from "../../config.json";
import { useRouter } from "next/router";
import { handleApiRequest } from "../utils/functions";

const BotSettings = ({ isAuth, isOwner }) => {
  const [nickname, setNickname] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      return router.push("/login");
    }

    if (!isOwner) {
      router.push("/dashboard?message=You are not allowed to view that page!");
    }
  }, [router, isAuth, isOwner]);

  return (
    <>
      <Head>
        <title>Bot Settings - {dashboard.botName}</title>
      </Head>
      <AlertMessage message="Any actions done on this page will not take effect yet, this page is still a WIP" />
      <div className="page-title">
        <h4>Bot Settings</h4>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="nickname">
          Bot nickname
        </label>
        <input
          disabled
          className="form-input"
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div>
        <h1 className="danger-zone-title">Danger zone</h1>
        <div className="grid">
          <button disabled className="btn btn-red">
            Restart bot
          </button>
          <button disabled className="btn btn-red">
            Reload all commands
          </button>
          <button disabled className="btn btn-red">
            Shutdown
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  const data = await handleApiRequest("/users/@me", {
    type: "Bearer",
    data: cookies.token,
  });

  return {
    props: {
      isAuth: data.error !== "invalid_token",
      isOwner: owners.includes(data.id),
    },
  };
}

export default BotSettings;
