import * as DJS from "discord.js";
import { BaseCommand, BaseCommandOptions } from "./BaseCommand";

export type ValidateReturn = {
  ok: boolean;
  error?:
    | DJS.MessagePayload
    | DJS.InteractionReplyOptions
    | (DJS.InteractionReplyOptions & { fetchReply: true });
};

export abstract class Command extends BaseCommand {
  get options(): BaseCommandOptions {
    return {
      ...this._options,
    };
  }
}
