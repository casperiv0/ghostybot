import { useState, useEffect, FC, ChangeEventHandler, FormEvent } from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import fs from "fs";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import timezones from "../../../data/timezones.json";
import { useRouter } from "next/router";
import Switch from "../../../dashboard/components/Switch";
import Guild from "../../../interfaces/Guild";

export interface FieldItem {
  type: "select" | "input" | "textarea";
  id: string;
  label: string;
  onChange: ChangeEventHandler<any>;
  value: any;
  data?: any[];
}

export interface Field {
  enabled: boolean;
  id: string;
  title: string;
  onChecked: () => void;
  fields: FieldItem[];
}

interface Props {
  guild: Guild;
  languages: string[];
  isAuth: boolean;
}

const Settings: FC<Props> = ({ guild, languages, isAuth }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [welcomeData, setWelcomeData] = useState(guild?.welcome_data || {});
  const [leaveData, setLeaveData] = useState(guild?.leave_data || {});
  const [levelData, setLevelData] = useState(guild?.level_data || {});
  const [ticketData, setTicketData] = useState(guild?.ticket_data || {});
  const [starboardsData, setStarboardsData] = useState(guild?.starboards_data || {});
  const [suggestChannel, setSuggestChannel] = useState(guild.suggest_channel || "");
  const [announceChannel, setAnnounceChannel] = useState(guild.announcement_channel || "");
  const [language, setLanguage] = useState(guild.locale || "");
  const [auditChannel, setAuditChannel] = useState(guild.audit_channel || "");
  const [prefix, setPrefix] = useState(guild.prefix || "");
  const [tz, setTz] = useState(guild.timezone || "");
  const [autoDelCmd, setAutoDelCmd] = useState(guild.auto_delete_cmd || "");
  const [mutedRoleId, setMutedRoleId] = useState(guild.muted_role_id || "");
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
  }, [router, isAuth]);

  const fields: Field[] = [
    {
      enabled: welcomeData?.enabled ?? false,
      id: "welcome",
      title: "Welcome",
      onChecked: () => {
        setWelcomeData((prev) => ({
          ...prev,
          enabled: !welcomeData?.enabled,
        }));
      },
      fields: [
        {
          type: "select",
          id: "welcome_channel",
          label: "Welcome channel",
          value: welcomeData?.channel_id || "",
          onChange: (e) =>
            setWelcomeData((prev) => ({
              ...prev,
              channel_id: e.target.value,
            })),
          data: guild.channels,
        },
        {
          type: "select",
          id: "welcome_role",
          value: welcomeData?.role_id || "",
          onChange: (e) =>
            setWelcomeData((prev) => ({
              ...prev,
              role_id: e.target.value,
            })),
          data: guild.roles,
          label: "Welcome role",
        },
        {
          type: "textarea",
          id: "welcome_message",
          value: welcomeData?.message || "",
          onChange: (e) =>
            setWelcomeData((prev) => ({
              ...prev,
              message: e.target.value,
            })),
          label: "Welcome message",
        },
      ],
    },
    {
      enabled: leaveData?.enabled ?? false,
      id: "leave_data",
      title: "Leave message",
      onChecked: () => {
        setLeaveData((prev) => ({
          ...prev,
          enabled: !leaveData?.enabled,
        }));
      },
      fields: [
        {
          type: "select",
          id: "leave_channel",
          label: "Leave channel",
          value: leaveData?.channel_id || "",
          onChange: (e) =>
            setLeaveData((prev) => ({
              ...prev,
              channel_id: e.target.value,
            })),
          data: guild.channels,
        },
        {
          type: "textarea",
          id: "leave_message",
          value: leaveData?.message || "",
          onChange: (e) =>
            setLeaveData((prev) => ({
              ...prev,
              message: e.target.value,
            })),
          label: "Leave message",
        },
      ],
    },
    {
      enabled: levelData?.enabled ?? false,
      id: "level_data",
      title: "Levels",
      onChecked: () => {
        setLevelData((prev) => ({
          ...prev,
          enabled: !levelData?.enabled,
        }));
      },
      fields: [
        {
          type: "textarea",
          id: "level_message",
          value: levelData?.message || "",
          onChange: (e) =>
            setLevelData((prev) => ({
              ...prev,
              message: e.target.value,
            })),
          label: "Level message",
        },
      ],
    },
    {
      enabled: ticketData?.enabled ?? false,
      id: "ticket_data",
      title: "Tickets",
      onChecked: () => {
        setTicketData((prev) => ({
          ...prev,
          enabled: !ticketData?.enabled,
        }));
      },
      fields: [
        {
          type: "select",
          id: "ticket_role",
          value: ticketData?.role_id || "",
          onChange: (e) =>
            setTicketData((prev) => ({
              ...prev,
              role_id: e.target.value,
            })),
          label: "Ticket role",
          data: guild.roles,
        },
        {
          type: "select",
          id: "ticket_parent_id",
          value: ticketData?.parent_id || "",
          onChange: (e) =>
            setTicketData((prev) => ({
              ...prev,
              parent_id: e.target.value,
            })),
          label: "Parent",
          data: guild.categories,
        },
      ],
    },
    {
      enabled: starboardsData?.enabled ?? false,
      id: "starboards_data",
      title: "Starboard",
      onChecked: () => {
        setStarboardsData((prev) => ({
          ...prev,
          enabled: !starboardsData?.enabled,
        }));
      },
      fields: [
        {
          type: "select",
          id: "starboards_channel_id",
          value: starboardsData?.channel_id || "",
          onChange: (e) =>
            setStarboardsData((prev) => ({
              ...prev,
              channel_id: e.target.value,
            })),
          label: "Starboards channel",
          data: guild.channels,
        },
        {
          type: "input",
          id: "starboards_emoji",
          value: starboardsData?.emoji || "⭐",
          onChange: (e) =>
            setStarboardsData((prev) => ({
              ...prev,
              emoji: e.target.value,
            })),
          label: "Starboards emoji",
        },
      ],
    },
  ];
  const mainFields = [
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
      label: "Timezone",
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
      id: "muted_role_id",
      value: mutedRoleId,
      onChange: (e) => setMutedRoleId(e.target.value),
      data: guild.roles,
      label: "Muted Role",
    },
  ];

  async function onSubmit(e: FormEvent) {
    setMessage(null);
    setError(null);
    e.preventDefault();

    try {
      const res = await fetch(`${dashboard.dashboardUrl}/api/guilds/${guild.id}`, {
        method: "POST",
        body: JSON.stringify({
          welcome_data: welcomeData,
          leave_data: leaveData,
          ticket_data: ticketData,
          level_data: levelData,
          starboards_data: starboardsData,

          suggest_channel: suggestChannel,
          announcement_channel: announceChannel,
          locale: language,
          audit_channel: auditChannel,
          prefix: prefix,
          timezone: tz,
          auto_delete_cmd: autoDelCmd === "true",
          muted_role_id: mutedRoleId,
        }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Head>
        <title>
          {guild?.name} - Settings / {dashboard.botName} Dashboard
        </title>
      </Head>
      <div className="page-title">
        <h4>{guild?.name} - Settings</h4>
        <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
          Return
        </a>
      </div>
      {message ? <AlertMessage type="success" message={message} /> : null}
      {error ? <AlertMessage type="error" message={error} /> : null}

      <form onSubmit={onSubmit}>
        <div className="grid">
          {mainFields.map((field, idx) => {
            return (
              <div className="form-group" key={`main-field-${idx}`} id={field.id}>
                <label className="form-label" htmlFor={field.id}>
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <SelectField item={field as FieldItem} />
                ) : (
                  <InputField item={field as FieldItem} />
                )}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "1rem" }} className="grid settings-grid">
          {fields.map((field, idx) => {
            return (
              <div id={field.id} key={idx} className="form-group settings-group">
                <header className="group-header">
                  <h1 className="group-title">{field.title}</h1>
                  <Switch
                    title="Enabled Or disable feature"
                    checked={field.enabled}
                    onChange={field.onChecked}
                  />
                </header>
                {field.fields?.map((item, idx) => {
                  return (
                    <div className="form-group" key={`field-${idx}`}>
                      <label htmlFor={item.id} className="form-label">
                        {item.label}
                      </label>
                      {item.type === "select" ? (
                        <SelectField item={item} />
                      ) : item.type === "textarea" ? (
                        <TextareaField item={item} />
                      ) : (
                        <InputField item={item} />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <button type="submit" className="btn btn-primary float-right">
          Save settings
        </button>
      </form>
    </>
  );
};

interface Item {
  item: FieldItem;
}

function SelectField({ item }: Item) {
  return (
    <select className="form-input" id={item.id} value={item.value} onChange={item.onChange}>
      {item.data?.map((option, idx) => {
        return (
          <option key={idx} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function TextareaField({ item }: Item) {
  return (
    <textarea
      value={item.value}
      onChange={item.onChange}
      id={item.id}
      className="form-input"
    ></textarea>
  );
}

function InputField({ item }: Item) {
  return (
    <input
      className="form-input"
      type="text"
      id={item.id}
      value={item.value}
      onChange={item.onChange}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  function getLanguages() {
    return fs
      .readdirSync("./src/locales/")
      .filter((f) => f.endsWith(".ts"))
      .map((la) => la.slice(0, -3));
  }

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
};

export default Settings;
