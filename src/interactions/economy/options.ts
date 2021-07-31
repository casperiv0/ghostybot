import * as DJS from "discord.js";

export const economyOptions: DJS.ApplicationCommandOptionData[] = [
  // todo: add memberPermissions
  //   {
  //     type: "SUB_COMMAND",
  //     name: "add-money",
  //     description: "Add money to a user",
  //     options: [
  //       {
  //         type: "USER",
  //         name: "user",
  //         description: "The user you want to add money to",
  //         required: true,
  //       },
  //       {
  //         type: "NUMBER",
  //         name: "amount",
  //         description: "The amount you want to add",
  //         required: true,
  //       },
  //     ],
  //   },
  {
    type: "SUB_COMMAND",
    name: "balance",
    description: "See the balance of a user",
    options: [
      {
        type: "USER",
        required: false,
        name: "user",
        description: "The user you want to see their balance of",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "buy",
    description: "Buy something from the store",
    options: [
      {
        description: "The store item",
        name: "item",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "deposit",
    description: "Deposit money to your bank",
    options: [
      {
        description: "The amount you want to deposit",
        name: "amount",
        required: true,
        type: "NUMBER",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "dice",
    description: "Roll a dice and win 200 coins",
  },
  {
    type: "SUB_COMMAND",
    name: "inventory",
    description: "See the inventory of a user",
    options: [
      {
        type: "USER",
        required: false,
        name: "user",
        description: "The user you want to see their inventory of",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "money-leaderboard",
    description: "See the money leaderboard",
  },
  {
    type: "SUB_COMMAND",
    name: "pay",
    description: "Give money to a user",
    options: [
      {
        type: "USER",
        required: true,
        name: "user",
        description: "The user you want to give money too",
      },
      {
        type: "NUMBER",
        required: true,
        name: "amount",
        description: "The amount you want to give to the user",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "profile",
    description: "See the profile of a user",
    options: [
      {
        type: "USER",
        required: false,
        name: "user",
        description: "The user you want to see their profile of",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "rob",
    description: "Rob up to 1000 coins from somebody",
    options: [
      {
        type: "USER",
        required: true,
        name: "user",
        description: "The user you want to rob",
      },
      {
        type: "NUMBER",
        required: true,
        name: "amount",
        description: "The amount you want to rob from the user",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "slots",
    description: "Play the slots machine",
    options: [
      {
        type: "NUMBER",
        required: false,
        name: "amount",
        description: "An amount you want to bet",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "store",
    description: "See items in the store",
  },
  {
    type: "SUB_COMMAND",
    name: "weekly",
    description: "Claim your weekly",
  },
  {
    type: "SUB_COMMAND",
    name: "daily",
    description: "Claim your daily",
  },
  {
    type: "SUB_COMMAND",
    name: "work",
    description: "Work!",
  },
  {
    type: "SUB_COMMAND",
    name: "withdraw",
    description: "Withdraw money to your bank",
    options: [
      {
        description: "The amount you want to withdraw",
        name: "amount",
        required: true,
        type: "NUMBER",
      },
    ],
  },
];
