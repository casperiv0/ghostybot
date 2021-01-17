import { NextApiResponse } from "next";
import ApiRequest from "../../../../interfaces/ApiRequest";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await req.bot.utils.checkAuth(req);
  } catch (e) {
    return res.json({ status: "error", error: e });
  }

  const guild = await req.bot.utils.getGuildById(`${query.id}`);
  if (!guild) {
    return res.json({
      status: "error",
      error: "An unexpected error occurred",
    });
  }

  switch (method) {
    case "POST": {
      const body = JSON.parse(req.body);
      const word = body.word;

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

      await req.bot.utils.updateGuildById(`${query.id}`, {
        blacklistedwords: [...guild.blacklistedwords, word.toLowerCase()],
      });

      return res.json({ status: "success" });
    }
    case "DELETE": {
      const word = query.word;

      if (!word) {
        return res.status(400).json({ status: "error", error: "Must provide a word" });
      }

      await req.bot.utils.updateGuildById(`${query.id}`, {
        blacklistedwords: guild.blacklistedwords?.filter((w: string) => {
          return w.toLowerCase() !== (word as string).toLowerCase();
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
