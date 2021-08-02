import * as DJS from "discord.js";

export const funOptions: DJS.ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "8ball",
    description: "8Ball",
    options: [
      {
        type: "STRING",
        description: "The question that needs to be answered",
        name: "question",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "advice",
    description: "Gives you advice",
  },
  {
    type: "SUB_COMMAND",
    name: "ascii",
    description: "Transform text to ascii",
    options: [
      {
        name: "text",
        description: "The text you want to transform",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "bet",
    description: "Bet on somebody",
    options: [
      {
        description: "The user you want to bet on",
        name: "user",
        type: "USER",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "block",
    description: "Transform text to block text",
    options: [
      {
        name: "text",
        description: "The text that you want to transform",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "compliment",
    description: "Get a compliment",
  },
  {
    type: "SUB_COMMAND",
    name: "dad-joke",
    description: "Returns a dad joke",
  },
  {
    type: "SUB_COMMAND",
    name: "flip-coin",
    description: "Flip a coin",
  },
  {
    type: "SUB_COMMAND",
    name: "happiness",
    description: "Get a happiness score returned",
  },
  {
    type: "SUB_COMMAND",
    name: "iq",
    description: "Get an IQ score returned",
  },
  {
    type: "SUB_COMMAND",
    name: "meme",
    description: "Returns a funny meme",
  },
  {
    type: "SUB_COMMAND",
    name: "morse",
    description: "Transform text to morse code",
    options: [
      {
        name: "text",
        type: "STRING",
        description: "The text you want to transform",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "quote",
    description: "Returns a random quote",
  },
  {
    type: "SUB_COMMAND",
    name: "random-joke",
    description: "Returns a random joke",
  },
  {
    type: "SUB_COMMAND",
    name: "random-number",
    description: "Returns a random number",
  },
  {
    type: "SUB_COMMAND",
    name: "rock-paper-scissors",
    description: "Rock Paper Scissors",
    options: [
      {
        required: true,
        type: "STRING",
        name: "item",
        description: "Rock? Paper? Scissors?",
        choices: [
          { name: "Rock", value: "rock" },
          { name: "Paper", value: "paper" },
          { name: "Scissors", value: "scissors" },
        ],
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "would-you-rather",
    description: "Would you rather..",
  },
  {
    type: "SUB_COMMAND",
    name: "lmgtfy",
    description: "Let me google that for ya?",
    options: [
      {
        required: true,
        type: "STRING",
        name: "query",
        description: "The search query",
      },
    ],
  },
];
