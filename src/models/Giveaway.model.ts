// import { GiveawaysMessages, LastChanceOptions, PauseOptions } from "discord-giveaways";
// // import * as Mongoose from "mongoose";

// const Mongoose = {};

// export interface IGiveaway extends Mongoose.Document {
//   messageID: string;
//   channelID: string;
//   guildID: string;
//   startAt: number;
//   endAt: number;
//   ended: boolean;
//   winnerCount: number;
//   prize: string;
//   messages: GiveawaysMessages;
//   hostedBy: string;
//   pauseOptions: PauseOptions;
//   lastChance: LastChanceOptions;
// }

// const GiveawaySchema = new Mongoose.Schema({
//   messageId: String,
//   channelId: String,
//   guildId: String,
//   startAt: Number,
//   endAt: Number,
//   ended: Boolean,
//   winnerCount: Number,
//   prize: String,
//   messages: {
//     giveaway: String,
//     giveawayEnded: String,
//     inviteToParticipate: String,
//     drawing: String,
//     dropMessage: String,
//     winMessage: Mongoose.Mixed,
//     embedFooter: Mongoose.Mixed,
//     noWinner: String,
//     winners: String,
//     endedAt: String,
//     hostedBy: String,
//   },
//   thumbnail: String,
//   hostedBy: String,
//   winnerIds: [String],
//   reaction: Mongoose.Mixed,
//   botsCanWin: Boolean,
//   embedColor: Mongoose.Mixed,
//   embedColorEnd: Mongoose.Mixed,
//   exemptPermissions: [],
//   exemptMembers: String,
//   bonusEntries: String,
//   extraData: Mongoose.Mixed,
//   lastChance: {
//     enabled: Boolean,
//     content: String,
//     threshold: Number,
//     embedColor: Mongoose.Mixed,
//   },
//   pauseOptions: {
//     isPaused: Boolean,
//     content: String,
//     unPauseAfter: Number,
//     embedColor: Mongoose.Mixed,
//     durationAfterPause: Number,
//   },
//   isDrop: Boolean,
//   allowedMentions: {
//     parse: [String],
//     users: [String],
//     roles: [String],
//   },
// });

// export default Mongoose.models.Giveaway || Mongoose.model<IGiveaway>("Giveaway", GiveawaySchema);
