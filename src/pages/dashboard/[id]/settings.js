import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import fetch from "node-fetch";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import { getLanguages } from "../../../utils/functions";
import timezones from "../../../data/timezones.json";
import { useRouter } from "next/router";

const Settings = ({ guild, languages, isAuth }) => {
  const [message, setMessage] = useState(null);
  const [welcomeChannel, setWelcomeChannel] = useState(guild.welcome_channel || "");
  const [welcomeRole, setWelcomeRole] = useState(guild.welcome_role || "");
  const [suggestChannel, setSuggestChannel] = useState(guild.suggest_channel || "");
  const [announceChannel, setAnnounceChannel] = useState(guild.announcement_channel || "");
  const [leaveChannel, setLeaveChannel] = useState(guild.leave_channel || "");
  const [levelUpMessages, setLevelUpMessages] = useState(guild.level_up_messages || "false");
  const [language, setLanguage] = useState(guild.locale || "");
  const [welcomeMessage, setWelcomeMessage] = useState(guild.welcome_message || "");
  const [leaveMessage, setLeaveMessage] = useState(guild.leave_message || "");
  const [auditChannel, setAuditChannel] = useState(guild.audit_channel || "");
  const [prefix, setPrefix] = useState(guild.prefix || "");
  const [tz, setTz] = useState(guild.timezone || "");
  const [autoDelCmd, setAutoDelCmd] = useState(guild.auto_delete_cmd || "");
  const [ticketRole, setTicketRole] = useState(guild.ticket_role || "");
  const [ticketParentChannel, setTicketParentChannel] = useState(guild.ticket_parent_channel || "");
  const [memberCountChannelId, setMemberCountChannelId] = useState(
    guild.member_count_channel_id || ""
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      return router.push("/login");
    }
  }, [router, isAuth]);

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
      id: "audit_channel",
      value: auditChannel,
      onChange: (e) => setAuditChannel(e.target.value),
      data: guild.channels,
      label: "Audit logs channel",
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
      id: "ticket_role",
      value: ticketRole,
      onChange: (e) => setTicketRole(e.target.value),
      data: guild.roles,
      label: "Tickets role",
    },
    {
      type: "select",
      id: "ticket_parent_channel",
      value: ticketParentChannel,
      onChange: (e) => setTicketParentChannel(e.target.value),
      data: guild.categories,
      label: "Tickets Channel parent",
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
    {
      type: "select",
      id: "language",
      value: language,
      onChange: (e) => setLanguage(e.target.value),
      data: languages,
      label: "Bot language",
    },
    {
      type: "select",
      id: "timezone",
      value: tz,
      onChange: (e) => setTz(e.target.value),
      data: timezones,
      label: "Timezones",
    },
    {
      type: "input",
      id: "prefix",
      value: prefix,
      onChange: (e) => setPrefix(e.target.value),
      label: "Bot Prefix",
    },
    {
      type: "select",
      id: "auto_delete_cmd",
      value: autoDelCmd,
      onChange: (e) => setAutoDelCmd(e.target.value),
      data: [
        { id: "false", name: "Off" },
        { id: "true", name: "On" },
      ],
      label: "Auto delete commands",
    },
    {
      type: "select",
      id: "member_count_channel_id",
      value: memberCountChannelId,
      onChange: (e) => setMemberCountChannelId(e.target.value),
      data: guild.voice_channels,
      label: "Member count channel Id (bot needs 'Manage Channel' permissions for this channel)",
    },
  ];

  async function onSubmit(e) {
    setMessage(null);
    e.preventDefault();

    try {
      const res = await fetch(`${dashboard.dashboardUrl}/api/guilds/${guild.id}`, {
        method: "POST",
        body: JSON.stringify({
          welcome_channel: welcomeChannel,
          welcome_role: welcomeRole,
          leave_channel: leaveChannel,
          suggest_channel: suggestChannel,
          announcement_channel: announceChannel,
          level_up_messages: levelUpMessages,
          locale: language,
          welcome_message: welcomeMessage,
          audit_channel: auditChannel,
          prefix: prefix,
          timezone: tz,
          auto_delete_cmd: autoDelCmd === "true",
          leave_message: leaveMessage,
          ticket_role: ticketRole,
          ticket_parent_channel: ticketParentChannel,
        }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setMessage(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Head>
        <title>{guild?.name} - Settings / {dashboard.botName} Dashboard</title>
      </Head>
      <div className="page-title">
        <h4>{guild?.name} - Settings</h4>
        <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
          Return
        </a>
      </div>
      {message ? <AlertMessage type="success" message={message} /> : null}

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
                    {field.data?.map((option, idx) => {
                      return (
                        <option key={idx} value={option.id}>
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

        <div className="grid col-2">
          <div className="form-group">
            <label htmlFor="welcome-message" className="form-label">
              Welcome description
            </label>
            <textarea
              id="welcome-message"
              className="form-input"
              onChange={(e) => setWelcomeMessage(e.target.value)}
              value={welcomeMessage}
            ></textarea>
            <p className="mt-5">
              <strong>{"{user}"}:</strong> The user mention: @CasperTheGhost
              <br />
              <strong>{"{user.username}"}</strong>: The user&apos;s username: CasperTheGhost
              <br />
              <strong>{"{user.tag}"}</strong>: The user&apos;s tag: CasperTheGhost#0000 <br />
              <strong>{"{user.id}"}</strong>: The user&apos;s id: 00000000000 <br />
              <strong>{"{user.discriminator}"}</strong>: The user&apos;s discriminator: #0000 <br />
              <strong>{"{user.createdAt}"}</strong>: the user&apos;s account created date:
              20/12/2018 (America/New_York) <br />
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="leave-message" className="form-label">
              Leave description
            </label>
            <textarea
              id="leave-message"
              className="form-input"
              onChange={(e) => setLeaveMessage(e.target.value)}
              value={leaveMessage}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary float-right">
          Save settings
        </button>
      </form>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const langs = getLanguages().map((lang) => {
    return { id: lang, name: lang };
  });

  const data = await (
    await fetch(`${dashboard.dashboardUrl}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json();

  return {
    props: {
      guild: data?.guild || {},
      isAuth: data.error !== "invalid_token",
      languages: langs,
    },
  };
}

export default Settings;
