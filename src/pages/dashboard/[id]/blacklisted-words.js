import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import Head from "next/head";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import { openModal } from "../../../dashboard/components/modal";
import AddBlacklistedWord from "../../../dashboard/components/modal/add-blacklistedword";
import Logger from "../../../modules/Logger";

const BlacklistedWords = ({ guild, isAuth }) => {
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      return router.push("/login");
    }
  }, [router, isAuth]);

  useEffect(() => {
    setMessage(router.query?.message);
  }, [router]);

  async function deleteWord(word) {
    try {
      const data = await (
        await fetch(
          `${dashboard.dashboardUrl}/api/guilds/${
            guild.id
          }/blacklisted-words?word=${encodeURIComponent(word)}`,
          {
            method: "DELETE",
          }
        )
      ).json();

      if (data.status === "success") {
        router.push(`/dashboard/${guild.id}/blacklisted-words?message=${data.message}`);
      }

      setMessage(data?.error);
    } catch (e) {
      Logger.error("delete_blacklisted_words", e);
    }
  }

  function addWord() {
    openModal("addBlacklistedWord");
  }

  return (
    <>
      <Head>
        <title>Manage blacklisted words - {dashboard.botName}</title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <AddBlacklistedWord guild={guild} />
      <div className="page-title">
        <h4>{guild?.name} - Blacklisted words</h4>

        <div>
          <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
            Return
          </a>
          <button className="btn btn-primary ml-5" onClick={addWord}>
            Add word
          </button>
        </div>
      </div>

      {guild.blacklistedwords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guild.blacklistedwords.map((word, idx) => {
              return (
                <tr key={idx}>
                  <td className="cmd-response">{word}</td>
                  <td className="table-actions">
                    <button onClick={() => deleteWord(word)} className="btn btn-sm btn-red">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>This guid does not have any blacklisted words yet</p>
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  const data = await (
    await fetch(`${dashboard.dashboardUrl}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json();

  return {
    props: {
      isAuth: data.error !== "invalid_token",
      guild: data?.guild || {},
    },
  };
}

export default BlacklistedWords;
