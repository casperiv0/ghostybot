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

export const AddStoreItem: React.FC<Props> = ({ guild }: Props) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [response, setResponse] = React.useState<{ error: string } | null>(null);
  const router = useRouter();
  const { t } = useTranslation("guilds");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild.id}/store`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            price,
          }),
        },
      );
      const data = await res.json();

      if (data.status === "success") {
        closeModal("addStoreItem");
        setName("");
        setPrice("");
        setResponse(null);
        router.push(`/dashboard/${guild.id}/store?message=${name} ${t("added_to_store")}`);
      }

      setResponse(data);
    } catch (e) {
      logger.error("add_store_item", e);
    }
  }

  return (
    <Modal id="addStoreItem" title={t("add_store_item")}>
      {response?.error ? <AlertMessage message={response?.error} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            {t("enter_name")}
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">
            {t("enter_price")}
          </label>
          <input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="float-right">
          <button className="btn btn-primary" type="submit">
            {t("add_item")}
          </button>
        </div>
      </form>
    </Modal>
  );
};
