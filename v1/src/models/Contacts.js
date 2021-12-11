const Mongoose = require("mongoose")

const ContactSchema = new Mongoose.Schema(
  {
    full_name: String,
    phone_number: String,
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("contacts", ContactSchema);
