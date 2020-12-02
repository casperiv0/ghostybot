import { useState } from "react";
import { parseCookies } from "nookies";
import { dashboard } from "../../../../config.json";
import fetch from "node-fetch";
import AlertMessage from "../../../dashboard/components/AlertMessage";

const Settings = ({ guild }) => {
  const [message, setMessage] = useState(null);
  const [welcomeChannel, setWelcomeChannel] = useState(
    guild.welcome_channel || ""
  );
  const [welcomeRole, setWelcomeRole] = useState(guild.welcome_role || "");
  const [suggestChannel, setSuggestChannel] = useState(
    guild.suggest_channel || ""
  );
  const [announceChannel, setAnnounceChannel] = useState(
    guild.announce_channel || ""
  );
  const [leaveChannel, setLeaveChannel] = useState(guild.leave_channel || "");
  const [levelUpMessages, setLevelUpMessages] = useState(
    guild.level_up_messages || "false"
  );

  const fields = [
    {
      type: "select",
      id: "welcome_channel",
      value: welcomeChannel,
      onChange: (e) => setWelcomeChannel(e.target.value),
      data: guild.channels,
      label: "Welcome channel",
    },
    {
      type: "select",
      id: "welcome_role",
      value: welcomeRole,
      onChange: (e) => setWelcomeRole(e.target.value),
      data: guild.roles,
      label: "Welcome role",
    },
    {
      type: "select",
      id: "leave_channel",
      value: leaveChannel,
      onChange: (e) => setLeaveChannel(e.target.value),
      data: guild.channels,
      label: "Leave channel",
    },
    {
      type: "select",
      id: "suggest_channel",
      value: suggestChannel,
      onChange: (e) => setSuggestChannel(e.target.value),
      data: guild.channels,
      label: "Suggestion channel",
    },
    {
      type: "select",
      id: "announce_channel",
      value: announceChannel,
      onChange: (e) => setAnnounceChannel(e.target.value),
      data: guild.channels,
      label: "Announcement channel",
    },
    {
      type: "select",
      id: "level_up_messages",
      value: levelUpMessages,
      onChange: (e) => setLevelUpMessages(e.target.value),
      data: [
        { id: "false", name: "Off" },
        { id: "true", name: "On" },
      ],
      label: "Level up messages",
    },
  ];

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${dashboard.dashboardUrl}/api/guilds/${guild.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            welcome_channel: welcomeChannel,
            welcome_role: welcomeRole,
            leave_channel: leaveChannel,
            suggest_channel: suggestChannel,
            announcement_channel: announceChannel,
            level_up_messages: levelUpMessages,
          }),
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        setMessage(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="page-title">
        <h4>{guild?.name} - Settings</h4>
        <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
          Return
        </a>
      </div>
      {message ? <AlertMessage message={message} /> : null}

      <form onSubmit={onSubmit}>
        <div className="grid">
          {fields.map((field, idx) => {
            return (
              <div key={idx} className="form-group">
                <label htmlFor={field.id} className="form-label">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    className="form-input"
                    id={field.id}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {field.data.map((option) => {
                      return (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    className="form-input"
                    type="text"
                    id={field.id}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button type="submit" className="btn btn-primary">
          Save settings
        </button>
      </form>
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
