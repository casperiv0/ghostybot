import { NextApiResponse } from "next";
import { ApiRequest } from "types/ApiRequest";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const guildCount = req.bot.guilds.cache.size;
      const userCount = req.bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
      const channelCount = req.bot.channels.cache.size;
      const commandCount = req.bot.interactions.size;
      const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

      return res.json({
        status: "success",
        guilds: {
          formatted: req.bot.utils.formatNumber(guildCount),
          default: guildCount,
        },
        channels: {
          formatted: req.bot.utils.formatNumber(channelCount),
          default: channelCount,
        },
        users: {
          formatted: req.bot.utils.formatNumber(userCount),
          default: userCount,
        },
        commands: {
          formatted: req.bot.utils.formatNumber(commandCount),
          default: commandCount,
        },
        memory: {
          formatted: `${memoryUsage}MB`,
          default: memoryUsage,
        },
      });
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
