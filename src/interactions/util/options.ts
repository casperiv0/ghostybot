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
  {
    type: "SUB_COMMAND",
    name: "enlarge",
    description: "Enlarge an emoji",
    options: [
      {
        name: "emoji",
        type: "STRING",
        required: true,
        description: "The emoji you want to enlarge",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "pastebin",
    description: "Create a paste (pastebin.com)",
    options: [
      {
        name: "code",
        required: true,
        description: "This will be the paste code",
        type: "STRING",
      },
      {
        name: "extension",
        required: false,
        description: "The file extension",
        type: "STRING",
      },
      {
        name: "filename",
        required: false,
        description: "This will be the name of the paste",
        type: "STRING",
      },
      {
        type: "STRING",
        name: "expire-date",
        required: false,
        description: "When the paste will expire",
        choices: [
          {
            name: "Never",
            value: "N",
          },
          {
            name: "10 Minutes",
            value: "10M",
          },
          {
            name: "1 Hour",
            value: "1H",
          },
          {
            name: "1 Week",
            value: "1W",
          },
          {
            name: "2 Weeks",
            value: "2W",
          },
          {
            name: "1 Month",
            value: "1M",
          },
          {
            name: "6 Months",
            value: "6M",
          },
          {
            name: "1 Year",
            value: "1Y",
          },
        ],
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "uptime",
    description: "View the uptime of the bot",
  },
  {
    type: "SUB_COMMAND",
    name: "bug-report",
    description: "Report a bug to the bot developer",
    options: [
      {
        name: "text",
        required: true,
        description: "The bug description",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "feedback",
    description: "Send feedback to the bot developer",
    options: [
      {
        name: "text",
        required: true,
        description: "The feedback description",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "ctgs",
    description: "Create a shortened URL (ctgs.ga)",
    options: [
      {
        name: "slug",
        required: true,
        description: "The slug, the part after the domain",
        type: "STRING",
      },
      {
        name: "url",
        required: true,
        description: "The URL where it should be redirected to",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "suggest",
    description: "Suggest something for this guild",
    options: [
      {
        name: "text",
        required: true,
        description: "The suggestion description",
        type: "STRING",
      },
    ],
  },
];
