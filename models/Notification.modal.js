const { Schema, model } = require("mongoose");
const yup = require("yup");

const notificationSchema = new Schema(
  {
    notificationFor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    type: { type: String, required: true },
    isRead: { type: Boolean, required: false },
    notificationBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    extraInfo: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = { Notification };
