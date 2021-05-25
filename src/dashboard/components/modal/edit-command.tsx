import * as React from "react";
import Modal, { closeModal, openModal } from "./index";
import Logger from "handlers/Logger";
import AlertMessage from "../AlertMessage";
import { useRouter } from "next/router";
import Guild from "types/Guild";
import { CustomCommand, SlashCommand } from "models/Guild.model";
import { useTranslation } from "react-i18next";

interface Props {
  guild: Guild;
  slash?: boolean;
}

async function getCommand(
  guildId: string,
  name: string,
  slash: boolean,
): Promise<CustomCommand | SlashCommand | null> {
  try {
    const res = await fetch(
      `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guildId}/${
        slash ? "slash-" : ""
      }commands?name=${encodeURIComponent(name)}`,
    );
    const data = await res.json();

    if (data.status === "error") return null;

    return data.command;
  } catch (e) {
    Logger.error("edit_command", e);
    return null;
  }
}

const EditCommandModal: React.FC<Props> = ({ guild, slash }: Props) => {
  const [name, setName] = React.useState("");
  const [cmdRes, setCmdRes] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);
  const [commandId, setCommandId] = React.useState(null);
  const router = useRouter();
  const { t } = useTranslation("guilds");

  const setCommandData = React.useCallback(async () => {
    const command = await getCommand(`${router.query?.id}`, `${router.query.edit}`, slash ?? false);
    if (!command) return;

    openModal("edit-command");
    setName(command.name);
    setCmdRes(command.response);

    if (slash) {
      // @ts-expect-error ignore
      setDescription(command.description);

      // @ts-expect-error ignore
      setCommandId(command.slash_cmd_id);
    }
  }, [router.query, slash]);

  React.useEffect(() => {
    setCommandData();
  }, [setCommandData]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    let commandData = {};

    if (slash) {
      commandData = {
        name,
        response: cmdRes,
        description,
        commandId,
      };
    } else {
      commandData = {
        type: "enable",
        name,
        response: cmdRes,
        description,
      };
    }

    try {
      const res = await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/${
          slash ? "slash-" : ""
        }commands`,
        {
          method: "PUT",
          body: JSON.stringify(commandData),
        },
      );
      const data = await res.json();

      if (data.status === "success") {
        closeModal("edit-command");
        setName("");
        setCmdRes("");
        setDescription("");
        setResponse(null);
        router.push(
          `/dashboard/${guild.id}/${slash ? "slash-" : ""}commands?message=${t("updated_command")}`,
        );
      }

      setResponse(data);
    } catch (e) {
      Logger.error("edit_command", e);
    }
  }

  return (
    <Modal id="edit-command" title={t("update_command")}>
      {response?.error ? <AlertMessage message={response?.error} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            {t("command_name")}
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        {slash ? (
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              {t("command_desc")}
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </div>
        ) : null}
        <div className="form-group">
          <label className="form-label" htmlFor="response">
            {t("command_response")}
          </label>
          <textarea
            id="response"
            value={cmdRes}
            onChange={(e) => setCmdRes(e.target.value)}
            className="form-input"
            maxLength={1800}
          />
        </div>
        <div className="float-right">
          <button className="btn btn-primary" type="submit">
            {t("update_command")}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCommandModal;
