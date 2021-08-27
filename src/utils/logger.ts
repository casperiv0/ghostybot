import chalk from "chalk";

class Logger {
  get now() {
    return Intl.DateTimeFormat("be-BE", {
      minute: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      month: "2-digit",
      year: "numeric",
      second: "2-digit",
    }).format(Date.now());
  }

  error(type: string, error: unknown) {
    const message = error instanceof Error ? error.message : error;
    return console.error(`${chalk.red("[ERROR]")}[${type.toUpperCase()}][${this.now}]: ${message}`);
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

export const logger = new Logger();
