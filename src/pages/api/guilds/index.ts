import { NextApiResponse } from "next";
import { PermissionsBitField } from "discord.js";
import hiddenGuildItems from "assets/json/hidden-items.json";
import { ApiRequest } from "types/ApiRequest";
import { Guild } from "types/Guild";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { stringify } from "superjson";

const extraHidden = ["voiceStats", "stageInstances", "bans", "commands"];

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, headers } = req;

  switch (method) {
    case "GET": {
      const token = req.cookies.token || headers.auth;
      const guilds = await req.bot.utils.handleApiRequest(
        "/users/@me/guilds",
        { data: `${token}`, type: "Bearer" },
        "GET",
      );

      if (guilds.error || guilds.message) {
        return res.json({
          error: guilds.error || guilds.message,
          status: "error",
          invalid_token: guilds.error === "invalid_token",
        });
      }

      const isAdminGuilds = guilds.filter((guild: Guild) => {
        const bits = BigInt(guild.permissions as number);
        const permissions = new PermissionsBitField(bits);

        return permissions.has(PermissionFlagsBits.Administrator);
      });

      const filteredGuilds = isAdminGuilds.map((guild: Guild) => {
        const g = req.bot.guilds.cache.get(guild.id);

        return {
          ...guild,
          ...g,
          inGuild: !!g,
        };
      });

      filteredGuilds.forEach((guild: Guild) => {
        [...hiddenGuildItems, ...extraHidden].forEach((item) => {
          return (guild[item] = null);
        });
      });

      return res.json(stringify({ guilds: filteredGuilds }));
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
