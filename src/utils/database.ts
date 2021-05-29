import { connect } from "mongoose";
import Logger from "handlers/Logger";

async function database() {
  const uri = process.env["MONGO_DB_URI"];

  try {
    await connect(String(uri), {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 300000,
      socketTimeoutMS: 75000,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });

    Logger.log("database", "Connected to mongodb");
  } catch (e) {
    console.error(e);
    console.log(e.reason);

    Logger.error("database", e?.stack || e);
  }
}

database();
