import { GiveawaysManager } from "discord-giveaways";
import { prisma } from "utils/prisma";

export class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return prisma.giveaways.findMany();
  }

  async saveGiveaway(messageId: string, giveawayData: any) {
    const created = await prisma.giveaways.create({
      data: { messageId, ...giveawayData },
    });

    return created;
  }

  async editGiveaway(messageId: string, giveawayData: any): Promise<boolean> {
    await prisma.giveaways.updateMany({
      where: { messageId },
      data: giveawayData,
    });

    return true;
  }

  async deleteGiveaway(messageId: string): Promise<boolean> {
    await prisma.giveaways.deleteMany({
      where: { messageId },
    });

    return true;
  }
}
