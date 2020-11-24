const { sendErrorLog } = require("../utils/functions");

module.exports = {
  name: "error",
  execute: (_bot, error) => {
    sendErrorLog(_bot, error, "error");
  },
};
