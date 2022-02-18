const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  setlists: {
    type: [{ type: Schema.Types.ObjectId, ref: "Setlist" }],
  },
});

module.exports = model("User", userSchema);
