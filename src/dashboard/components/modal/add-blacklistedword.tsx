import * as React from "react";
import Modal, { closeModal } from "./index";
import Logger from "handlers/Logger";
import AlertMessage from "../AlertMessage";
import { useRouter } from "next/router";
import Guild from "types/Guild";
import { useTranslation } from "react-i18next";

interface Props {
  guild: Guild;
}

const AddBlacklistedWord: React.FC<Props> = ({ guild }: Props) => {
  const [word, setWord] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);
  const router = useRouter();
  const { t } = useTranslation("guilds");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/blacklisted-words`,
        {
          method: "POST",
          body: JSON.stringify({
            word,
          }),
        },
      );
      const data = await res.json();

      if (data.status === "success") {
        closeModal("addBlacklistedWord");
        setWord("");
        setResponse(null);
        router.push(
          `/dashboard/${guild.id}/blacklisted-words?message=${t(
            "added_blacklisted_word",
          )}: ${word}`,
        );
      }

      setResponse(data);
    } catch (e) {
      Logger.error("add_blacklisted_word", e?.stack || e);
    }
  }

  return (
    <Modal id="addBlacklistedWord" title="Add blacklisted word">
      {response?.error ? <AlertMessage message={response?.error} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="word">{t("enter_word")}</label>
          <input
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="float-right">
          <button className="btn btn-primary" type="submit">
            {t("add_word")}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBlacklistedWord;
