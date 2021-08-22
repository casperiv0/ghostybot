import * as React from "react";
import { Modal, closeModal } from "./index";
import { logger } from "utils/logger";
import { AlertMessage } from "../AlertMessage";
import { useTranslation } from "react-i18next";
import { useSlashStore } from "src/dashboard/state/slashState";

interface Props {
  guildId: string;
}

export const CreateCommandModal: React.FC<Props> = ({ guildId }: Props) => {
  const [name, setName] = React.useState("");
  const [cmdRes, setCmdRes] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);

  const { t } = useTranslation("guilds");
  const state = useSlashStore();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const url = `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guildId}/slash-commands`;

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          response: cmdRes,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        closeModal("createCommandModal");

        setName("");
        setCmdRes("");
        setDescription("");
        setResponse(null);

        state.setItems([...state.items, data.command]);
        state.setMessage(t("added_command"));
      }

      setResponse(data);
    } catch (e) {
      logger.error("create_Command", e);
    }
  }

  return (
    <Modal id="createCommandModal" title={t("create_command")}>
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
            {t("create_command")}
          </button>
        </div>
      </form>
    </Modal>
  );
};
