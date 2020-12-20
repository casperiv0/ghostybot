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
module.exports = {
  name: "addrole",
  aliases: ["ar", "arole", "giverole"],
  description: "Add a role to a user",
  category: "admin",
  memberPermissions: ["SEND_MESSAGES", "MANAGE_ROLES", "ADMINISTRATOR"],
  botPermissions: ["MANAGE_ROLES"],
  requiredArgs: ["member", "role"],
  async execute(bot, message, args) {
    // Command code here
  },
};
```

##

[Return to index](README.md)
