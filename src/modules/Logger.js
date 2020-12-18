const moment = require("moment");
const chalk = require("chalk");

class Logger {
  get now() {
    return moment().format("DD-MM-YYYY, HH:mm:ss a");
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  error(type, error) {
    return console.error(`${chalk.red("[ERROR]")}[${type.toUpperCase()}][${this.now}]: ${error}`);
  }

  /**
   * @param {string} type
   * @param {string} warning
   */
  warn(type, warning) {
    return console.warn(
      `${chalk.yellow("[WARNING]")}[${type.toUpperCase()}][${this.now}]: ${warning}`
    );
  }

  /**
   * @param {string} type
   * @param {string} message
   */
  log(type, message) {
    return console.log(
      `${chalk.blueBright("[INFO]")}[${type.toUpperCase()}][${this.now}]: ${message}`
    );
  }
}

module.exports = new Logger();
