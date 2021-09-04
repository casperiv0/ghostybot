import * as DJS from "discord.js";
import fetch from "node-fetch";
import timeoutSignal from "timeout-signal";
import URL from "node:url";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const PORN_BLACKLIST_LIST_URL =
  "https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt";
const CAPTURE_URL = "https://image.thum.io/get/width/2160/crop/3840/noanimate/";

export default class WebCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "web",
      description: "View a screenshot of a website",
      options: [
        {
          name: "url",
          type: "STRING",
          required: true,
          description: "The URL of the website",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const url = interaction.options.getString("url", true);

    if (!url.startsWith("http")) {
      return interaction.reply({ ephemeral: true, content: lang.UTIL.WEB_HTTP });
    }

    await interaction.deferReply();

    const available = await this.isAvailable(url);

    if (!available) {
      return interaction.editReply({ content: lang.UTIL.WEB_UNAVAILABLE });
    }

    const isNSFW = await this.isNsfw(url);

    if (!(interaction.channel as DJS.TextChannel)?.nsfw && isNSFW) {
      return interaction.reply({ content: lang.UTIL.WEB_NSFW });
    }

    const result = `${CAPTURE_URL}${url}`;
    const attachment = new DJS.MessageAttachment(result, "capture.png");

    await interaction.editReply({ files: [attachment] });
  }

  async isAvailable(url: string) {
    let available = false;
    try {
      await fetch(url, { signal: timeoutSignal(2_000) });

      return (available = true);
    } catch {
      available = false;
    }

    return available;
  }

  async isNsfw(url: string) {
    const res = await fetch(PORN_BLACKLIST_LIST_URL).then((res) => res.text());

    const parsed = URL.parse(url);
    const list = [
      ...res
        .split("\n")
        .filter((s) => !s.startsWith("#"))
        .map((s) => s.replace("0.0.0.0", "")),
      "pornhub.com",
    ].join("\n");

    const includes = list.includes(parsed.host!);
    const includesPorn = await (
      await fetch(url, {
        signal: timeoutSignal(2_500),
      }).then((res) => res.text())
    ).includes("porn");

    if (!includes && !includesPorn) return false;
    if (includes && includesPorn) return true;
    if (includes || !includesPorn) return true;
    if (!includes || includes) return true;
  }
}
