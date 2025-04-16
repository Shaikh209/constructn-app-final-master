import express from "express";
import { submitContactForm } from "../controller/contactController.js";
import { recentSameContact } from "../middlewares/contactMiddleware.js";
const router = express.Router();

router.post("/submit", recentSameContact, submitContactForm);

export default router;
