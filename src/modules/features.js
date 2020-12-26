const fs = require("fs");

module.exports = function loadFeatures(bot) {
  const featureFiles = fs.readdirSync("./src/features").filter((file) => file.endsWith(".js"));

  featureFiles.forEach((file) => {
    const feature = require(`../features/${file}`);

    if (!feature.execute) {
      throw new TypeError(`[ERROR]: execute function is required for features! (${file})`);
    }

    if (!feature.name) {
      throw new TypeError(`[ERROR]: name is required for features! (${file})`);
    }

    feature.execute(bot);
    // Debug
    // bot.logger.log(
    //   "features",
    //   `Loaded feature: ${feature.name}`
    // );
  });
};
