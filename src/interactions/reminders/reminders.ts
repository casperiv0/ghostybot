// import { CommandInteraction } from "discord.js";
// import Bot from "structures/Bot";
// import Interaction from "structures/Interaction";

// export default class RemindersCommand extends Interaction {
//   constructor(bot: Bot) {
//     super(bot, {
//       name: "reminders",
//       description: "Manage your reminders",
//       category: "reminder",
//       options: [
//         {
//           type: "SUB_COMMAND_GROUP",
//           name: "type",
//           description: "The type",
//           options: [
//             {
//               type: "SUB_COMMAND",
//               name: "add",
//               description: "Add a new reminder",
//             },
//             {
//               type: "SUB_COMMAND",
//               name: "remove",
//               description: "Remove a reminder",
//             },
//           ],
//         },
//       ],
//     });
//   }

//   async execute(interaction: CommandInteraction) {
//     const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

//     try {
//       const x = "hjell";
//       console.log(x);
//     } catch (err) {
//       this.bot.utils.sendErrorLog(err, "error");
//       return interaction.reply(lang.GLOBAL.ERROR);
//     }
//   }
// }
export {};
