import nodemailer from "nodemailer";
export const sendMail = async ({ name, email, message }) => {
  try {
    console.log("📩 Sending email...");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      text: `${message}\n\nSender Email: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log("❌ Error:", error);
    throw error;
  }
};
