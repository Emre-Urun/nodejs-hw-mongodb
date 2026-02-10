import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // env'den okumuyorsa direkt string yaz (garanti olsun)
  port: 587,
  secure: false, // 587 için false
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
  tls: {
    ciphers: 'SSLv3', // Bazı eski şifreleme sorunlarını çözer
    rejectUnauthorized: false, // Sertifika hatalarını görmezden gelir (Production için önerilmez ama ödevde hayat kurtarır)
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail({
    from: env('SMTP_FROM'),
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
