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
    case "POST": {
      const body = JSON.parse(req.body);
      const { word } = body;

      if (!word) {
        return res.status(400).json({ status: "error", error: "Please fill in all fields" });
      }

      if (req.bot.commands.has(word.toLowerCase())) {
        return res.status(400).json({
          status: "error",
          error: "That word cannot be blacklisted because it's a bot command",
        });
      }

      if (guild.blacklistedwords.includes(word.toLowerCase())) {
        return res.status(400).json({
          error: "Word already is already blacklsited in this guild",
          status: "error",
        });
      }

      await updateGuildById(query.id, {
        blacklistedwords: [...guild.blacklistedwords, word.toLowerCase()],
      });

      return res.json({ status: "success" });
    }
    case "DELETE": {
      const word = query.word;

      if (!word) {
        return res.status(400).json({ status: "error", error: "Must provide a word" });
      }

      await updateGuildById(query.id, {
        blacklistedwords: guild.blacklistedwords?.filter((w) => {
          return w.toLowerCase() !== word.toLowerCase();
        }),
      });

      return res.json({
        status: "success",
        message: `Successfully deleted blacklisted word: ${word}`,
      });
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
