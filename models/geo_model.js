const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const geoSchema = new Schema(
  { url: String, text: String, id: Number },
  { collection: "open_source_cache" }
);

// timestamps will auto-create date and time of account activity

const OpenSource = mongoose.model("open_source_cache", geoSchema);

module.exports = OpenSource;
