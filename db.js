const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  await mongoose
    .connect
    // Link do Mongo
    ();
  console.log("Conectou ao banco de dados!");
}

main().catch((err) => console.log(err));

module.exports = main;
