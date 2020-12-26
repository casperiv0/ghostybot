import {
  getGuildById,
  updateGuildById,
  handleApiRequest,
  createWebhook,
  checkAuth,
} from "../../../../utils/functions";
import { token } from "../../../../../config.json";
import hiddenItems from "../../../../data/hidden-items.json";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await checkAuth(req);
  } catch (e) {
    return res.json({ status: "error", error: e });
  }

  switch (method) {
    case "GET": {
      const guild = await handleApiRequest(
        `/guilds/${query.id}`,
        { type: "Bot", data: token },
        "GET"
      );
      const gChannels = await handleApiRequest(
        `/guilds/${query.id}/channels`,
        {
          type: "Bot",
          data: token,
        },
        "GET"
      );

      if (guild.error || guild.message) {
        return res.json({
          error: guild.error || guild.message,
          status: "error",
          invalid_token: guild.error === "invalid_token",
        });
      }

      const g = await getGuildById(guild.id);
      guild.channels = gChannels.filter((c) => {
        /* remove category 'channels' & voice channels */
        if (c.type === 4) return false; /* Category */
        if (c.type === 2) return false; /* Voice chat */
        if (c.type === 3) return false; /* group DM */
        if (c.type === 6) return false; /* store page */

        return true;
      });
      guild.categories = gChannels.filter((c) => c.type === 4);
      guild.voice_channels = gChannels.filter((c) => c.type === 2);
      guild.categories.unshift({ id: null, name: "Disabled" });
      guild.channels.unshift({ id: null, name: "Disabled" });
      guild.roles.unshift({ id: null, name: "Disabled" });
      guild.voice_channels.unshift({ id: null, name: "Disabled" });
      guild.roles = guild.roles.filter((r) => r.name !== "@everyone");

      hiddenItems.forEach((item) => {
        guild[item] = undefined;
      });

      return res.json({
        guild: { ...guild, ...g._doc },
        botCommands: req.bot.commands,
        status: "success",
      });
    }
    case "POST": {
      const body = JSON.parse(req.body);
      const g = await getGuildById(query.id);

      if (body.audit_channel) {
        await createWebhook(req.bot, body.audit_channel, g.audit_channel);
      }

      await updateGuildById(query.id, body);

      return res.json({
        status: "success",
        message: "Successfully updated guild settings",
      });
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
