import { parseCookies } from "nookies";
import { dashboard } from "../../../../config.json";
import fetch from "node-fetch";
import Logger from "../../../modules/Logger";

const Settings = ({ guild }) => {
  async function deleteCommand(name) {
    try {
      const data = await (
        await fetch(
          `${dashboard.dashboardUrl}/api/guilds/${
            guild.id
          }/commands?name=${encodeURIComponent(name)}`,
          {
            method: "DELETE",
          }
        )
      ).json();

      console.log(data);
    } catch (e) {
      Logger.error("delete_command", e);
    }
  }

  return (
    <>
      <div className="page-title">
        <h4>{guild?.name} - Custom commands</h4>
        <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
          Return
        </a>
      </div>

      {guild.custom_commands.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guild.custom_commands.map((cmd, idx) => {
              return (
                <tr key={idx}>
                  <td>{cmd.name}</td>
                  <td className="cmd-response">{cmd.response}</td>
                  <td className="table-actions">
                    <button
                      onClick={() => deleteCommand(cmd.name)}
                      className="btn btn-sm btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>This guid does not have any custom commands yet</p>
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
      isAuth: data.invalid_token ? false : true,
      guild: data?.guild,
    },
  };
}

export default Settings;
