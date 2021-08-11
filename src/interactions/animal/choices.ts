import * as DJS from "discord.js";
import fetch from "node-fetch";

export interface Choice extends DJS.ApplicationCommandOptionChoice {
  /**
   * @returns the URL to the image
   */
  fetchUrl: () => Promise<string>;
}

export const animalChoices: Choice[] = [
  {
    name: "Cat",
    value: "cat",
    async fetchUrl() {
      const data = await (await fetch("https://nekos.life/api/v2/img/meow")).json();
      return data.url;
    },
  },
  {
    name: "Dog",
    value: "dog",
    async fetchUrl() {
      const data = await (await fetch("https://dog.ceo/api/breeds/image/random")).json();
      return data.message;
    },
  },
  {
    name: "Fox",
    value: "fox",
    async fetchUrl() {
      const data = await (await fetch("https://randomfox.ca/floof")).json();
      return data.image;
    },
  },
  {
    name: "Kangaroo",
    value: "kangaroo",
    async fetchUrl() {
      const data = await (await fetch("https://some-random-api.ml/animal/kangaroo")).json();
      return data.image;
    },
  },
  {
    name: "Koala",
    value: "koala",
    async fetchUrl() {
      const data = await (await fetch("https://some-random-api.ml/img/koala")).json();
      return data.link;
    },
  },
  {
    name: "Lizard",
    value: "lizard",
    async fetchUrl() {
      const data = await (await fetch("https://nekos.life/api/v2/img/lizard")).json();
      return data.url;
    },
  },
  {
    name: "Panda",
    value: "panda",
    async fetchUrl() {
      const data = await (await fetch("https://some-random-api.ml/img/panda")).json();
      return data.link;
    },
  },
  {
    name: "Red Panda",
    value: "red-panda",
    async fetchUrl() {
      const data = await (await fetch("https://some-random-api.ml/animal/red_panda")).json();
      return data.image;
    },
  },
  {
    name: "Racoon",
    value: "racoon",
    async fetchUrl() {
      const data = await (await fetch("https://some-random-api.ml/img/racoon")).json();
      return data.link;
    },
  },

  {
    name: "Shibe",
    value: "panda",
    async fetchUrl() {
      const data = await (await fetch("http://shibe.online/api/shibes")).json();
      return data[0];
    },
  },
];
