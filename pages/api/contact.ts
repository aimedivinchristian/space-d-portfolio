import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EMAIL CONFIGURATION
  // Set these environment variables in a .env.local file:
  //
  //   SMTP_HOST=smtp.gmail.com
  //   SMTP_PORT=587
  //   SMTP_USER=your-gmail@gmail.com
  //   SMTP_PASS=your-app-password          ← Generate at myaccount.google.com/apppasswords
  //   CONTACT_EMAIL=aimedivinchristian@gmail.com
  //
  // For Gmail: enable 2FA, generate an App Password, use it as SMTP_PASS.
  // ─────────────────────────────────────────────────────────────────────────

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Space D Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'aimedivinchristian@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Space D`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto;">
          <h2 style="color: #e08a45; margin-bottom: 0.5rem;">New Portfolio Message</h2>
          <p style="color: #666; font-size: 0.85rem; margin-top: 0;">Received via SpaceD Portfolio</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f7f4; padding: 1rem; border-radius: 8px; border-left: 3px solid #e08a45;">${message.replace(/\n/g, '<br/>')}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;" />
          <p style="color: #999; font-size: 0.8rem;">Space D — Aime Divin Christian | Kigali, Rwanda</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
