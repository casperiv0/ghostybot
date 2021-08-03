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
import { IReaction } from "models/Reactions.model";
import ReactionRoleField from "@/src/dashboard/components/reaction-role/ReactionRoleField";

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
