import * as DJS from "discord.js";

export const adminOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "ban",
    description: "Ban a user from the current guild",
    options: [
      {
        name: "user",
        description: "A user",
        type: "USER",
        required: true,
      },
      {
        name: "reason",
        description: "The ban reason",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "kick",
    description: "Kick a user from the current guild",
    options: [
      {
        name: "user",
        description: "A user",
        type: "USER",
        required: true,
      },
      {
        name: "reason",
        description: "The kick reason",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "delete",
    description: "Delete up to 100 messages within 14 days",
    options: [
      {
        name: "amount",
        description: "Min: 1. Max: 100",
        type: "NUMBER",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "mute",
    description: "Mute/tempmute a user",
    options: [
      {
        name: "user",
        description: "The user to mute",
        type: "USER",
        required: true,
      },
      {
        name: "reason",
        description: "The mute reason",
        type: "STRING",
        required: false,
      },
      {
        name: "time",
        description: "How long the user will be muted (Default: Until manually unmuted)",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "unmute",
    description: "Unmute a user",
    options: [
      {
        name: "user",
        description: "The user to unmute",
        type: "USER",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "warn",
    description: "Warn a user",
    options: [
      {
        name: "user",
        description: "The user to unmute",
        type: "USER",
        required: true,
      },
      {
        name: "reason",
        description: "The warn reason",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "lock-channel",
    description: "Lock the current channel",
    options: [
      {
        name: "reason",
        description: "The reason why the channel should be locked",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "unlock-channel",
    description: "Unlock the current channel",
  },
  {
    type: "SUB_COMMAND",
    name: "say",
    description: "Let the bot say something",
    options: [
      {
        name: "text",
        type: "STRING",
        required: true,
        description: "The text",
      },
      {
        name: "embed",
        type: "BOOLEAN",
        required: false,
        description: "Send the text in an embed",
      },
    ],
  },
  {
    type: "SUB_COMMAND_GROUP",
    name: "sticky",
    description: "Manage stickies",
    options: [
      {
        type: "SUB_COMMAND",
        name: "set",
        description: "Set a new sticky message for the current channel",
        options: [
          {
            name: "text",
            required: true,
            description: "The text you want as a sticky message",
            type: "STRING",
          },
        ],
      },
      {
        type: "SUB_COMMAND",
        name: "remove",
        description: "Remove the sticky message for the current channel",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "steal-emoji",
    description: "Add an emoji from a different guild to this guild",
    options: [
      {
        name: "emoji",
        type: "STRING",
        required: true,
        description: "The emoji you want to add",
      },
      {
        name: "name",
        type: "STRING",
        required: true,
        description: "The name of the emoji",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "unban",
    description: "Unban a member from the current guild",
    options: [
      {
        name: "user-id",
        type: "STRING",
        required: true,
        description: "The user id of the banned member",
      },
    ],
  },
];
