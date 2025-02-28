const ContactUsResponse = require("../models/ContactUsResponse");

// Submit Contact Form
exports.submitContactForm = async (req, res) => {
  const { name, email, mobile, message } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required." });
    }

    // Save the contact form data to the database
    const contactUsResponse = new ContactUsResponse({
      name,
      email,
      mobile,
      message,
    });
    await contactUsResponse.save();

    res
      .status(201)
      .json({
        message: "Contact form submitted successfully!",
        contactUsResponse,
      });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};
