const mongoose = require("mongoose");

const contactUsResponseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, collection: "contactUsResponses" }
);

module.exports = mongoose.model("ContactUsResponse", contactUsResponseSchema);
