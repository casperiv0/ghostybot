import { connect } from "mongoose";
import { logger } from "utils/logger";

async function database() {
  const uri = process.env["MONGO_DB_URI"];

  try {
    await connect(String(uri), {
      connectTimeoutMS: 300000,
      socketTimeoutMS: 75000,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });

    logger.log("database", "Connected to mongodb");
  } catch (e) {
    const error = e instanceof global.Error ? e : null;

    console.error(error);

    logger.error("database", error?.message!);
  }
}

database();
