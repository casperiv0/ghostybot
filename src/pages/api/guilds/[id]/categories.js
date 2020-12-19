import { checkAuth, getGuildById, updateGuildById } from "../../../../utils/functions";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await checkAuth(req);
  } catch (e) {
    return res.json({ status: "error", error: e });
  }

  const guild = await getGuildById(query.id);

  switch (method) {
    case "PUT": {
      const body = req.body;
      const { type, name } = body;

      if (!type || !name) {
        return res.status(400).json({ status: "error", error: "Must provide `type` and `name`" });
      }

      if (type === "enable") {
        await updateGuildById(query.id, {
          disabled_categories: guild.disabled_categories.filter((c) => c !== name.toLowerCase()),
        });
      } else if (type === "disable") {
        await updateGuildById(query.id, {
          disabled_categories: [...guild.disabled_categories, name],
        });
      } else {
        return res.status(400).json({ status: "error", error: "invalid type" });
      }

      return res.json({ status: "success" });
    }

    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
