import { getGuildById, updateGuildById } from "../../../../utils/functions";

export default async function handler(req, res) {
  const { method, query } = req;
  const guild = await getGuildById(query.id);

  switch (method) {
    case "POST": {
      const body = JSON.parse(req.body);

      if (!body.name || !body.response) {
        return res.json({
          error: "Please fill in all fields",
          status: "error",
        });
      }

      await updateGuildById(query.id, {
        custom_commands: [
          ...guild.custom_commands,
          { name: body.name, response: body.response },
        ],
      });

      return res.json({ status: "success" });
    }
    case "PUT": {
      const body = JSON.parse(req.body);
      const { type, name } = body;

      if (!type || !name) {
        return res.status(400).json({ status: "error" });
      }

      if (type === "enable") {
        await updateGuildById(query.id, {
          disabled_commands: guild.disabled_commands.filter(
            (c) => c !== name.toLowerCase()
          ),
        });
      } else if (type === "disable") {
        await updateGuildById(query.id, {
          disabled_commands: [...guild.disabled_commands, name],
        });
      } else {
        return res.status(400).json({ status: "error", error: "invalid type" });
      }

      return res.json({ status: "success" });
    }
    case "DELETE": {
      const filtered = guild.custom_commands?.filter(
        (cmd) => cmd.name.toLowerCase() !== query.name.toLowerCase()
      );

      await updateGuildById(query.id, { custom_commands: filtered });

      return res.json({
        status: "success",
        message: `Successfully delete command: ${query.name}`,
      });
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
