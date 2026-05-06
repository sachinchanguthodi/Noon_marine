import nodemailer from 'nodemailer';
import env from '../config/env';

const createTransporter = () => {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT || 587,
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
};

export const sendVerificationEmail = async (
  email: string,
  firstName: string,
  token: string
): Promise<boolean> => {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('Email service not configured — skipping verification email');
    return false;
  }

  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"Noon Marine" <${env.EMAIL_FROM || 'noreply@noonmarine.com'}>`,
      to: email,
      subject: 'Please verify your email — Noon Marine',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 8px;">
          <div style="background: #0f172a; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Noon Marine Services</h1>
          </div>
          <div style="background: #ffffff; padding: 32px 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #111827; margin: 0 0 16px;">Hi ${firstName},</h2>
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 24px;">
              Thanks for registering with Noon Marine. Please verify your email address to activate your account.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verificationUrl}"
                style="display: inline-block; background: #2563eb; color: #ffffff; padding: 14px 32px;
                       text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #9ca3af; font-size: 13px; text-align: center; margin: 0 0 8px;">
              Or copy this link into your browser:
            </p>
            <p style="color: #2563eb; font-size: 12px; text-align: center; word-break: break-all; margin: 0 0 24px;">
              ${verificationUrl}
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
              This link expires in 24 hours. If you didn't create an account, you can ignore this email.
            </p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return false;
  }
};
