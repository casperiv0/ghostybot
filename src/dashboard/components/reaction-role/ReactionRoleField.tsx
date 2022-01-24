import * as React from "react";
import { Guild } from "types/Guild";
import { AddReactionRole } from "@components/modal/add-reaction-role";
import { IReaction, Reaction } from "models/Reactions.model";
import { useTranslation } from "next-i18next";

interface Props {
  index: number;
  guild: Guild<true>;
  reaction: IReaction;
  deleteReaction: (r: IReaction) => void;
  updateReaction: (r: IReaction) => void;
}

export const ReactionRoleField = ({
  index,
  reaction,
  guild,
  deleteReaction,
  updateReaction,
}: Props) => {
  const [channelId, setChannelId] = React.useState("");
  const [data, setData] = React.useState<Reaction[]>([]);
  const [show, setShow] = React.useState(false);

  const { t: t } = useTranslation("reaction-role");
  const { t: commonT } = useTranslation("common");

  React.useEffect(() => {
    if (reaction.channel_id) {
      setChannelId(reaction.channel_id);
    }

    if (reaction.reactions) {
      setData(reaction.reactions);
    }
  }, [reaction]);

  React.useEffect(() => {
    // @ts-expect-error ignore
    updateReaction({ ...reaction, channel_id: channelId });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const [editData, setEditData] = React.useState<Reaction | null>(null);

  function alreadyExists(d: Reaction) {
    const emoji = data.find((v) => v.emoji === d.emoji);
    const roleId = data.find((v) => v.role_id === d.role_id);

    return emoji && roleId;
  }

  function updateReactionRole(prev: Reaction, newData: Reaction) {
    if (!newData.emoji.trim() || !newData.role_id || newData.role_id === "Disabled") return;
    if (alreadyExists(newData)) return;

    const newD = data.map((v) => {
      if (v.role_id === prev.role_id && v.emoji === prev.emoji) {
        v = newData;
      }

      return v;
    });

    setData(newD);

    setShow(false);
    setEditData(null);

    // @ts-expect-error ignore
    updateReaction({ ...reaction, reactions: newD! });
  }

  function handleDelete(idx: number) {
    const newD = data.filter((_, i) => idx !== i);

    setData(newD);

    // @ts-expect-error ignore
    updateReaction({ ...reaction, reactions: newD! });
  }

  function addReactionRole(d: Reaction) {
    if (!d.emoji.trim() || !d.role_id || d.role_id === "Disabled") return;
    if (alreadyExists(d)) return;

    const newD = [...data, d];

    setShow(false);
    setData(newD);

    // @ts-expect-error ignore
    updateReaction({ ...reaction, reactions: newD });
  }

  function handleEdit(v) {
    setShow(true);
    setEditData(v);
  }

  return (
    <div className="card">
      <div style={{ display: "flex", alignContent: "flex-start", justifyContent: "space-between" }}>
        <h2>
          {t("reaction_role")} {index + 1}
        </h2>

        <button onClick={() => deleteReaction(reaction)} className="btn btn-red btn-sm">
          {commonT("delete")}
        </button>
      </div>

      <div style={{ marginTop: "1rem" }} className="form-group">
        <label className="form-label" htmlFor="channelId">
          {t("channel")}
        </label>
        <select
          disabled={!reaction.editable}
          className="form-input"
          id="channelId"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
        >
          {guild.channels.map((r) => (
            <option key={r.id} value={r.id}>
              {(r as any).name}
            </option>
          ))}
        </select>

        <p>{t("channel_note")}</p>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>{t("roles")}</h3>
        {data.length <= 0 ? (
          <p>{t("no_roles_yet")}</p>
        ) : (
          data.map((v, idx) => {
            const role = guild.roles.find((r) => r.id === v.role_id);

            return (
              <div
                key={role?.id + v.emoji}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <p style={{ margin: "0.7rem 0.1rem" }}>
                  {role?.name} -{v.emoji}
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => handleEdit(v)}
                    className="btn btn-secondary btn-sm"
                  >
                    {commonT("edit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="btn btn-red btn-sm ml-5"
                  >
                    {commonT("delete")}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          style={{ marginBottom: "1rem" }}
          className="btn btn-secondary btn-sm"
          onClick={() => setShow((p) => !p)}
        >
          {t("add_emoji_and_role")}
        </button>

        {show ? (
          <AddReactionRole
            editData={editData}
            close={() => setShow(false)}
            onAdd={addReactionRole}
            onUpdate={updateReactionRole}
            guild={guild}
          />
        ) : null}
      </div>
    </div>
  );
};
