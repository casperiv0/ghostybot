import * as next from "next";
import { Bot } from "structures/Bot";

export interface ApiRequest extends next.NextApiRequest {
  bot: Bot;
}
