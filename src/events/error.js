const { sendErrorLog } = require("../utils/functions");

module.exports = {
  name: "error",
  execute: (bot, error) => {
    sendErrorLog(bot, error, "error");
  },
};
