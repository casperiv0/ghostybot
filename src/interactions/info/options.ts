import * as DJS from "discord.js";

export const infoOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "bot",
    description: "Get information about GhostyBot",
  },
  {
    type: "SUB_COMMAND",
    description: "Get COVID-19 information",
    name: "covid",
    options: [
      {
        name: "country",
        description: "The country you want extra information of",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Get information about a country",
    name: "country",
    options: [
      {
        name: "country",
        description: "The country you want to get information about",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "guild",
    description: "Get information about the current guild",
  },
  {
    type: "SUB_COMMAND",
    name: "user",
    description: "Get information about a user",
    options: [
      {
        description: "The user you want more information about",
        name: "user",
        required: false,
        type: "USER",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "channel",
    description: "Get information about a channel",
    options: [
      {
        description: "The channel you want more information about",
        name: "channel",
        required: false,
        type: "CHANNEL",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "emoji",
    description: "Get information about an emoji",
    options: [
      {
        description: "The emoji you want more information about",
        name: "emoji",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "invite",
    description: "Get information about an invite code",
    options: [
      {
        description: "The invite code",
        name: "code",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Get information about an IP address",
    name: "ip",
    options: [
      {
        name: "ip",
        description: "The IP address you want to lookup",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Returns a pokémon information",
    name: "pokemon",
    options: [
      {
        name: "query",
        description: "The search query",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Search packages on npm by their name",
    name: "npm",
    options: [
      {
        name: "query",
        description: "The search query",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "role",
    description: "Get information about a role in the current guild",
    options: [
      {
        description: "The role you want more information about",
        name: "role",
        required: true,
        type: "ROLE",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    description: "Get information about a country",
    name: "weather",
    options: [
      {
        name: "query",
        description: "Can be a country, city, state",
        type: "STRING",
        required: true,
      },
    ],
  },
];
