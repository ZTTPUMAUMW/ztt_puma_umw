import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

emailTransporter.verify((error) => {
  if (error) {
    console.error("Błąd konfiguracji email:", error);
  } else {
    console.log("Serwer email gotowy do wysyłania wiadomości");
  }
});
