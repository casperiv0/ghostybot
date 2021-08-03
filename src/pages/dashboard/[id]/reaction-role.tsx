import * as React from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import Link from "next/link";
import { v4 } from "uuid";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Guild from "types/Guild";
import Loader from "@components/Loader";
import AlertMessage from "@components/AlertMessage";
import AddReactionRole from "@components/modal/add-reaction-role";
import { IReaction, Reaction } from "models/Reactions.model";

interface Props {
  guild: Guild<true> | null;
  isAuth: boolean;
  error: string | undefined;
}

const ReactionRolePage = ({ error, isAuth, guild }: Props) => {
  const [reactions, setReactions] = React.useState<IReaction[]>(guild?.reactions ?? []);

  function deleteReaction(reaction: IReaction) {
    setReactions((p) => p.filter((v) => v._id !== reaction._id));
  }

  function updateReaction(reaction: IReaction) {
    console.log(reaction);

    if (reactions.find((v) => v._id === reaction._id)) {
      setReactions((prev) =>
        prev.map((v) => {
          if (v._id === reaction._id) {
            v = reaction;
          }

          return v;
        }),
      );
    } else {
      setReactions((prev) => [...prev, reaction]);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  if (!isAuth) {
    return <Loader full />;
  }

  if (error) {
    return <AlertMessage type="error" message={error} />;
  }

  if (!guild) {
    return null;
  }

  console.log(reactions);

  return (
    <>
      <Head>
        <title>Manage reaction roles</title>
      </Head>

      <div className="page-title">
        <h4>{guild?.name} - Manage reaction roles</h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              Return
            </a>
          </Link>
          <button
            //   @ts-expect-error ignore
            onClick={() => setReactions((p) => [...p, { _id: v4() }])}
            className="btn btn-primary ml-5"
          >
            Add reaction role
          </button>
        </div>
      </div>

      <div className="grid">
        {reactions.length <= 0 ? (
          <p>This guild does not have any reaction roles yet.</p>
        ) : (
          reactions.map((reaction, idx) => {
            return (
              <ReactionRoleField
                index={idx}
                guild={guild}
                reaction={reaction}
                key={reaction._id + idx}
                deleteReaction={deleteReaction}
                updateReaction={updateReaction}
              />
            );
          })
        )}
      </div>

      <button style={{ marginTop: "1rem" }} className="btn btn-primary" onClick={onSubmit}>
        Save reaction roles
      </button>
    </>
  );
};

interface FieldProps {
  index: number;
  guild: Guild<true>;
  reaction: IReaction;
  deleteReaction: (r: IReaction) => void;
  updateReaction: (r: IReaction) => void;
}

const ReactionRoleField = ({
  index,
  reaction,
  guild,
  deleteReaction,
  updateReaction,
}: FieldProps) => {
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

  console.log(data);

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  const data = await (
    await fetch(
      `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${ctx.query.id}?reactions=true`,
      {
        headers: {
          auth: cookies?.token,
        },
      },
    )
  ).json();

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["guilds", "footer", "profile", "common"])),
      isAuth: data.error !== "invalid_token",
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default ReactionRolePage;
