import chalk from "chalk";
import moment from "moment";

class Logger {
  get now() {
    return moment().format("DD-MM-YYYY, HH:mm:ss");
  }

  error(type: string, error: string) {
    return console.error(`${chalk.red("[ERROR]")}[${type.toUpperCase()}][${this.now}]: ${error}`);
  }

  warn(type: string, warning: string) {
    return console.warn(
      `${chalk.yellow("[WARNING]")}[${type.toUpperCase()}][${this.now}]: ${warning}`
    );
  }

  log(type: string, message: string) {
    return console.log(
      `${chalk.blueBright("[INFO]")}[${type.toUpperCase()}][${this.now}]: ${message}`
    );
  }
}

export default new Logger();
