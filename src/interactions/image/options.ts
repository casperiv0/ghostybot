import * as DJS from "discord.js";

export const imageOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "change-my-mind",
    description: "Change my mind..",
    options: [
      {
        name: "text",
        required: true,
        description: "The text that needs to be displayed",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "clyde",
    description: "Let clyde say something",
    options: [
      {
        name: "text",
        required: true,
        description: "The text that needs to be displayed",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "foodporn",
    description: "Shows Food images",
  },
  {
    type: "SUB_COMMAND",
    name: "giphy",
    description: "Return a giphy image",
    options: [
      {
        name: "query",
        description: "A search query for the image",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "imgfy",
    description: "text to image converter",
    options: [
      {
        name: "text",
        required: true,
        description: "The text that needs to be displayed",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "invert",
    description: "Invert an avatar",
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
    name: "magik",
    description: "Just Magik.",
    options: [
      {
        name: "user",
        description: "A user",
        type: "USER",
        required: false,
      },
      {
        name: "intensity",
        description: "The intensity of the Magik",
        type: "NUMBER",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "supreme",
    description: "Display custom text as the Supreme logo",
    options: [
      {
        name: "text",
        required: true,
        description: "The text that needs to be displayed",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "threshold",
    description: "threshold an avatar",
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
    name: "trash",
    description: "Put someone in the trash",
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
    name: "tweet",
    description: "Returns an image with your tweet",
    options: [
      {
        name: "text",
        required: true,
        description: "The text that needs to be displayed",
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "yt-comment",
    description: "Returns an image with your YouTube comment",
    options: [
      {
        name: "text",
        required: true,
        description: "The text that needs to be displayed",
        type: "STRING",
      },
    ],
  },
];
