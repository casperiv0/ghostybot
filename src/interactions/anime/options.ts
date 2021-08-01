import * as DJS from "discord.js";

export const animeOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "baka",
    description: "Baka?",
  },
  {
    type: "SUB_COMMAND",
    name: "cuddle",
    description: "Cuddle with somebody",
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
    name: "feed",
    description: "Feed somebody",
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
    name: "hug",
    description: "Shows a picture of people hugging",
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
    name: "kiss",
    description: "Shows a picture of people kissing",
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
    name: "owo",
    description: "OwO",
  },
  {
    type: "SUB_COMMAND",
    name: "pat",
    description: "Pat somebody",
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
    name: "poke",
    description: "Poke somebody",
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
    name: "slap",
    description: "Slap somebody",
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
    name: "smug",
    description: "Smug",
  },
];
