import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Contact } from "../models/contactSchema.js";

export const submitContactForm = catchAsyncErrors(async (req, res) => {
  let { name, email, message } = req.body;

  // Trim inputs to remove unnecessary spaces
  name = name?.trim();
  email = email?.trim();
  message = message?.trim();

  // Validate Name
  if (!name || name.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 3 characters long."
    });
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address."
    });
  }

  // Validate Message
  if (!message || message.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Message must be at least 10 characters long."
    });
  }

  // Check if a similar message from the same email exists (Optional)
  const existingMessage = await Contact.findOne({ email, message });
  if (existingMessage) {
    return res.status(409).json({
      success: false,
      message: "You have already submitted this message. Please wait before submitting again."
    });
  }

  // Create new contact entry
  const contactEntry = new Contact({ name, email, message });
  await contactEntry.save();

  return res.status(201).json({
    success: true,
    message: "Your message has been submitted successfully.",
    contactEntry,
  });
});
