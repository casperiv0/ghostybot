import { connect } from "mongoose";
import Logger from "../modules/Logger";

(async function database() {
  const uri = process.env["MONGO_DB_URI"];

  try {
    await connect(String(uri), {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Logger.log("database", "Connected to mongodb");
  } catch (e) {
    console.error(e);
    Logger.error("database", e?.stack || e);
  }
})();
