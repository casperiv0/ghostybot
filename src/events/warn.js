const Logger = require("../modules/Logger");

module.exports = {
  name: "warn",
  execute: (_bot, info) => {
    Logger.log("WARN", info);
  },
};
