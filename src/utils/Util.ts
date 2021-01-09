import { ObjectId } from "mongoose";
import {
  ClientUser,
  GuildMember,
  Message,
  MessageEmbed,
  TextChannel,
  User as DiscordUser,
  UserResolvable,
} from "discord.js";
import Bot from "../structures/Bot";
import User, { IUser } from "../models/User.model";
import GuildModel, { GuildData, IGuild } from "../models/Guild.model";

export interface UserData {
  _id: ObjectId;
  user_id: string;
  guild_id: string;
  inventory: any[];
  money: number;
  bank: number;
  daily: number;
  weekly: number;
  work: number;
  xp: number;
  afk: AfkObj;
  mute: Mute;
  reminder: Reminders;
}

export interface AfkObj {
  is_afk: boolean;
  reason: string | null;
}

export interface Mute {
  muted: boolean;
  ends_at: number;
  reason: string;
}

export interface Reminders {
  hasReminder: boolean;
  reminders: Reminder[];
}

export interface Reminder {
  _id: string;
  channel_id: string;
  msg: string;
  time: string;
  ends_at: number;
}

export default class Util {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async getUserById(userId: string, guildId: string): Promise<IUser | undefined> {
    try {
      let user: IUser | undefined = await User.findOne({ user_id: userId, guild_id: guildId });

      if (!user) {
        user = await this.addUser(userId, guildId);
      }

      return user;
    } catch (e) {
      this.bot.logger.error("GET_USER_BY_ID", e);
    }
  }

  async addUser(userId: string, guildId: string): Promise<IUser | undefined> {
    try {
      const user: IUser = new User({ user_id: userId, guild_id: guildId });

      await user.save();

      return user;
    } catch (e) {
      this.bot.logger.error("ADD_USER", e);
    }
  }

  async updateUserById(userId: string, guildId: string, data: UserData) {
    try {
      if (typeof data !== "object") {
        throw Error("'data' must be an object");
      }

      const user = await this.getUserById(userId, guildId);
      if (!user) return;

      User.findByIdAndUpdate({ user_id: userId, guild_id: guildId }, data);
    } catch (e) {
      console.error(e);
    }
  }

  async getGuildById(guildId: string): Promise<GuildData | undefined> {
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

  async addGuild(guildId: string): Promise<IGuild | undefined> {
    try {
      const guild: IGuild = new GuildModel({ guild_id: guildId });

      await guild.save();

      return guild;
    } catch (e) {
      this.bot.logger.error("ADD_GUILD", e.stack || e);
    }
  }

  async sendErrorLog(error: any, type: "warning" | "error") {
    const channelId = this.bot.config.errorLogsChannelId;
    const channel = (this.bot.channels.cache.get(channelId) ||
      (await this.bot.channels.fetch(channelId))) as TextChannel;

    if (!channel || !channelId) {
      return this.bot.logger.error("UNHANDLED ERROR", error?.stack || error);
    }

    const message = {
      author: this.bot.user,
    };

    const name = error.name || "N/A";
    const code = error.code || "N/A";
    const httpStatus = error.httpStatus || "N/A";
    let stack = error.stack || error;

    if (stack.length >= 2048) {
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
    message: Message,
    args: string[],
    allowAuthor: boolean
  ): Promise<DiscordUser | GuildMember | undefined | null> {
    let member;
    if (!message.guild) return;

    member = message?.guild?.member(
      message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((m) => m.user.id === args[0]) ||
        (message.guild.members.cache.find((m) => m.user.tag === args[0]) as UserResolvable)
    );

    if (!member) {
      member = message.guild.member(
        (await message.guild.members.fetch(args[0]).catch(() => (member = null))) as UserResolvable
      );
    }

    if (!member && allowAuthor) {
      member = message.member;
    }

    return member;
  }

  baseEmbed(message: Message | { author: ClientUser | null }) {
    const avatar = message.author?.displayAvatarURL({ dynamic: true });

    return new MessageEmbed()
      .setFooter(message.author?.username, avatar)
      .setColor("#7289DA")
      .setTimestamp();
  }

  formatNumber(n: number | string): string {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
