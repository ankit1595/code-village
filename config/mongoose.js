const mongoose = require("mongoose");

main().catch((err) => console.log("Error connecting to mongoDB", err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/codeVillage_development");
  console.log("Successfully connected to database");
}
