const { default: mongoose } = require("mongoose");
require("dotenv").config();

const emsdb = mongoose.createConnection(process.env.emsDbUrl);
emsdb.on("connected", () => {
  console.log("Ems is Connected");
});
module.exports = {
  emsdb,
};
