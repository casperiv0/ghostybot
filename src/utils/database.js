const { connect, connection } = require("mongoose");
const { mongodbUri } = require("../../config.json");

(async function database() {
  const uri = mongodbUri;

  try {
    await connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[DATABASE]: connected to mongodb");
  } catch (e) {
    console.log(e);
  }

  connection.on("disconnected", () => {
    console.error("Disconnected from mongoDB");
  });
})();
