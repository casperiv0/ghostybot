import * as DJS from "discord.js";

export const levelsOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    description: "Give a user xp",
    name: "givexp",
    options: [
      {
        name: "user",
        description: "The user you want to give XP",
        type: "USER",
        required: true,
      },
      {
        name: "amount",
        description: "The amount you want to give",
        type: "NUMBER",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Shows top 10 users with the highest amount of XP",
    name: "leaderboard",
  },
  {
    type: "SUB_COMMAND",
    description: "Get the rank of a user or yourself",
    name: "rank",
    options: [
      {
        name: "user",
        description: "A user",
        type: "USER",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Remove xp from a user",
    name: "removexp",
    options: [
      {
        name: "user",
        description: "The user you want to remove XP",
        type: "USER",
        required: true,
      },
      {
        name: "amount",
        description: "The amount you want to remove",
        type: "NUMBER",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Get the xp of a user or yourself",
    name: "xp",
    options: [
      {
        name: "user",
        description: "A user",
        type: "USER",
        required: false,
      },
    ],
  },
];
