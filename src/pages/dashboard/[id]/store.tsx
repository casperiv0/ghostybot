import fetch from "node-fetch";
import { parseCookies } from "nookies";
import Head from "next/head";
import { dashboard } from "../../../../config.json";
import { openModal } from "../../../dashboard/components/modal";
import AddStoreItem from "../../../dashboard/components/modal/add-store-item";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AlertMessage from "../../../dashboard/components/AlertMessage";
import Logger from "../../../modules/Logger";
import Guild from "../../../interfaces/Guild";
import { GetServerSideProps } from "next";

interface Props {
  guild: Guild;
  isAuth: boolean;
}

const Store: FC<Props> = ({ guild, isAuth }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

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

  async function deleteItem(name: string) {
    try {
      const data = await (
        await fetch(
          `${dashboard.dashboardUrl}/api/guilds/${guild.id}/store?name=${encodeURIComponent(name)}`,
          {
            method: "DELETE",
          }
        )
      ).json();

      if (data.status === "success") {
        router.push(`/dashboard/${guild.id}/store?message=${data.message}`);
      }

      setMessage(data?.error);
    } catch (e) {
      Logger.error("delete_store_item", e);
    }
  }

  function addStoreItem() {
    openModal("addStoreItem");
  }

  return (
    <>
      {message ? <AlertMessage type="success" message={message} /> : null}

      <AddStoreItem guild={guild} />
      <Head>
        <title>
          {guild?.name} - Store / {dashboard.botName} Dashboard
        </title>
      </Head>
      <div className="page-title">
        <h4>{guild?.name} - Store</h4>

        <div>
          <a className="btn btn-primary" href={`/dashboard/${guild.id}`}>
            Return
          </a>
          <button className="btn btn-primary ml-5" onClick={addStoreItem}>
            Add store item
          </button>
        </div>
      </div>

      {guild?.store?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guild?.store?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="cmd-response">{item.name}</td>
                  <td>{item.price}</td>
                  <td className="table-actions">
                    <button onClick={() => deleteItem(item.name)} className="btn btn-sm btn-red">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>This guid does not have any items in the store yet</p>
      )}
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

export default Store;
