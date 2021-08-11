# Command options

these are the available options for the commands

| Option            | Description                                          | Required | Default value       |
| ----------------- | ---------------------------------------------------- | -------- | ------------------- |
| name              | name of the command                                  | true     | `undefined`         |
| description       | description of the command                           | true     | `undefined`         |
| category          | category of the command                              | true     | `undefined`         |
| aliases           | array for aliases                                    | false    | `undefined`         |
| usage             | usage of the command                                 | false    | `undefined`         |
| cooldown          | command cooldown in seconds                          | false    | `undefined`         |
| options           | options will show in the help command                | false    | `undefined`         |
| memberPermissions | The permissions the member needs to run this command | false    | `undefined`         |
| botPermissions    | The permissions the bot needs to run this command    | false    | `["SEND_MESSAGES"]` |
| requiredArgs      | The required arguments the user needs to type        | false    | `undefined`         |

## Example command file

```js
import * as DJS from "discord.js";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

export default class MyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "",
      description: "",
      options: [],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    try {
      await interaction.reply("Hello");
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply({ content: lang.GLOBAL.ERROR });
    }
  }
}
```

---

[Return to index](README.md)
