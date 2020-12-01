import { handleApiRequest } from "../../utils/functions";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const guilds = await handleApiRequest(
        "/users/@me/guilds",
        req.cookies.token,
        "GET"
      );

      if (guilds.error) {
        return res.json({ error: guilds.error, status: "error" });
      }

      const isAdminGuilds = guilds.filter((guild) => {
        return (
          guild.permissions === "8" /* ADMINISTRATOR */ ||
          guild.permissions === "2147483647" /* ALL */
        );
      });
      const filteredGuilds = isAdminGuilds.map((guild) => {
        const g = req.bot.guilds.cache.get(guild.id);
        return { ...guild, ...g, inGuild: g ? true : false };
      });

      return res.json({ guilds: filteredGuilds });
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
