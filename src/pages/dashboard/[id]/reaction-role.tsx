import * as React from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import Link from "next/link";
import { v4 } from "uuid";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Guild } from "types/Guild";
import { Loader } from "@components/Loader";
import { AlertMessage } from "@components/AlertMessage";
import { IReaction } from "models/Reactions.model";
import { ReactionRoleField } from "@components/reaction-role/ReactionRoleField";
import { State } from "./settings";
import { useTranslation } from "next-i18next";

interface Props {
  guild: Guild<true> | null;
  isAuth: boolean;
  error: string | undefined;
}

const ReactionRolePage = ({ error, isAuth, guild }: Props) => {
  const [reactions, setReactions] = React.useState<IReaction[]>(guild?.reactions ?? []);
  const [state, setState] = React.useState<State>({ state: "idle", message: null });

  const { t: t } = useTranslation("reaction-role");
  const { t: commonT } = useTranslation("common");

  async function deleteReaction(reaction: IReaction) {
    setReactions((p) => p.filter((v) => v._id !== reaction._id));

    await fetch(
      `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild?.id}/reaction-role`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: reaction._id,
        }),
      },
    );
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
    setState({ state: "loading", message: null });

    try {
      const data = await (
        await fetch(
          `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild?.id}/reaction-role`,
          {
            method: "POST",
            body: JSON.stringify({
              reactions,
            }),
          },
        )
      ).json();

      if (data.error || data.status === "error") {
        return setState({ state: "error", message: data.error });
      }

      setState({ state: "idle", message: "Successfully updated" });
    } catch (e) {
      console.error(e);
      setState({ state: "error", message: "An error occurred" });
    }
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
        <title>
          {guild?.name} - {t("Manage reaction roles")}
        </title>
      </Head>

      <div className="page-title">
        <h4>
          {guild?.name} - {t("manage_reaction_roles")}
        </h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              {commonT("return")}
            </a>
          </Link>
          <button
            //   @ts-expect-error ignore
            onClick={() => setReactions((p) => [...p, { editable: true, _id: v4() }])}
            className="btn btn-primary ml-5"
          >
            {t("add_reaction_role")}
          </button>
        </div>
      </div>

      {state.message ? (
        <AlertMessage
          type={state.state === "error" ? "error" : "success"}
          message={state.message}
        />
      ) : null}

      <div className="grid">
        {reactions.length <= 0 ? (
          <p>{t("no_reaction_roles")}</p>
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

      {reactions.length > 0 ? (
        <button
          disabled={state.state === "loading"}
          style={{ marginTop: "1rem" }}
          className="btn btn-primary"
          onClick={onSubmit}
        >
          {state.state === "loading" ? "loading..." : "Save reaction roles"}
        </button>
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  const data = (await (
    await fetch(
      `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${ctx.query.id}?reactions=true`,
      {
        headers: {
          auth: cookies?.token,
        },
      },
    )
  ).json()) as any;

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, [
        "guilds",
        "footer",
        "profile",
        "common",
        "reaction-role",
      ])),
      isAuth: data.error !== "invalid_token",
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default ReactionRolePage;
