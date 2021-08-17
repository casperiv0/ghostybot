import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Helper } from "structures/Helper";
import UserModel, { IUser } from "models/User.model";

export default class TemproleHelper extends Helper {
  private TEN_SECOND_INTERVAL = 10_000;

  constructor(bot: Bot) {
    super(bot, "temproleHelper");
  }

  async execute() {
    setInterval(async () => {
      const roles = await UserModel.find({ "temproles.hasTempRoles": true });
      if (!roles) return;

      roles.forEach(async (user: IUser) => {
        user.temproles.tempRoles
          .filter((r) => r.ms <= Date.now())
          .forEach(async (tempRole) => {
            const guild = this.bot.guilds.cache.get(user.guild_id);
            if (!guild) return;

            await this.bot.utils.updateUserById(user.user_id, user.guild_id, {
              temproles: {
                hasTempRoles: !(user.temproles.tempRoles?.length - 1 === 0),
                tempRoles: user.temproles.tempRoles.filter((r) => r.roleId !== tempRole.roleId),
              },
            });

            const message = {
              guild,
            };

            const member = await this.bot.utils.findMember(message as unknown as DJS.Message, [
              user.user_id,
            ]);
            if (!member) return;
            member.roles.remove(tempRole.roleId);
          });
      });
    }, this.TEN_SECOND_INTERVAL);
  }
}
