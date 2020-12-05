import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../../../dashboard/components/AlertMessage";

const ManageCommands = ({ botCommands, guild }) => {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [filtered, setFiltered] = useState(botCommands);

  useEffect(() => {
    setMessage(router.query?.message);
  }, [router]);

  function handleSearch(value) {
    let filter;

    if (value === "@enabled") {
      filter = botCommands.filter((cmd) => {
        return !guild.disabled_commands.find((c) => c === cmd.name);
      });
    } else if (value === "@disabled") {
      filter = botCommands.filter((cmd) => {
        return !!guild.disabled_commands.find((c) => c === cmd.name);
      });
    } else {
      filter = botCommands.filter((cmd) =>
        cmd.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFiltered(filter);
  }

  async function updateCommand(type, cmdName) {
    const data = await (
      await fetch(`${dashboard.dashboardUrl}/api/guilds/${guild.id}/commands`, {
        method: "PUT",
        body: JSON.stringify({
          name: cmdName,
          type: type,
        }),
      })
    ).json();

    if (data.status === "success") {
      router.push(
        `/dashboard/${guild.id}/manage-commands?message=Successfully ${
          type === "enable" ? "enabled" : "disabled"
        } command: ${cmdName}`
      );
    }
  }

  return (
    <>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <div className="page-title">
        <h4>{guild?.name} - Enable/disable commands</h4>

        <div>
          <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
            Return
          </a>
        </div>
      </div>

      <div className="form-group">
        <input
          className="form-input"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search query | @enabled | @disabled"
        />
      </div>

      <div className="grid">
        {filtered
          .filter(({ name }) => !["help", "enable", "disable"].includes(name))
          .map((cmd, idx) => {
            const isDisabled = guild.disabled_commands?.find(
              (c) => c === cmd.name
            );
            return (
              <div id={idx} key={cmd.name} className="card cmd-card">
                <p>{cmd.name}</p>

                <div>
                  <button
                    onClick={() =>
                      updateCommand(isDisabled ? "enable" : "disable", cmd.name)
                    }
                    className="btn btn-secondary"
                  >
                    {isDisabled ? "Enable" : "Disable"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
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
      isAuth: data.invalid_token ? false : true,
      guild: data?.guild,
      botCommands: data.botCommands,
    },
  };
}
export default ManageCommands;
