import * as DJS from "discord.js";
import { codeBlock, time } from "@discordjs/builders";
import jwt from "jsonwebtoken";
import { Bot } from "structures/Bot";
import UserModel, { IUser, UserData } from "models/User.model";
import WarningModal, { IWarning } from "models/Warning.model";
import GuildModel, { GuildData, IGuild } from "models/Guild.model";
import { ApiRequest } from "types/ApiRequest";
import StickyModel, { Sticky } from "models/Sticky.model";

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
        if (option.type === "SUB_COMMAND") {
          count += 1;
        }
      });
    });

    return count;
  }

  async getUserById(userId: string, guildId: string | undefined): Promise<IUser | undefined> {
    try {
      let user: IUser | undefined = await UserModel.findOne({ user_id: userId, guild_id: guildId });

      if (!user) {
        user = await this.addUser(userId, guildId);
      }

      return user;
    } catch (e) {
      this.bot.logger.error("GET_USER_BY_ID", e?.stack || e);
    }
  }

  async getUserWarnings(userId: string, guildId: string | undefined): Promise<IWarning[]> {
    return WarningModal.find({ user_id: userId, guild_id: guildId });
  }

  async addWarning(userId: string, guildId: string | undefined, reason: string) {
    try {
      const warning = new WarningModal({ guild_id: guildId, user_id: userId, reason });

      await warning.save();
    } catch (e) {
      this.bot.logger.error("ADD_WARNING", e?.stack || e);
    }
  }

  async removeUserWarnings(userId: string, guildId: string | undefined) {
    try {
      await WarningModal.deleteMany({ user_id: userId, guild_id: guildId });
    } catch (e) {
      this.bot.logger.error("REMOVE_USER_WARNINGS", e?.stack || e);
    }
  }

  async addUser(
    userId: string,
    guildId: string | undefined,
    data?: Partial<UserData>,
  ): Promise<IUser | undefined> {
    try {
      const user: IUser = new UserModel({ user_id: userId, guild_id: guildId, ...data });

      await user.save();

      return user;
    } catch (e) {
      this.bot.logger.error("ADD_USER", e?.stack || e);
    }
  }

  async updateUserById(
    userId: string,
    guildId: string | undefined,
    data: Partial<UserData>,
  ): Promise<void> {
    try {
      const user = await this.getUserById(userId, guildId);

      if (!user) {
        this.addUser(userId, guildId, data);
        return;
      }

      await UserModel.findOneAndUpdate({ user_id: userId, guild_id: guildId }, data);
    } catch (e) {
      console.error(e);
    }
  }

  async removeUser(userId: string, guildId: string): Promise<void> {
    try {
      await UserModel.findOneAndDelete({ user_id: userId, guild_id: guildId });
    } catch (e) {
      this.bot.logger.error("REMOVE_USER", e?.stack || e);
    }
  }

  async getGuildById(guildId: string | undefined | null): Promise<IGuild | undefined> {
    try {
      let guild = await GuildModel.findOne({ guild_id: guildId });

      if (!guild && guildId) {
        guild = await this.addGuild(guildId);
      }

      return guild;
    } catch (e) {
      this.bot.logger.error("GET_GUILD_BY_ID", e.stack || e);
    }
  }

  async addGuild(guildId: string | undefined): Promise<IGuild | undefined> {
    try {
      const guild: IGuild = new GuildModel({ guild_id: guildId });

      await guild.save();

      return guild;
    } catch (e) {
      this.bot.logger.error("ADD_GUILD", e?.stack || e);
    }
  }

  async updateGuildById(guildId: string | undefined, data: Partial<GuildData>) {
    try {
      // check if guild exists
      const guild = await this.getGuildById(guildId);

      if (!guild) {
        await this.addGuild(guildId);
      }

      await GuildModel.findOneAndUpdate({ guild_id: guildId }, data);
    } catch (e) {
      console.error(e);
    }
  }

  async removeGuild(guildId: string): Promise<void> {
    try {
      await GuildModel.findOneAndDelete({ guild_id: guildId });
    } catch (e) {
      this.bot.logger.error("REMOVE_GUILD", e?.stack || e);
    }
  }

  async sendErrorLog(err: unknown, type: "warning" | "error"): Promise<void> {
    const error = err as DJS.DiscordAPIError | DJS.HTTPError | Error;

    try {
      if (error.message.includes("Missing Access")) return;
      if (error.stack?.includes?.("DeprecationWarning: Listening to events on the Db class")) {
        return;
      }

      const channelId = process.env["ERRORLOGS_CHANNEL_ID"] as DJS.Snowflake | undefined;
      if (!channelId) {
        return this.bot.logger.error("ERR_LOG", error?.stack || `${error}`);
      }

      const channel = (this.bot.channels.cache.get(channelId) ||
        (await this.bot.channels.fetch(channelId))) as DJS.TextChannel;

      if (
        !channel ||
        !channel.permissionsFor(this.bot.user!)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)
      ) {
        return this.bot.logger.error("ERR_LOG", error?.stack || `${error}`);
      }

      const message = {
        author: this.bot.user,
      };

      const code = "code" in error ? error.code : "N/A";
      const httpStatus = "httpStatus" in error ? error.httpStatus : "N/A";
      const requestData: any = "requestData" in error ? error.requestData : { json: {} };

      const name = error.name || "N/A";
      let stack = error.stack || error;
      let jsonString: string | undefined = "";

      try {
        jsonString = JSON.stringify(requestData.json, null, 2);
      } catch {
        jsonString = "";
      }

      if (jsonString?.length >= 2048) {
        jsonString = jsonString ? `${jsonString?.substr(0, 2045)}...` : "";
      }

      if (typeof stack === "string" && stack.length >= 2048) {
        console.error(stack);
        stack = "An error occurred but was too long to send to Discord, check your console.";
      }

      const embed = this.baseEmbed(message)
        .addField("Name", name, true)
        .addField("Code", code.toString(), true)
        .addField("httpStatus", httpStatus.toString(), true)
        .addField("Timestamp", this.bot.logger.now, true)
        .addField("Request data", codeBlock(jsonString?.substr(0, 2045)))
        .setDescription(codeBlock(stack as string))
        .setColor(type === "error" ? "RED" : "ORANGE");

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
          // eslint-disable-next-line
          member = fetched;
        }
      }

      if (!member && options?.allowAuthor) {
        member = new DJS.GuildMember(this.bot, message.member!, message.guild);
      }

      return member;
    } catch (e) {
      if (e?.includes?.("DiscordAPIError: Unknown Member")) return undefined;
      if (e?.includes?.("is not a snowflake.")) return undefined;

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

  async createWebhook(channelId: DJS.Snowflake, oldChannelId?: string) {
    const channel = this.bot.channels.cache.get(channelId);
    if (!channel) return;
    if (!this.bot.user) return;
    if (
      !(channel as DJS.TextChannel)
        .permissionsFor(this.bot.user?.id)
        ?.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)
    ) {
      return;
    }

    if (oldChannelId) {
      const webhooks = await (channel as DJS.TextChannel).fetchWebhooks();
      await webhooks.find((w) => w.name === `audit-logs-${oldChannelId}`)?.delete();
    }

    await (channel as DJS.TextChannel).createWebhook(`audit-logs-${channelId}`, {
      avatar: this.bot.user.displayAvatarURL({ format: "png" }),
    });
  }

  async getWebhook(guild: DJS.Guild): Promise<DJS.Webhook | undefined> {
    if (!guild) return;
    if (!guild.me) return;
    if (!guild.me.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return undefined;

    const webhooks = await guild.fetchWebhooks().catch(() => null);
    if (!webhooks) return undefined;

    const g = await this.getGuildById(guild.id);
    if (!g) return undefined;

    const webhook = webhooks.find((w) => w.name === `audit-logs-${g?.audit_channel}`);
    if (!webhook) return undefined;

    return webhook;
  }

  async findOrCreateMutedRole(guild: DJS.Guild): Promise<DJS.Role | undefined> {
    const dbGuild = await this.getGuildById(guild.id);

    return (
      guild.roles.cache.find((r) => r.id === dbGuild?.muted_role_id) ||
      guild.roles.cache.find((r) => r.name === "muted") ||
      guild.roles.create({
        name: "muted",
        color: "GREY",
        reason: "Mute a user",
      })
    );
  }

  /**
   * @deprecated will be removed when message intents arrive
   */
  async createStarboard(
    channel: { id: string | undefined; guild: { id: string | undefined } },
    options,
    old: { channelId: DJS.Snowflake | undefined; emoji: string | undefined },
  ) {
    if (old) {
      old.channelId && old.emoji && this.bot.starboardsManager.delete(old.channelId, old.emoji);
    }

    this.bot.starboardsManager.create(channel as any, {
      ...options,
      selfStar: true,
      starEmbed: true,
      attachments: true,
      resolveImageUrl: true,
    });
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
      const sticky = new StickyModel({
        message_id: messageId,
        message,
        channel_id: channelId,
      });

      await sticky.save();
    } catch (e) {
      this.bot.logger.error("add_sticky", e?.stack || e);
    }
  }

  async getSticky(channelId: string): Promise<Sticky | undefined> {
    try {
      const sticky = await StickyModel.findOne({ channel_id: channelId });

      return sticky;
    } catch (e) {
      this.bot.logger.error("get_sticky", e?.stack || e);
    }
  }

  async removeSticky(channelId: string) {
    try {
      await StickyModel.deleteMany({ channel_id: channelId });
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

      if (!member.permissions.has("ADMINISTRATOR")) {
        return Promise.reject("Not an administrator for this guild");
      }
    }
    return Promise.resolve("Authorized");
  }

  errorEmbed(
    permissions: bigint[],
    message: DJS.Message | DJS.CommandInteraction,
    lang: Record<string, string>,
  ) {
    return this.baseEmbed(message)
      .setTitle("Woah!")
      .setDescription(
        `❌ I need ${permissions
          .map((p) => {
            const perms: string[] = [];
            Object.keys(DJS.Permissions.FLAGS).map((key) => {
              if (DJS.Permissions.FLAGS[key] === p) {
                perms.push(`\`${lang?.[key]}\``);
              }
            });

            return perms;
          })
          .join(", ")} permissions!`,
      )
      .setColor("ORANGE");
  }

  baseEmbed(
    message: DJS.Message | DJS.Interaction | { author: DJS.User | null },
  ): DJS.MessageEmbed {
    const user = "author" in message ? message.author : message.user;

    const avatar = user?.displayAvatarURL({ dynamic: true });
    const username = user?.username ?? this.bot.user?.username ?? "Unknown";

    return new DJS.MessageEmbed().setFooter(username, avatar).setColor("#5865f2").setTimestamp();
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
    const member = new DJS.GuildMember(this.bot, message.member!, message.guild!);
    const voiceChannelId = member?.voice.channelId;

    if (!voiceChannelId) return false;
    if (!message.guild?.me) return false;

    return message.guild.me.voice.channelId === voiceChannelId;
  }

  formatBotPermissions(
    permissions: bigint[],
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const neededPerms: bigint[] = [];

    permissions.forEach((perm) => {
      if (
        !(interaction.channel as DJS.TextChannel).permissionsFor(interaction.guild!.me!)?.has(perm)
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
          ?.has(perm)
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
            Object.keys(DJS.Permissions.FLAGS).map((key) => {
              if (DJS.Permissions.FLAGS[key] === p) {
                perms.push(`\`${lang.PERMISSIONS[key]}\``);
              }
            });

            return perms;
          })
          .join(", "),
      );
    }
  }

  hasSendPermissions(resolveable: DJS.Message | DJS.TextChannel) {
    const ch = "channel" in resolveable ? resolveable.channel : resolveable;
    if (!("permissionsFor" in ch)) return false;
    if (ch instanceof DJS.ThreadChannel || ch instanceof DJS.DMChannel) {
      return true;
    }

    return ch.permissionsFor(this.bot.user!)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES);
  }

  escapeMarkdown(message: string): string {
    return DJS.Util.escapeMarkdown(message, {
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

  encode(obj: { [key: string]: unknown }) {
    let string = "";

    for (const [key, value] of Object.entries(obj)) {
      if (!value) continue;
      string += `&${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`;
    }

    return string.substring(1);
  }
}
