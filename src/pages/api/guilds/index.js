import { handleApiRequest } from "../../../utils/functions";

export default async function handler(req, res) {
  const { method, headers } = req;

  switch (method) {
    case "GET": {
      const token = req.cookies.token || headers.auth;
      const guilds = await handleApiRequest(
        "/users/@me/guilds",
        { data: token, type: "Bearer" },
        "GET"
      );

      if (guilds.error || guilds.message) {
        return res.json({
          error: guilds.error || guilds.message,
          status: "error",
          invalid_token: guilds.error === "invalid_token",
        });
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
