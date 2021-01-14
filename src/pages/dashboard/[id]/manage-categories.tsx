import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import categories from "../../../data/categories.json";
import Guild from "../../../interfaces/Guild";
import { GetServerSideProps } from "next";

interface Props {
  guild: Guild;
  isAuth: boolean;
}

const ManageCategories = ({ guild, isAuth }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [filtered, setFiltered] = useState(categories);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
  }, [router, isAuth]);

  useEffect(() => {
    const { query } = router;
    setMessage((query?.message && `${query.message}`) || null);
  }, [router]);

  function handleSearch(value: string) {
    let filter: string[];

    if (value === "@enabled") {
      filter = categories.filter((cat) => {
        return !guild.disabled_categories.find((c) => c === cat);
      });
    } else if (value === "@disabled") {
      filter = categories.filter((cat) => {
        return !!guild.disabled_categories.find((c) => c === cat);
      });
    } else {
      filter = categories.filter((cate) => cate.toLowerCase().includes(value.toLowerCase()));
    }

    setFiltered(filter);
  }

  async function updateCategory(type: string, category: string) {
    const data = await (
      await fetch(`${dashboard.dashboardUrl}/api/guilds/${guild.id}/categories`, {
        method: "PUT",
        body: JSON.stringify({
          name: category,
          type: type,
        }),
      })
    ).json();

    if (data.status === "success") {
      router.push(
        `/dashboard/${guild.id}/manage-categories?message=Successfully ${
          type === "enable" ? "enabled" : "disabled"
        } category: ${category}`
      );
    }
  }

  return (
    <>
      <Head>
        <title>Manage categories - {dashboard.botName}</title>
      </Head>
      {message ? <AlertMessage type="success" message={message} /> : null}
      <div className="page-title">
        <h4>{guild?.name} - Enable/disable categories</h4>

        <div>
          <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
            Return
          </a>
        </div>
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="search">
          Search for categories
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
                    {isDisabled ? "Enable" : "Disable"}
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

  const data = await (
    await fetch(`${dashboard.dashboardUrl}/api/guilds/${ctx.query.id}`, {
      headers: {
        auth: cookies?.token,
      },
    })
  ).json();

  return {
    props: {
      isAuth: data.error !== "invalid_token",
      guild: data?.guild || {},
    },
  };
};

export default ManageCategories;
