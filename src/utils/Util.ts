import * as DJS from "discord.js";
import dayJs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import jwt from "jsonwebtoken";
import Bot from "structures/Bot";
import UserModel, { IUser, UserData } from "models/User.model";
import WarningModal, { IWarning } from "models/Warning.model";
import GuildModel, { GuildData, IGuild } from "models/Guild.model";
import ApiRequest from "types/ApiRequest";
import StickyModel, { Sticky } from "models/Sticky.model";

dayJs.extend(utc);
dayJs.extend(timezone);

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

  async getGuildById(guildId: string | undefined): Promise<IGuild | undefined> {
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
    /* eslint-disable-next-line */
    if (error.stack?.includes('type: Value "voice" is not int.')) return;
    if (error.stack?.includes("DeprecationWarning: Listening to events on the Db class")) return;

    const channelId = process.env["ERRORLOGS_CHANNEL_ID"];
    const channel = (this.bot.channels.cache.get(channelId ?? "") ||
      (await this.bot.channels.fetch(channelId ?? ""))) as DJS.TextChannel;

    if (
      (process.env.NODE_ENV !== "production" && !channel) ||
      !channelId ||
      !channel.permissionsFor(this.bot.user!)?.has("SEND_MESSAGES")
    ) {
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
    message: Partial<DJS.Message>,
    args: string[],
    options?: { allowAuthor?: boolean; index?: number },
  ): Promise<DJS.GuildMember | undefined | null> {
    if (!message.guild) return;

    try {
      let member: DJS.GuildMember | null | undefined;
      const arg = args[options?.index ?? 0]?.replace?.(/[<@!>]/gi, "") || args[options?.index ?? 0];

      const mention = // check if the first mention is not the bot prefix
        message.mentions?.users.first()?.id !== this.bot.user?.id
          ? message.mentions?.users.first()
          : message.mentions?.users.array()[1];

      member =
        message.guild.members.cache.find((m) => m.user.id === mention?.id) ||
        message.guild.members.cache.get(arg) ||
        message.guild.members.cache.find((m) => m.user.id === args[options?.index ?? 0]) ||
        (message.guild.members.cache.find(
          (m) => m.user.tag === args[options?.index ?? 0],
        ) as DJS.GuildMember);

      if (!member) {
        member = await message.guild.members.fetch(arg)[0];
      }

      if (!member && options?.allowAuthor) {
        member = message.member;
      }

      return member;
    } catch (e) {
      if (e?.includes?.("DiscordAPIError: Unknown Member")) {
        return undefined;
      } else {
        this.sendErrorLog(e, "error");
      }
    }
  }

  async findRole(message: DJS.Message, arg: string): Promise<DJS.Role | null> {
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
    guildId: string | undefined,
  ): Promise<typeof import("../locales/english").default> {
    const guild = await this.getGuildById(guildId);

    return import(`../locales/${guild?.locale}`).then((f) => f.default);
  }

  async createWebhook(channelId: string, oldChannelId?: string) {
    const channel = this.bot.channels.cache.get(channelId);
    if (!channel) return;
    if (!this.bot.user) return;
    if (!(channel as DJS.TextChannel).permissionsFor(this.bot.user?.id)?.has("MANAGE_WEBHOOKS")) {
      return;
    }

    if (oldChannelId) {
      const webhooks = await (channel as DJS.TextChannel).fetchWebhooks();
      webhooks.find((w) => w.name === `audit-logs-${oldChannelId}`)?.delete();
    }

    await (channel as DJS.TextChannel).createWebhook(`audit-logs-${channelId}`, {
      avatar: this.bot.user.displayAvatarURL({ format: "png" }),
    });
  }

  async getWebhook(guild: DJS.Guild): Promise<DJS.Webhook | undefined> {
    if (!guild) return;
    if (!guild.me) return;
    if (!guild.me.permissions.has("MANAGE_WEBHOOKS")) return undefined;

    const w = await guild.fetchWebhooks();
    const g = await this.getGuildById(guild.id);
    if (!g) return undefined;
    const webhook = w.find((w) => w.name === `audit-logs-${g?.audit_channel}`);
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
        color: "GRAY",
        reason: "Mute a user",
      })
    );
  }

  async createStarboard(
    channel: { id: string | undefined; guild: { id: string | undefined } },
    options,
    old: { channelID: string | undefined; emoji: string | undefined },
  ) {
    if (old) {
      old.channelID && old.emoji && this.bot.starboardsManager.delete(old.channelID, old.emoji);
    }

    this.bot.starboardsManager.create(channel as unknown as DJS.Channel, {
      ...options,
      selfStar: true,
      starEmbed: true,
      attachments: true,
      resolveImageUrl: true,
    });
  }

  async formatDate(date: string | Date | number | null, guildId: string | undefined) {
    const tz = await (await this.getGuildById(guildId))?.timezone;
    const m = dayJs.tz(`${date}`, tz || "America/New_York").format("MM/DD/YYYY, h:mm:ss a");

    return {
      date: m,
      tz: tz,
    };
  }

  async updateMuteChannelPerms(
    guild: DJS.Guild,
    memberId: DJS.Snowflake,
    perms: Partial<DJS.PermissionObject>,
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
    const data: { error: string } | { id: string } = await this.handleApiRequest("/users/@me", {
      type: "Bearer",
      data: `${token}`,
    });

    if ("error" in data) {
      return Promise.reject(data.error);
    } else {
      if (admin?.guildId) {
        const guild = this.bot.guilds.cache.get(admin.guildId);
        if (!guild) return Promise.reject("Guild was not found");

        const member = await guild.members.fetch(data.id);
        if (!member) return Promise.reject("Not in this guild");

        if (!member.permissions.has("ADMINISTRATOR")) {
          return Promise.reject("Not an administrator for this guild");
        }
      }
      return Promise.resolve("Authorized");
    }
  }

  errorEmbed(permissions: bigint[], message: DJS.Message, lang: Record<string, string>) {
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

  baseEmbed(message: DJS.Message | { author: DJS.User | null }): DJS.MessageEmbed {
    const avatar = message.author?.displayAvatarURL({ dynamic: true });

    return new DJS.MessageEmbed()
      .setFooter(message.author?.username, avatar)
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

  resolveCommand(nameOrAlias: string) {
    return (
      this.bot.commands.get(nameOrAlias) ??
      this.bot.commands.get(this.bot.aliases.get(nameOrAlias)!)
    );
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

  calculateXp(xp: number): number {
    return Math.floor(0.1 * Math.sqrt(xp));
  }

  formatNumber(n: number | string): string {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  encode(obj: { [key: string]: unknown }) {
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
