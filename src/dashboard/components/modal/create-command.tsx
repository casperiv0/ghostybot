import * as React from "react";
import { Modal, closeModal } from "./index";
import { logger } from "utils/logger";
import { AlertMessage } from "../AlertMessage";
import { useRouter } from "next/router";
import { Guild } from "types/Guild";
import { useTranslation } from "react-i18next";

interface Props {
  guild: Guild;
}

export const CreateCommandModal: React.FC<Props> = ({ guild }: Props) => {
  const [name, setName] = React.useState("");
  const [cmdRes, setCmdRes] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);
  const router = useRouter();
  const { t } = useTranslation("guilds");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/slash-commands`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            response: cmdRes,
          }),
        },
      );
      const data = await res.json();

      if (data.status === "success") {
        closeModal("createCommandModal");
        setName("");
        setCmdRes("");
        setDescription("");
        setResponse(null);

        router.push(`/dashboard/${guild.id}/slash-commands?message=${t("added_command")}`);
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
