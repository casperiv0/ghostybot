import * as React from "react";
import Guild from "types/Guild";
import AddReactionRole from "@components/modal/add-reaction-role";
import { IReaction, Reaction } from "models/Reactions.model";

interface Props {
  index: number;
  guild: Guild<true>;
  reaction: IReaction;
  deleteReaction: (r: IReaction) => void;
  updateReaction: (r: IReaction) => void;
}

const ReactionRoleField = ({ index, reaction, guild, deleteReaction, updateReaction }: Props) => {
  const [data, setData] = React.useState<Reaction[]>([]);
  const [show, setShow] = React.useState(false);

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

  function handleDelete(d: Reaction) {
    setData((p) => p.filter((v) => v.role_id !== d.role_id && v.emoji !== d.emoji));
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
        <h2>Reaction Role {index + 1}</h2>

        <button onClick={() => deleteReaction(reaction)} className="btn btn-red btn-sm">
          Delete
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>Roles</h3>
        {data.length <= 0 ? (
          <p>No roles yet</p>
        ) : (
          data.map((v) => {
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
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(v)}
                    className="btn btn-red btn-sm ml-5"
                  >
                    Delete
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
          Add emoji and role
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
export default ReactionRoleField;
