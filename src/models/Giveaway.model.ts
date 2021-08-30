import { GiveawaysMessages, LastChanceOptions, PauseOptions } from "discord-giveaways";
import * as Mongoose from "mongoose";

export interface IGiveaway extends Mongoose.Document {
  messageID: string;
  channelID: string;
  guildID: string;
  startAt: number;
  endAt: number;
  ended: boolean;
  winnerCount: number;
  prize: string;
  messages: GiveawaysMessages;
  hostedBy: string;
  pauseOptions: PauseOptions;
  lastChance: LastChanceOptions;
}

const GiveawaySchema = new Mongoose.Schema({
  messageId: String,
  channelId: String,
  guildId: String,
  startAt: Number,
  endAt: Number,
  ended: Boolean,
  winnerCount: Number,
  prize: String,
  messages: {
    giveaway: String,
    giveawayEnded: String,
    inviteToParticipate: String,
    drawing: String,
    dropMessage: String,
    winMessage: Mongoose.Schema.Types.Mixed,
    embedFooter: Mongoose.Schema.Types.Mixed,
    noWinner: String,
    winners: String,
    endedAt: String,
    hostedBy: String,
  },
  thumbnail: String,
  hostedBy: String,
  winnerIds: [String],
  reaction: Mongoose.Schema.Types.Mixed,
  botsCanWin: Boolean,
  embedColor: Mongoose.Schema.Types.Mixed,
  embedColorEnd: Mongoose.Schema.Types.Mixed,
  exemptPermissions: [],
  exemptMembers: String,
  bonusEntries: String,
  extraData: Mongoose.Schema.Types.Mixed,
  lastChance: {
    enabled: Boolean,
    content: String,
    threshold: Number,
    embedColor: Mongoose.Schema.Types.Mixed,
  },
  pauseOptions: {
    isPaused: Boolean,
    content: String,
    unPauseAfter: Number,
    embedColor: Mongoose.Schema.Types.Mixed,
    durationAfterPause: Number,
  },
  isDrop: Boolean,
  allowedMentions: {
    parse: [String],
    users: [String],
    roles: [String],
  },
});

export default Mongoose.models.Giveaway || Mongoose.model<IGiveaway>("Giveaway", GiveawaySchema);
