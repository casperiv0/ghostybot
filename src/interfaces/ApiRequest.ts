import { NextApiRequest } from "next";
import Bot from "../structures/Bot";

interface ApiRequest extends NextApiRequest {
  bot: Bot;
}

export default ApiRequest;
