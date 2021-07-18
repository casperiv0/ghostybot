import * as next from "next";
import Bot from "structures/Bot";

interface ApiRequest extends next.NextApiRequest {
  bot: Bot;
}

export default ApiRequest;
