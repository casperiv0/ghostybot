import * as React from "react";
import { Modal, closeModal } from "./index";
import { logger } from "utils/logger";
import { AlertMessage } from "../AlertMessage";
import { SlashCommand } from "models/Guild.model";
import { useTranslation } from "react-i18next";
import { useSlashStore } from "src/dashboard/state/slashState";

interface Props {
  command: SlashCommand | null;
  guildId: string;
}

export const EditCommandModal: React.FC<Props> = ({ command, guildId }: Props) => {
  const [name, setName] = React.useState("");
  const [cmdRes, setCmdRes] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);

  const state = useSlashStore();
  const { t } = useTranslation("guilds");

  React.useEffect(() => {
    if (!command) return;

    setName(command.name);
    setCmdRes(command.response);
    setDescription(command.description);
  }, [command]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const commandData = {
      name,
      response: cmdRes,
      description,
      commandId: command?.slash_cmd_id,
      slash_cmd_id: command?.slash_cmd_id,
    };

    try {
      const url = `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guildId}/slash-commands`;

      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(commandData),
      });

      const data = await res.json();

      if (data.status === "success") {
        closeModal("edit-command");

        setName("");
        setCmdRes("");
        setDescription("");
        setResponse(null);

        state.setItems(
          state.items.map((v) => {
            if (v.slash_cmd_id === command?.slash_cmd_id) {
              v = commandData as SlashCommand;
            }

            return v;
          }),
        );
        state.setMessage(t("updated_command"));
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
