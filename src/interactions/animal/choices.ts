import * as DJS from "discord.js";
import { request } from "undici";

export interface Choice extends DJS.ApplicationCommandOptionChoiceData {
  /**
   * @returns the URL to the image
   */
  fetchUrl(): Promise<string>;
}

export const animalChoices: Choice[] = [
  {
    name: "Cat",
    value: "cat",
    async fetchUrl() {
      const data = (await (await request("https://nekos.life/api/v2/img/meow")).body.json()) as {
        url: string;
      };
      return data.url;
    },
  },
  {
    name: "Dog",
    value: "dog",
    async fetchUrl() {
      const data = (await (
        await request("https://dog.ceo/api/breeds/image/random")
      ).body.json()) as {
        message: string;
      };
      return data.message;
    },
  },
  {
    name: "Fox",
    value: "fox",
    async fetchUrl() {
      const data = (await (await request("https://randomfox.ca/floof")).body.json()) as {
        image: string;
      };
      return data.image;
    },
  },
  {
    name: "Kangaroo",
    value: "kangaroo",
    async fetchUrl() {
      const data = (await (
        await request("https://some-random-api.ml/animal/kangaroo")
      ).body.json()) as {
        image: string;
      };
      return data.image;
    },
  },
  {
    name: "Koala",
    value: "koala",
    async fetchUrl() {
      const data = (await (await request("https://some-random-api.ml/img/koala")).body.json()) as {
        link: string;
      };
      return data.link;
    },
  },
  {
    name: "Lizard",
    value: "lizard",
    async fetchUrl() {
      const data = (await (await request("https://nekos.life/api/v2/img/lizard")).body.json()) as {
        url: string;
      };
      return data.url;
    },
  },
  {
    name: "Panda",
    value: "panda",
    async fetchUrl() {
      const data = (await (await request("https://some-random-api.ml/img/panda")).body.json()) as {
        link: string;
      };
      return data.link;
    },
  },
  {
    name: "Red Panda",
    value: "red-panda",
    async fetchUrl() {
      const data = (await (
        await request("https://some-random-api.ml/animal/red_panda")
      ).body.json()) as {
        image: string;
      };
      return data.image;
    },
  },
  {
    name: "Racoon",
    value: "racoon",
    async fetchUrl() {
      const data = (await (await request("https://some-random-api.ml/img/racoon")).body.json()) as {
        link: string;
      };
      return data.link;
    },
  },

  {
    name: "Shibe",
    value: "panda",
    async fetchUrl() {
      const [data] = (await (
        await request("http://shibe.online/api/shibes")
      ).body.json()) as string[];
      return data;
    },
  },
];
