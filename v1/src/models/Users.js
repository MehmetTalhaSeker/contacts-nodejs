const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("user", UserSchema);
