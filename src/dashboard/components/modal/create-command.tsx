import { FC, FormEvent, useState } from "react";
import Modal, { closeModal } from "./index";
import Logger from "../../../modules/Logger";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../AlertMessage";
import { useRouter } from "next/router";
import Guild from "../../../interfaces/Guild";

interface Props {
  guild: Guild;
}

const CreateCommandModal: FC<Props> = ({ guild }: Props) => {
  const [name, setName] = useState("");
  const [cmdRes, setCmdRes] = useState("");
  const [response, setResponse] = useState<{ error: string } | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${dashboard.dashboardUrl}/api/guilds/${guild.id}/commands`, {
        method: "POST",
        body: JSON.stringify({
          name,
          response: cmdRes,
        }),
      });
      const data = await res.json();

      if (data.status === "success") {
        closeModal("createCommandModal");
        setName("");
        setCmdRes("");
        setResponse(null);
        router.push(`/dashboard/${guild.id}/commands?message=Successfully Added command`);
      }

      setResponse(data);
    } catch (e) {
      Logger.error("create_Command", e);
    }
  }

  return (
    <Modal id="createCommandModal" title="Create command">
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
            Add command
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCommandModal;
