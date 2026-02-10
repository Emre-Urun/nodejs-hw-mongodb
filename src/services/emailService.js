import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT')),
  secure: false,
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },

  family: 4, // Bu ayar Node.js'i IPv4 kullanmaya zorlar ve timeout sorununu çözer.
});

export const sendEmail = async (options) => {
  return await transporter.sendMail({
    from: env('SMTP_FROM'),
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
