import * as React from "react";
import { Guild } from "types/Guild";
import { useTranslation } from "react-i18next";
import { Reaction } from "models/Reactions.model";

interface Props {
  guild: Guild<true>;
  close: () => void;
  onAdd: (reaction: Reaction) => void;
  onUpdate: (prev: Reaction, reaction: Reaction) => void;

  editData: Reaction | null;
}

export const AddReactionRole: React.FC<Props> = ({
  close,
  onAdd,
  onUpdate,
  editData,
  guild,
}: Props) => {
  const { t } = useTranslation("guilds");
  const [emoji, setEmoji] = React.useState("");
  const [roleId, setRoleId] = React.useState("");

  React.useEffect(() => {
    if (editData) {
      setEmoji(editData.emoji);
      setRoleId(editData.role_id);
    }
  }, [editData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editData) {
      onUpdate(editData, { emoji, role_id: roleId });
    } else {
      onAdd({ emoji, role_id: roleId });
    }

    setRoleId("");
    setEmoji("");
  }

  return (
    <form id="add-edit-reaction-role" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="emoji" className="form-label">
          Emoji
        </label>
        <input
          id="emoji"
          className="form-input"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          id="role"
          className="form-input"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          required
        >
          {guild.roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div className="float-right">
        <button type="button" onClick={close} className="btn btn-link btn-sm">
          Cancel
        </button>
        <button
          form="add-edit-reaction-role"
          className="btn btn-secondary btn-sm ml-5"
          type="submit"
        >
          {editData ? "Update" : t("add_item")}
        </button>
      </div>
    </form>
  );
};
