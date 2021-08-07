import * as DJS from "discord.js";

export const utilOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "avatar",
    description: "View the avatar of a user",
    options: [
      {
        name: "user",
        required: false,
        description: "The user you want to see the avatar of",
        type: "USER",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "bmi",
    description: "Calculate your body mass index",
    options: [
      {
        name: "height",
        required: true,
        description: "Your height in centimeters",
        type: "NUMBER",
      },
      {
        name: "weight",
        required: true,
        description: "Your weight in kilograms",
        type: "NUMBER",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "calculate",
    description: "Calculate something",
    options: [
      {
        name: "calculation",
        required: true,
        description: "What you want to calculate",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "translate",
    description: "Translate something",
    options: [
      {
        name: "language",
        description: "The language you want to translate to",
        type: "STRING",
        required: true,
      },
      {
        name: "sentence",
        description: "The sentence you want to translate",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "server-icon",
    description: "View the icon of the current guild",
  },
  {
    type: "SUB_COMMAND",
    name: "bot-invite",
    description: "Generate a bot invite URL for GhostyBot",
  },
  {
    type: "SUB_COMMAND",
    name: "poll",
    description: "Create a poll in the current channel",
    options: [
      {
        name: "question",
        type: "STRING",
        required: true,
        description: "The question",
      },
    ],
  },
];
