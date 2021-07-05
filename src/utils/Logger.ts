import chalk from "chalk";
import dayJs from "dayjs";

class Logger {
  get now() {
    return dayJs().format("YYYY-MM-DD, HH:mm:ss");
  }

  error(type: string, error: string) {
    return console.error(`${chalk.red("[ERROR]")}[${type.toUpperCase()}][${this.now}]: ${error}`);
  }

  warn(type: string, warning: string) {
    return console.warn(
      `${chalk.yellow("[WARNING]")}[${type.toUpperCase()}][${this.now}]: ${warning}`,
    );
  }

  log(type: string, message: string) {
    return console.log(
      `${chalk.blueBright("[INFO]")}[${type.toUpperCase()}][${this.now}]: ${message}`,
    );
  }
}

export default new Logger();
