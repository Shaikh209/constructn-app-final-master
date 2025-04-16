import { Contact } from "../models/contactSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

export const recentSameContact = catchAsyncErrors(async (req, res, next) => {
  const { email, message } = req.body;

  const recentContact = await Contact.findOne({
    email,
    createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }, // Last 1 hour
  });

  if (recentContact) {
    return next(
      new ErrorHandler(
        "You have already submitted a similar message recently. Please wait before submitting again.",
        400
      )
    );
  }

  next();
});