import { getGuildById, updateGuildById } from "../../../../utils/functions";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "POST": {
      const body = JSON.parse(req.body);

      if (!body.name || !body.response) {
        return res.json({
          error: "Please fill in all fields",
          status: "error",
        });
      }

      const guild = await getGuildById(query.id);

      await updateGuildById(query.id, {
        custom_commands: [
          ...guild.custom_commands,
          { name: body.name, response: body.response },
        ],
      });

      return res.json({ status: "success" });
    }
    case "DELETE": {
      const guild = await getGuildById(query.id);

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
