import * as DJS from "discord.js";
import filters from "assets/json/filters.json";

const loopTypes = [
  { value: 0, name: "0 (Disabled)" },
  { value: 1, name: "1 (Repeat song)" },
  { value: 2, name: "2 (Repeat entire queue)" },
];

export const musicOptions: DJS.ApplicationCommandOptionData[] = [
  //   {
  //     type: "SUB_COMMAND",
  //     name: "back",
  //     description: "Play back the previous song",
  //     options: [
  //       {
  //         type: "STRING",
  //         name: "query",
  //         description: "The URL or search query",
  //         required: true,
  //       },
  //     ],
  //   },
  {
    type: "SUB_COMMAND",
    name: "clear-queue",
    description: "Clear the current music queue",
  },
  {
    type: "SUB_COMMAND",
    name: "filter",
    description: "Set or remove a filter for the current queue",
    options: [
      {
        type: "STRING",
        name: "filter",
        required: true,
        description: "The filter to set or remove",
        choices: filters.map((v) => ({ value: v, name: v })),
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "loop",
    description: "Loop a song that is playing",
    options: [
      {
        type: "NUMBER",
        name: "type",
        required: true,
        description: "The loop type",
        choices: loopTypes,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "lyrics",
    description: "Get lyrics for a song",
    options: [
      {
        type: "STRING",
        name: "query",
        description: "The title of the song (Default: currently playing song)",
        required: false,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "now-playing",
    description: "Shows information about the current playing song",
  },
  {
    type: "SUB_COMMAND",
    name: "pause",
    description: "Pause the song that is playing",
  },
  {
    type: "SUB_COMMAND",
    name: "resume",
    description: "Resume..",
  },
  {
    type: "SUB_COMMAND",
    name: "play",
    description: "Play a song",
    options: [
      {
        description: "The URL or query to the song",
        name: "query",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "queue",
    description: "Show top 20 songs in the queue",
  },
  {
    type: "SUB_COMMAND",
    name: "remove",
    description: "Remove a song from the queue",
    options: [
      {
        description: "The position of the song in the queue",
        name: "track-number",
        required: true,
        type: "NUMBER",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "seek",
    description: "Seek through a song",
    options: [
      {
        description: "seconds/minutes/hours (eg: 200s, 10s, 1h)",
        name: "time",
        required: true,
        type: "STRING",
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "shuffle",
    description: "Shuffle the current queue",
  },
  {
    type: "SUB_COMMAND",
    name: "skip",
    description: "Skip the song that is playing",
  },
  {
    type: "SUB_COMMAND",
    name: "stop",
    description: "Stop the current queue",
  },
  {
    type: "SUB_COMMAND",
    name: "volume",
    description: "Set the volume for the current queue",
    options: [
      {
        description: "The new volume",
        name: "volume",
        required: true,
        type: "NUMBER",
      },
    ],
  },
];
