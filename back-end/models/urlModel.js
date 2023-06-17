const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true },
  creator: {
    firstName: { type: String, default: null },
    _id: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
});

const UrlShortened = mongoose.model("UrlShortened", urlSchema);

module.exports = UrlShortened;
