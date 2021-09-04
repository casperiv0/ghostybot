import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import * as React from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { AlertMessage } from "@components/AlertMessage";
import categories from "assets/json/categories.json";
import { Guild } from "types/Guild";
import { Loader } from "@components/Loader";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  guild: Guild | null;
  isAuth: boolean;
  error: string | undefined;
}

const ManageCategories = ({ guild, isAuth, error }: Props) => {
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null>(null);
  const [filtered, setFiltered] = React.useState(categories);
  const { t } = useTranslation("guilds");
  const { t: commonT } = useTranslation("common");

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  React.useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

  function handleSearch(value: string) {
    let filter: string[];

    if (value === "@enabled") {
      filter = categories.filter((cat) => {
        return !guild?.disabled_categories.find((c) => c === cat);
      });
    } else if (value === "@disabled") {
      filter = categories.filter((cat) => {
        return !!guild?.disabled_categories.find((c) => c === cat);
      });
    } else {
      filter = categories.filter((cate) => cate.toLowerCase().includes(value.toLowerCase()));
    }

    setFiltered(filter);
  }

  async function updateCategory(type: string, category: string) {
    const data = (await (
      await fetch(
        `${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${guild?.id}/categories`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: category,
            type,
          }),
        },
      )
    ).json()) as any;

    if (data.status === "success") {
      router.push(
        `/dashboard/${guild?.id}/manage-categories?message=Successfully ${
          type === "enable" ? "enabled" : "disabled"
        } category: ${category}`,
      );
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
          {t("manage_categories")} - {process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}
        </title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <div className="page-title">
        <h4>
          {guild?.name} - {t("manage_categories")}
        </h4>

        <div>
          <Link href={`/dashboard/${guild.id}`}>
            <a href={`/dashboard/${guild.id}`} className="btn btn-primary">
              {commonT("return")}
            </a>
          </Link>
        </div>
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="search">
          {t("search_for_categories")}
        </label>
        <input
          id="search"
          className="form-input"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search query | @enabled | @disabled"
        />
      </div>

      <div className="grid">
        {filtered
          ?.filter((category) => !["botowner", "exempt", "disabled", "custom"].includes(category))
          ?.map((category, idx) => {
            const isDisabled = guild.disabled_categories?.find((c) => c === category);
            return (
              <div id={`${idx}`} key={category} className="card cmd-card">
                <p>{category}</p>

                <div>
                  <button
                    onClick={() => updateCategory(isDisabled ? "enable" : "disable", category)}
                    className="btn btn-secondary"
                  >
                    {isDisabled ? t("enable") : t("disable")}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  const data = (await (
    await fetch(`${process.env["NEXT_PUBLIC_DASHBOARD_URL"]}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json()) as any;

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["guilds", "footer", "profile", "common"])),
      isAuth: data.error !== "invalid_token",
      guild: data?.guild ?? null,
      error: data?.error ?? null,
    },
  };
};

export default ManageCategories;
