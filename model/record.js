const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  loai: { type: String, enum: ["thu", "chi"], required: true },
  so_tien: { type: Number, default: 0 },
  mo_ta: { type: String },
  createdAt: { type: Date, default: Date.now },
  username: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Record", recordSchema);
