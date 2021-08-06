import * as React from "react";
import { Modal, closeModal, openModal } from "./index";
import { logger } from "utils/logger";
import { AlertMessage } from "../AlertMessage";
import { useRouter } from "next/router";
import { Guild } from "types/Guild";
import { SlashCommand } from "models/Guild.model";
import { useTranslation } from "react-i18next";

interface Props {
  guild: Guild;
}

async function getCommand(guildId: string, name: string): Promise<SlashCommand | null> {
  try {
    const url = `${
      process.env["NEXT_PUBLIC_DASHBOARD_URL"]
    }/api/guilds/${guildId}/slash-commands?name=${encodeURIComponent(name)}`;

    const res = await fetch(url);

    const data = await res.json();
    if (data.status === "error") return null;

    return data.command;
  } catch (e) {
    logger.error("edit_command", e);
    return null;
  }
}

export const EditCommandModal: React.FC<Props> = ({ guild }: Props) => {
  const [name, setName] = React.useState("");
  const [cmdRes, setCmdRes] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);
  const [commandId, setCommandId] = React.useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation("guilds");

  const setCommandData = React.useCallback(async () => {
    const command = await getCommand(router.query.id?.toString()!, router.query.edit?.toString()!);
    if (!command) return;

    openModal("edit-command");
    setName(command.name);
    setCmdRes(command.response);
    setDescription(command.description);
    setCommandId(command.slash_cmd_id);
  }, [router.query]);

  React.useEffect(() => {
    setCommandData();
  }, [setCommandData]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const commandData = {
      name,
      response: cmdRes,
      description,
      commandId,
    };

    try {
      const res = await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/slash-commands`,
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
        router.push(`/dashboard/${guild.id}/slash-commands?message=${t("updated_command")}`);
      }

      setResponse(data);
    } catch (e) {
      logger.error("edit_command", e);
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
