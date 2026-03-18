    // routes/contact.js
    import express from 'express';
    import { sendMail } from '../utils/mailer.js';
    import nodemailer from 'nodemailer';
    const router = express.Router();

    router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        await sendMail({ name, email, message });
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
         console.log("❌ FULL ERROR:", err);
  res.status(500).json({ success: false, message: err.message });
    }
    });

    export default router;