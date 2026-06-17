import nodemailer from "nodemailer";

const smtpHost = process.env.MAIL_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.MAIL_PORT ?? 587);
const smtpSecure = process.env.MAIL_SECURE === "true";
const smtpUser = process.env.MAIL_USER;
const smtpPass = process.env.MAIL_PASSWORD;
const mailFrom = process.env.MAIL_FROM || smtpUser;

if (!smtpUser || !smtpPass) {
  throw new Error(
    "MAIL_USER and MAIL_PASSWORD must be set in environment variables to send email."
  );
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  return transporter.sendMail({
    from: mailFrom,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const siteUrl = process.env.SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";
  const resetLink = `${siteUrl}/reset-password?token=${encodeURIComponent(token)}`;
  const subject = "Rujama Phones Shop password reset request";
  const text = `Hello,

A password reset request was received for your account. If you requested this, please reset your password by clicking the link below:

${resetLink}

If you did not request a password reset, you can safely ignore this email.

Thank you,
Rujama Phones Shop`;
  const html = `
    <div style="font-family: sans-serif; line-height: 1.5; color: #111;">
      <h1 style="color: #820210;">Rujama Phones Shop</h1>
      <p>A password reset request was received for your account.</p>
      <p>
        <strong>Reset your password:</strong><br />
        <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; background: #820210; color: white; text-decoration: none; border-radius: 8px;">
          Reset Password
        </a>
      </p>
      <p>If the button does not work, paste this link in your browser:</p>
      <p><a href="${resetLink}" style="color: #065f46;">${resetLink}</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,<br />Rujama Phones Shop</p>
    </div>
  `;

  return sendMail({
    to: email,
    subject,
    text,
    html,
  });
}
