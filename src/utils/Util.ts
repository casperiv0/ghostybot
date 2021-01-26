import {
  Guild,
  GuildMember,
  Message,
  MessageEmbed,
  TextChannel,
  User as DiscordUser,
  Webhook,
  Util as DiscordUtil,
  Role,
  Snowflake,
  PermissionObject,
} from "discord.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import Bot from "../structures/Bot";
import UserModel, { IUser, UserData } from "../models/User.model";
import WarningModal, { IWarning } from "../models/Warning.model";
import GuildModel, { GuildData, IGuild } from "../models/Guild.model";
import ApiRequest from "../interfaces/ApiRequest";
import StickyModel, { Sticky } from "../models/Sticky.model";

export interface ErrorLog {
  name?: string;
  stack?: string;
  code?: string | number;
  httpStatus?: string | number;
}

export default class Util {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
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
    data?: Partial<UserData>
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
    data: Partial<UserData>
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

  async getGuildById(guildId: string | undefined): Promise<GuildData | undefined> {
    try {
      let guild = await GuildModel.findOne({ guild_id: guildId });

      if (!guild) {
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

  async sendErrorLog(error: ErrorLog, type: "warning" | "error"): Promise<void> {
    const channelId = this.bot.config.errorLogsChannelId;
    const channel = (this.bot.channels.cache.get(channelId) ||
      (await this.bot.channels.fetch(channelId))) as TextChannel;

    if (!channel || !channelId || !channel.permissionsFor(this.bot.user!)?.has("SEND_MESSAGES")) {
      return this.bot.logger.error("UNHANDLED ERROR", error?.stack || `${error}`);
    }

    const message = {
      author: this.bot.user,
    };

    const name = error.name || "N/A";
    const code = error.code || "N/A";
    const httpStatus = error.httpStatus || "N/A";
    let stack = error.stack || error;

    if (typeof stack === "string" && stack.length >= 2048) {
      console.error(stack);
      stack = "An error occurred but was too long to send to Discord, check your console.";
    }

    const embed = this.baseEmbed(message)
      .setTitle("An error occurred")
      .addField("Name", name, true)
      .addField("Code", code, true)
      .addField("httpStatus", httpStatus, true)
      .addField("Timestamp", this.bot.logger.now, true)
      .setDescription(`\`\`\`${stack}\`\`\` `)
      .setColor(type === "error" ? "RED" : "ORANGE");

    channel.send(embed);
  }

  async findMember(
    message: Partial<Message>,
    args: string[],
    allowAuthor?: boolean
  ): Promise<GuildMember | undefined | null> {
    if (!message.guild) return;
    try {
      let member: GuildMember | null | undefined;
      const mention = // Check if the first mention is not the bot prefix
        message.mentions?.users.first()?.id !== this.bot.user?.id
          ? message.mentions?.users.first()
          : message.mentions?.users.array()[1];

      member =
        message.guild.members.cache.find((m) => m.user.id === mention?.id) ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((m) => m.user.id === args[0]) ||
        (message.guild.members.cache.find((m) => m.user.tag === args[0]) as GuildMember);

      if (!member) {
        member = await message.guild.members.fetch(args[0])[0];
      }

      if (!member && allowAuthor) {
        member = message.member;
      }

      return member;
    } catch (e) {
      if (e.includes("DiscordAPIError: Unknown Member")) {
        return undefined;
      } else {
        this.sendErrorLog(e, "error");
      }
    }
  }

  async findRole(message: Message, arg: string): Promise<Role | null> {
    if (!message.guild) return null;
    return (
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(arg) ||
      message.guild.roles.cache.find((r) => r.name === arg) ||
      message.guild.roles.cache.find((r) => r.name.startsWith(arg)) ||
      (await message.guild.roles.fetch(arg))
    );
  }

  async getGuildLang(
    guildId: string | undefined
  ): Promise<typeof import("../locales/english").default> {
    const guild = await this.getGuildById(guildId);

    return import(`../locales/${guild?.locale}`).then((f) => f.default);
  }

  async createWebhook(channelId: string, oldChannelId?: string) {
    const channel = this.bot.channels.cache.get(channelId);
    if (!channel) return;
    if (!this.bot.user) return;
    if (!(channel as TextChannel).permissionsFor(this.bot.user?.id)?.has("MANAGE_WEBHOOKS")) return;

    if (oldChannelId) {
      const webhooks = await (channel as TextChannel).fetchWebhooks();
      webhooks.find((w) => w.name === `audit-logs-${oldChannelId}`)?.delete();
    }

    await (channel as TextChannel).createWebhook(`audit-logs-${channelId}`, {
      avatar: this.bot.user.displayAvatarURL({ format: "png" }),
    });
  }

  async getWebhook(guild: Guild): Promise<Webhook | undefined> {
    if (!guild.me) return;
    if (!guild.me?.hasPermission(["MANAGE_WEBHOOKS"])) return;

    const w = await guild.fetchWebhooks();
    const g = await this.getGuildById(guild.id);
    if (!g) return;
    const webhook = w.find((w) => w.name === `audit-logs-${g?.audit_channel}`);
    if (!webhook) return;

    return webhook;
  }

  async findOrCreateMutedRole(guild: Guild): Promise<Role | undefined> {
    const dbGuild = await this.getGuildById(guild.id);

    return (
      guild.roles.cache.find((r) => r.id === dbGuild?.muted_role_id) ||
      guild.roles.cache.find((r) => r.name === "muted") ||
      (await guild.roles.create({
        data: {
          name: "muted",
          color: "GRAY",
        },
        reason: "Mute a user",
      }))
    );
  }

  async createStarboard(
    channel: { id: string | undefined; guild: { id: string | undefined } },
    options,
    old: { channelID: string | undefined; emoji: string | undefined }
  ) {
    if (old) {
      old.channelID &&
        old.emoji &&
        (this.bot.starboardsManager as any).delete(old.channelID, old.emoji);
    }

    (this.bot.starboardsManager as any).create(channel as any, {
      ...options,
      selfStar: true,
      starEmbed: true,
      attachments: true,
      resolveImageUrl: true,
    });
  }

  async formatDate(date: string | Date | number | null, guildId: string | undefined) {
    const tz = await (await this.getGuildById(guildId))?.timezone;
    const m = moment(date);

    return {
      date: (m as any).tz(tz || "America/New_York").format("MM/DD/YYYY, h:mm:ss a"),
      tz: tz,
    };
  }

  async updateMuteChannelPerms(
    guild: Guild,
    memberId: Snowflake,
    perms: Partial<PermissionObject>
  ) {
    guild.channels.cache.forEach((channel) => {
      channel.updateOverwrite(memberId, perms).catch((e) => {
        this.bot.logger.error("mute_user", e);
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
      await StickyModel.findOneAndDelete({ channel_id: channelId });
    } catch (e) {
      console.error(e);
    }
  }

  async handleApiRequest(
    path: string,
    tokenData: { data: string; type: "Bot" | "Bearer" },
    method?: string
  ) {
    try {
      const bearer =
        tokenData.type === "Bearer"
          ? jwt.verify(tokenData.data, this.bot.config.dashboard.jwtSecret)
          : tokenData.data;

      if (!bearer) {
        return { error: "invalid_token" };
      }

      const res = await fetch(`${this.bot.config.dashboard.discordApiUrl}${path}`, {
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

  async checkAuth(req: ApiRequest) {
    const token = req.cookies.token || req.headers.auth;
    const data = await this.handleApiRequest("/users/@me", {
      type: "Bearer",
      data: `${token}`,
    });

    if (data.error) {
      return Promise.reject(data.error);
    } else {
      return Promise.resolve("Authorized");
    }
  }

  errorEmbed(permissions: string[], message: Message) {
    return this.baseEmbed(message)
      .setTitle("Woah!")
      .setDescription(`❌ I need ${permissions.map((p) => `\`${p}\``).join(", ")} permissions!`)
      .setColor("ORANGE");
  }

  baseEmbed(message: Message | { author: DiscordUser | null }): MessageEmbed {
    const avatar = message.author?.displayAvatarURL({ dynamic: true });

    return new MessageEmbed()
      .setFooter(message.author?.username, avatar)
      .setColor("#7289DA")
      .setTimestamp();
  }

  parseMessage(
    message: string,
    user: DiscordUser,
    msg?: Message | { guild: Guild; author: DiscordUser }
  ): string {
    return message
      .split(" ")
      .map((word) => {
        const { username, tag, id, discriminator, createdAt } = user;
        word = word
          .replace("{user}", `<@${id}>`)
          .replace("{user.tag}", this.escapeMarkdown(tag))
          .replace("{user.username}", this.escapeMarkdown(username))
          .replace("{user.discriminator}", discriminator)
          .replace("{user.id}", id)
          .replace("{user.createdAt}", new Date(createdAt).toLocaleString());

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

  escapeMarkdown(message: string): string {
    return DiscordUtil.escapeMarkdown(message, {
      codeBlock: true,
      spoiler: true,
      inlineCode: true,
      inlineCodeContent: true,
      codeBlockContent: true,
    });
  }

  calculateXp(xp: number): number {
    return Math.floor(0.1 * Math.sqrt(xp));
  }

  formatNumber(n: number | string): string {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  encode(obj) {
    let string = "";

    for (const [key, value] of Object.entries(obj)) {
      if (!value) continue;
      string += `&${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`;
    }

    return string.substring(1);
  }

  toCapitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
