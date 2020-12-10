const moment = require("moment");
const chalk = require("chalk");

class Logger {
  now() {
    return moment().format("hh:mm:ss a");
  }

  fullDate() {
    return moment().format("MMMM Do YYYY, h:mm:ss a");
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  error(type, error) {
    return console.error(
      chalk.red(`[${type.toUpperCase()}][${this.now()}]: ${error}`)
    );
  }

  /**
   * @param {string} type
   * @param {string} warning
   */
  warn(type, warning) {
    return console.warn(
      chalk.yellow(
        `[WARNING][${type.toUpperCase()}][${this.now()}]: ${warning}`
      )
    );
  }

  /**
   * @param {string} type
   * @param {string} message
   */
  log(type, message) {
    return console.log(
      `[INFO][${type.toUpperCase()}][${this.now()}]: ${message}`
    );
  }
}

module.exports = new Logger();
