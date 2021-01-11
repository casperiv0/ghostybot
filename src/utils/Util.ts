import {
  ClientUser,
  GuildMember,
  Message,
  MessageEmbed,
  TextChannel,
  UserResolvable,
} from "discord.js";
import Bot from "../structures/Bot";
import User, { IUser, UserUpdateData } from "../models/User.model";
import GuildModel, { GuildData, IGuild } from "../models/Guild.model";

export default class Util {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async getUserById(userId: string, guildId: string | undefined): Promise<IUser | undefined> {
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

  async addUser(
    userId: string,
    guildId: string | undefined,
    data?: UserUpdateData
  ): Promise<IUser | undefined> {
    try {
      const user: IUser = new User({ user_id: userId, guild_id: guildId, ...data });

      await user.save();

      return user;
    } catch (e) {
      this.bot.logger.error("ADD_USER", e);
    }
  }

  async updateUserById(userId: string, guildId: string, data: UserUpdateData): Promise<void> {
    try {
      const user = await this.getUserById(userId, guildId);

      if (!user) {
        this.addUser(userId, guildId, data);
        return;
      }

      await User.findOneAndUpdate({ user_id: userId, guild_id: guildId }, data);
    } catch (e) {
      console.error(e);
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
      this.bot.logger.error("ADD_GUILD", e.stack || e);
    }
  }

  async sendErrorLog(error: any, type: "warning" | "error"): Promise<void> {
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
  ): Promise<GuildMember | undefined | null> {
    let member;
    if (!message.guild) return;
    const mention = // Check if the first mention is not the bot prefix
      message.mentions.users.first()?.id !== this.bot.user?.id
        ? message.mentions.users.first()
        : message.mentions.users.array()[1];

    member = message?.guild?.member(
      mention ||
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

  async getGuildLang(guildId: string | undefined): Promise<any> {
    try {
      const guild = await this.getGuildById(guildId);

      return require(`../locales/${guild?.locale || "english"}`);
    } catch (e) {
      console.error(e);
    }
  }

  baseEmbed(message: Message | { author: ClientUser | null }): MessageEmbed {
    const avatar = message.author?.displayAvatarURL({ dynamic: true });

    return new MessageEmbed()
      .setFooter(message.author?.username, avatar)
      .setColor("#7289DA")
      .setTimestamp();
  }

  calculateXp(xp: number): number {
    return Math.floor(0.1 * Math.sqrt(xp));
  }

  formatNumber(n: number | string): string {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
