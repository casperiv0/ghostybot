import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import Modal, { closeModal, openModal } from "./index";
import Logger from "../../../modules/Logger";
import AlertMessage from "../AlertMessage";
import { useRouter } from "next/router";
import Guild from "../../../interfaces/Guild";
import { CustomCommand } from "../../../models/Guild.model";

interface Props {
  guild: Guild;
}

async function getCommand(guildId: string, name: string): Promise<CustomCommand | null> {
  try {
    const res = await fetch(
      `${
        process.env["NEXT_PUBLIC_DASHBOARD_URL"]
      }/api/guilds/${guildId}/commands?name=${encodeURIComponent(name)}`,
    );
    const data = await res.json();

    if (data.status === "error") return null;

    return data.command;
  } catch (e) {
    Logger.error("edit_command", e);
    return null;
  }
}

const EditCommandModal: FC<Props> = ({ guild }: Props) => {
  const [name, setName] = useState("");
  const [cmdRes, setCmdRes] = useState("");
  const [response, setResponse] = useState<{ error: string } | null>(null);
  const router = useRouter();

  const setCommandData = useCallback(async () => {
    const command = await getCommand(`${router.query?.id}`, `${router.query.edit}`);
    if (!command) return;

    openModal("edit-command");
    setName(command.name);
    setCmdRes(command.response);
  }, [router.query]);

  useEffect(() => {
    setCommandData();
  }, [setCommandData]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/commands`,
        {
          method: "PUT",
          body: JSON.stringify({
            type: "enable",
            name,
            response: cmdRes,
          }),
        },
      );
      const data = await res.json();

      if (data.status === "success") {
        closeModal("edit-command");
        setName("");
        setCmdRes("");
        setResponse(null);
        router.push(`/dashboard/${guild.id}/commands?message=Successfully Updated command`);
      }

      setResponse(data);
    } catch (e) {
      Logger.error("edit_command", e);
    }
  }

  return (
    <Modal id="edit-command" title="Edit command">
      {response?.error ? <AlertMessage message={response?.error} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Command name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="response">Command response</label>
          <textarea
            id="response"
            value={cmdRes}
            onChange={(e) => setCmdRes(e.target.value)}
            className="form-input"
            maxLength={1800}
          ></textarea>
        </div>
        <div className="float-right">
          <button className="btn btn-primary" type="submit">
            Update command
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCommandModal;
