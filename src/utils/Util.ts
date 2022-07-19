import * as DJS from "discord.js";
import { codeBlock, time } from "@discordjs/builders";
import jwt from "jsonwebtoken";
import { Bot } from "structures/Bot";
import { ApiRequest } from "types/ApiRequest";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export class Util {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  get commandCount() {
    let count = 0;

    this.bot.interactions.forEach((interaction) => {
      count += 1;

      interaction.options.options?.forEach((option) => {
        if (option.type === DJS.ApplicationCommandOptionType.Subcommand) {
          count += 1;
        }
      });
    });

    return count;
  }

  getMe(data: { guild: DJS.Guild } | DJS.Guild | null | undefined) {
    if (!data) return null;

    if ("guild" in data) {
      return data.guild?.members.me ?? null;
    }

    if ("members" in data) {
      return data.members.me ?? null;
    }

    return null;
  }

  async getUserById(userId: string, guildId: string | undefined) {
    if (!guildId) return null;

    try {
      const user =
        (await prisma.users.findFirst({
          where: { user_id: userId, guild_id: guildId },
        })) ?? (await this.addUser(userId, guildId));

      return user;
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async getUserWarnings(userId: string, guildId: string | undefined) {
    return prisma.warnings.findMany({
      where: { user_id: userId, guild_id: guildId },
    });
  }

  async removeUserWarnings(userId: string, guildId: string | undefined) {
    try {
      await prisma.warnings.deleteMany({
        where: {
          user_id: userId,
          guild_id: guildId,
        },
      });
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async addUser(userId: string, guildId: string | undefined, data?: any) {
    if (!guildId) return null;

    try {
      const user = await prisma.users.create({
        data: {
          user_id: userId,
          guild_id: guildId,
          ...data,
        },
      });

      return user;
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async updateUserById(
    userId: string,
    guildId: string | undefined,
    data: Partial<Prisma.usersUpdateManyArgs["data"]>,
  ) {
    try {
      const user = await this.getUserById(userId, guildId);

      if (!user) {
        this.addUser(userId, guildId, data);
        return;
      }

      await prisma.users.updateMany({
        where: { user_id: userId, guild_id: guildId },
        data,
      });
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async removeUser(userId: string, guildId: string) {
    try {
      await prisma.users.deleteMany({
        where: { user_id: userId, guild_id: guildId },
      });
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async getGuildById(guildId: string | undefined | null) {
    if (!guildId) return null;

    try {
      const guild =
        (await prisma.guilds.findFirst({
          where: { guild_id: guildId },
        })) ?? (await this.addGuild(guildId));

      return guild;
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async addGuild(guildId: string | undefined) {
    if (!guildId) return null;

    try {
      const guild = await prisma.guilds.create({
        data: {
          guild_id: guildId,
        },
      });

      return guild;
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async updateGuildById(guildId: string | undefined, data: Partial<Prisma.guildsUpdateInput>) {
    if (!guildId) return;

    try {
      // check if guild exists
      const guild = await this.getGuildById(guildId);

      if (!guild) {
        await this.addGuild(guildId);
      }

      await prisma.guilds.updateMany({
        where: { guild_id: guildId },
        data,
      });
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async removeGuild(guildId: string): Promise<void> {
    try {
      await prisma.guilds.deleteMany({ where: { guild_id: guildId } });
    } catch (error) {
      this.sendErrorLog(error, "error");
    }
  }

  async sendErrorLog(err: unknown, type: "warning" | "error"): Promise<void> {
    const error = err as DJS.DiscordAPIError | DJS.HTTPError | Error;

    try {
      if (error.message.includes("Missing Access")) return;
      if (error.message.includes("Unknown Message")) return;
      if (error.stack?.includes("DeprecationWarning: Listening to events on the Db class")) {
        return;
      }

      const channelId = process.env["ERRORLOGS_CHANNEL_ID"] as DJS.Snowflake | undefined;
      if (!channelId) {
        return this.bot.logger.error("ERR_LOG", error.stack || `${error}`);
      }

      const channel = (this.bot.channels.cache.get(channelId) ||
        (await this.bot.channels.fetch(channelId))) as DJS.TextChannel;

      if (
        !channel ||
        !channel.permissionsFor(this.bot.user!)?.has(DJS.PermissionFlagsBits.SendMessages)
      ) {
        return this.bot.logger.error("ERR_LOG", error.stack || `${error}`);
      }

      const message = {
        author: this.bot.user,
      };

      const code = "code" in error ? error.code : "N/A";
      const httpStatus = "status" in error ? error.status : "N/A";
      const requestBody = "requestBody" in error ? error.requestBody : { json: {} };

      const name = error.name || "N/A";
      let stack = error.stack || error;
      let jsonString: string | undefined = "";

      try {
        jsonString = JSON.stringify(requestBody.json, null, 2);
      } catch {
        jsonString = "";
      }

      if (jsonString.length >= 2048) {
        jsonString = jsonString ? `${jsonString.slice(0, 2045)}...` : "";
      }

      if (typeof stack === "string" && stack.length >= 2048) {
        console.error(stack);
        stack = "An error occurred but was too long to send to Discord, check your console.";
      }

      const embed = this.baseEmbed(message)

        .addFields(
          { name: "Name", value: name, inline: true },
          {
            name: "Code",
            value: code.toString(),
            inline: true,
          },
          {
            name: "httpStatus",
            value: httpStatus.toString(),
            inline: true,
          },
          { name: "Timestamp", value: this.bot.logger.now, inline: true },
          { name: "Request data", value: codeBlock(jsonString.slice(0, 2045)) },
        )
        .setDescription(codeBlock(stack as string))
        .setColor(type === "error" ? DJS.Colors.Red : DJS.Colors.Orange);

      channel.send({ embeds: [embed] });
    } catch (e) {
      console.error({ error });
      console.error(e);
    }
  }

  async findMember(
    message: Partial<DJS.Message> | DJS.CommandInteraction,
    args: string[],
    options?: { allowAuthor?: boolean; index?: number },
  ): Promise<DJS.GuildMember | undefined | null> {
    if (!message.guild) return;
    const index = options?.index ?? 0;

    try {
      let member: DJS.GuildMember | null | undefined;
      const arg = (args[index]?.replace?.(/[<@!>]/gi, "") || args[index]) as DJS.Snowflake;

      const mention =
        "mentions" in message // check if the first mention is not the bot prefix
          ? message.mentions?.users.first()?.id !== this.bot.user?.id
            ? message.mentions?.users.first()
            : message.mentions?.users.first(1)[1]
          : null;

      member =
        message.guild.members.cache.find((m) => m.user.id === mention?.id) ||
        message.guild.members.cache.get(arg) ||
        message.guild.members.cache.find((m) => m.user.id === args[index]) ||
        (message.guild.members.cache.find((m) => m.user.tag === args[index]) as DJS.GuildMember);

      if (!member && arg) {
        const fetched = await message.guild.members.fetch(arg).catch(() => null);

        if (fetched) {
          member = fetched;
        }
      }

      if (!member && options?.allowAuthor) {
        // @ts-expect-error ignore
        member = new DJS.GuildMember(this.bot, message.member!, message.guild);
      }

      return member;
    } catch (e) {
      const error = e instanceof Error ? e : null;

      if (error?.message.includes("DiscordAPIError: Unknown Member")) return undefined;
      if (error?.message.includes("is not a snowflake.")) return undefined;

      this.sendErrorLog(e, "error");
    }
  }

  async findRole(message: DJS.Message, arg: DJS.Snowflake): Promise<DJS.Role | null> {
    if (!message.guild) return null;
    return (
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(arg) ||
      message.guild.roles.cache.find((r) => r.name === arg) ||
      message.guild.roles.cache.find((r) => r.name.startsWith(arg)) ||
      message.guild.roles.fetch(arg)
    );
  }

  async getGuildLang(
    guildId: string | undefined | null,
  ): Promise<typeof import("@locales/english").default> {
    const guild = await this.getGuildById(guildId);

    return import(`../locales/${guild?.locale ?? "english"}`).then((f) => f.default);
  }

  async createWebhook(channelId: DJS.Snowflake, oldChannelId: string | null) {
    const channel = this.bot.channels.cache.get(channelId);
    if (!channel) return;
    if (!this.bot.user) return;
    if (
      !(channel as DJS.TextChannel)
        .permissionsFor(this.bot.user.id)
        ?.has(DJS.PermissionFlagsBits.ManageWebhooks)
    ) {
      return;
    }

    if (oldChannelId) {
      const webhooks = await (channel as DJS.TextChannel).fetchWebhooks();
      await webhooks.find((w) => w.name === `audit-logs-${oldChannelId}`)?.delete();
    }

    await (channel as DJS.TextChannel).createWebhook({
      name: `audit-logs-${channelId}`,
      avatar: this.bot.user.displayAvatarURL({ extension: "png" }),
    });
  }

  async getWebhook(guild: DJS.Guild): Promise<DJS.Webhook | undefined> {
    if (!guild) return;
    const me = this.getMe(guild);
    if (!me?.permissions.has(DJS.PermissionFlagsBits.ManageWebhooks)) return undefined;

    const webhooks = await guild.fetchWebhooks().catch(() => null);
    if (!webhooks) return undefined;

    const g = await this.getGuildById(guild.id);
    if (!g) return undefined;

    const webhook = webhooks.find((w) => w.name === `audit-logs-${g.audit_channel}`);
    if (!webhook) return undefined;

    return webhook;
  }

  async updateMuteChannelPerms(
    guild: DJS.Guild,
    memberId: DJS.Snowflake,
    perms: Partial<DJS.PermissionOverwriteOptions>,
  ) {
    guild.channels.cache.forEach((channel) => {
      if (channel instanceof DJS.ThreadChannel) return;

      channel.permissionOverwrites
        .create(memberId, perms as DJS.PermissionOverwriteOptions)
        .catch((e) => {
          this.bot.logger.error("updateMuteChannelPerms", e);
        });
    });
  }

  async addSticky(messageId: string, channelId: string, message: string) {
    try {
      await prisma.stickies.create({
        data: {
          message_id: messageId,
          message,
          channel_id: channelId,
        },
      });
    } catch (error) {
      this.bot.logger.error("add_sticky", error);
    }
  }

  async getSticky(channelId: string) {
    try {
      const sticky = await prisma.stickies.findFirst({
        where: { channel_id: channelId },
      });

      return sticky;
    } catch (error) {
      this.bot.logger.error("get_sticky", error);
    }
  }

  async removeSticky(channelId: string) {
    try {
      await prisma.stickies.deleteMany({
        where: { channel_id: channelId },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async handleApiRequest(
    path: string,
    tokenData: { data: string; type: "Bot" | "Bearer" },
    method?: string,
  ) {
    try {
      const bearer =
        tokenData.type === "Bearer"
          ? jwt.verify(tokenData.data, process.env["DASHBOARD_JWT_SECRET"] ?? "")
          : tokenData.data;

      if (!bearer) {
        return { error: "invalid_token" };
      }

      const res = await fetch(`${process.env["DASHBOARD_DISCORD_API_URL"]}${path}`, {
        method,
        headers: {
          Authorization: `${tokenData.type} ${bearer}`,
        },
      });
      return await res.json();
    } catch (e) {
      return { error: "invalid_token" };
    }
  }

  async checkAuth(
    req: ApiRequest,
    admin?: {
      guildId: string;
    },
  ) {
    const token = req.cookies.token || req.headers.auth;
    const data: { error: string } | { id: DJS.Snowflake } = await this.handleApiRequest(
      "/users/@me",
      {
        type: "Bearer",
        data: `${token}`,
      },
    );

    if ("error" in data) {
      return Promise.reject(data.error);
    }

    if (admin?.guildId) {
      const guild = this.bot.guilds.cache.get(admin.guildId as DJS.Snowflake);
      if (!guild) return Promise.reject("Guild was not found");

      const member = await guild.members.fetch(data.id);
      if (!member) return Promise.reject("Not in this guild");

      if (!member.permissions.has(DJS.PermissionFlagsBits.Administrator)) {
        return Promise.reject("Not an administrator for this guild");
      }
    }
    return Promise.resolve("Authorized");
  }

  errorEmbed(
    permissions: bigint[],
    message: DJS.Message | DJS.ChatInputCommandInteraction,
    lang: Record<string, string>,
  ) {
    return this.baseEmbed(message)
      .setTitle("Woah!")
      .setDescription(
        `❌ I need ${permissions
          .map((p) => {
            const perms: string[] = [];
            Object.keys(DJS.PermissionFlagsBits).map((key) => {
              if (DJS.PermissionFlagsBits[key] === p) {
                perms.push(`\`${lang[key]}\``);
              }
            });

            return perms;
          })
          .join(", ")} permissions!`,
      )
      .setColor(DJS.Colors.Orange);
  }

  baseEmbed(
    message:
      | DJS.Message
      | DJS.ChatInputCommandInteraction
      | DJS.SelectMenuInteraction
      | { author: DJS.User | null },
  ) {
    const user = "author" in message ? message.author : message.user;

    const avatar = user?.displayAvatarURL();
    const username = user?.username ?? this.bot.user?.username ?? "Unknown";

    return new DJS.EmbedBuilder()
      .setFooter({ text: username, iconURL: avatar })
      .setColor("#5865f2")
      .setTimestamp();
  }

  parseMessage(
    message: string,
    user: DJS.User,
    msg?: DJS.Message | { guild: DJS.Guild; author: DJS.User },
  ): string {
    return message
      .split(" ")
      .map((word) => {
        const { username, tag, id, discriminator } = user;
        const createdAt = time(new Date(user.createdAt), "f");
        word = word
          .replace("{user}", `<@${id}>`)
          .replace("{user.tag}", this.escapeMarkdown(tag))
          .replace("{user.username}", this.escapeMarkdown(username))
          .replace("{user.discriminator}", discriminator)
          .replace("{user.id}", id)
          .replace("{user.createdAt}", createdAt);

        if (msg) {
          if (!msg.guild) return word;

          word
            .replace("{guild.id}", msg.guild.id)
            .replace("{guild.name}", this.escapeMarkdown(msg.guild.name))
            .replace("{message.author}", `<@${msg.author.id}>`)
            .replace("{message.author.id}", msg.author.id)
            .replace("{message.author.tag}", this.escapeMarkdown(msg.author.tag))
            .replace("{message.author.username}", this.escapeMarkdown(msg.author.username));
        }

        return word;
      })
      .join(" ");
  }

  isBotInSameChannel(message: DJS.Message | DJS.CommandInteraction) {
    // @ts-expect-error ignore
    const member = new DJS.GuildMember(this.bot, message.member!, message.guild!);
    const voiceChannelId = member?.voice.channelId;

    if (!voiceChannelId) return false;
    if (!message.guild?.members.me) return false;

    return message.guild.members.me.voice.channelId === voiceChannelId;
  }

  /**
   * @returns `string` = doesn't have the required permissions, `undefined` = has the required permissions
   */
  formatBotPermissions(
    permissions: bigint[],
    interaction: DJS.ChatInputCommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const neededPerms: bigint[] = [];

    permissions.forEach((perm) => {
      if (
        !(interaction.channel as DJS.TextChannel)
          .permissionsFor(interaction.guild!.members.me!)
          .has(perm)
      ) {
        neededPerms.push(perm);
      }
    });

    if (neededPerms.length > 0) {
      return this.errorEmbed(neededPerms, interaction, lang.PERMISSIONS);
    }
  }

  formatMemberPermissions(
    permissions: bigint[],
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const neededPerms: bigint[] = [];

    permissions.forEach((perm) => {
      if (
        !(interaction.channel as DJS.TextChannel)
          .permissionsFor(interaction.member as any)
          .has(perm)
      ) {
        neededPerms.push(perm);
      }
    });

    if (neededPerms.length > 0) {
      return lang.MESSAGE.NEED_PERMS.replace(
        "{perms}",
        neededPerms
          .map((p) => {
            const perms: string[] = [];
            Object.keys(DJS.PermissionFlagsBits).map((key) => {
              if (DJS.PermissionFlagsBits[key] === p) {
                perms.push(`\`${lang.PERMISSIONS[key]}\``);
              }
            });

            return perms;
          })
          .join(", "),
      );
    }
  }

  translate<Str extends string, Values extends Record<string, string | number>>(
    string: Str,
    values: Values,
  ): string {
    const regex = /\{[a-z0-9_-]\w+\}/gi;
    const keys = string.match(regex) ?? [];

    keys.forEach((key) => {
      const parsedKey = key.replace("{", "").replace("}", "");
      const value = values[parsedKey];
      string = string.replaceAll(key, String(value)) as Str;
    });

    return string;
  }

  hasSendPermissions(resolveable: DJS.Message | DJS.GuildTextBasedChannel) {
    const ch = "channel" in resolveable ? resolveable.channel : resolveable;
    if (!("permissionsFor" in ch)) return false;
    if (ch instanceof DJS.ThreadChannel || ch instanceof DJS.DMChannel) {
      return true;
    }

    return ch.permissionsFor(this.bot.user!)?.has(DJS.PermissionFlagsBits.SendMessages);
  }

  escapeMarkdown(message: string): string {
    return DJS.escapeMarkdown(message, {
      codeBlock: true,
      spoiler: true,
      inlineCode: true,
      inlineCodeContent: true,
      codeBlockContent: true,
    });
  }

  codeContent(string: string, extension = ""): string {
    return `\`\`\`${extension}\n${string}\`\`\``;
  }

  calculateXp(xp: number): number {
    return Math.floor(0.1 * Math.sqrt(xp));
  }

  formatNumber(n: number | string): string {
    return Number.parseFloat(String(n)).toLocaleString("be-BE");
  }

  encode(obj: Record<string, unknown>) {
    let string = "";

    for (const [key, value] of Object.entries(obj)) {
      if (!value) continue;
      string += `&${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`;
    }

    return string.substring(1);
  }
}
