const { connect, connection } = require("mongoose");

(async function database() {
  const uri = process.env["MONGO_DB_URI"];

  try {
    await connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
    // Logger.log("database", "Connected to mongodb");
  } catch (e) {
    console.error(e);
    // Logger.error("database", e?.stack || e);
  }

  connection.on("disconnected", () => {
    console.error("Disconnected from mongoDB");
  });
})();
