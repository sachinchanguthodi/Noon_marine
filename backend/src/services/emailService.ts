import { Resend } from 'resend';
import env from '../config/env';

const getResend = () => {
  if (!env.RESEND_API_KEY) return null;
  return new Resend(env.RESEND_API_KEY);
};

const FROM_ADDRESS = env.EMAIL_FROM || 'Noon Marine <noreply@noonmarine.com>';

const verificationTemplate = (firstName: string, verificationUrl: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#1d4ed8 100%);border-radius:16px 16px 0 0;padding:40px 40px 36px;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 12px;">
                  <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;">⚓ NOON MARINE</span>
                </div>
              </div>
              <p style="color:rgba(255,255,255,0.65);font-size:13px;margin:12px 0 0;letter-spacing:0.5px;">MARITIME SERVICES PLATFORM</p>
            </td>
          </tr>

          <!-- Hero strip -->
          <tr>
            <td style="background:#1d4ed8;padding:0;">
              <div style="height:4px;background:linear-gradient(90deg,#38bdf8,#818cf8,#c084fc);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:48px 48px 40px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

              <!-- Icon -->
              <div style="text-align:center;margin-bottom:28px;">
                <div style="display:inline-block;background:#eff6ff;border-radius:50%;padding:20px;">
                  <span style="font-size:36px;">✉️</span>
                </div>
              </div>

              <h1 style="color:#0f172a;font-size:26px;font-weight:700;text-align:center;margin:0 0 12px;line-height:1.3;">
                Verify Your Email Address
              </h1>

              <p style="color:#64748b;font-size:16px;text-align:center;margin:0 0 32px;line-height:1.6;">
                Hi <strong style="color:#0f172a;">${firstName}</strong>, welcome to Noon Marine!<br/>
                Please confirm your email address to activate your account and access all our maritime services.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center;margin:0 0 36px;">
                <a href="${verificationUrl}"
                   style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#ffffff;
                          text-decoration:none;font-size:16px;font-weight:700;padding:16px 44px;
                          border-radius:10px;letter-spacing:0.3px;
                          box-shadow:0 4px 14px rgba(29,78,216,0.4);">
                  Verify Email Address
                </a>
              </div>

              <!-- Divider -->
              <div style="border-top:1px solid #e2e8f0;margin:0 0 28px;"></div>

              <!-- What's next -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;padding:24px;">
                    <p style="color:#475569;font-size:13px;font-weight:600;margin:0 0 14px;text-transform:uppercase;letter-spacing:0.8px;">
                      WHAT HAPPENS NEXT
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#1d4ed8;font-weight:700;margin-right:10px;">01</span>
                          <span style="color:#374151;font-size:14px;">Click the button above to verify your email</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#1d4ed8;font-weight:700;margin-right:10px;">02</span>
                          <span style="color:#374151;font-size:14px;">Log in to your Noon Marine account</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#1d4ed8;font-weight:700;margin-right:10px;">03</span>
                          <span style="color:#374151;font-size:14px;">Browse services, marketplace listings &amp; more</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:28px 0 0;line-height:1.6;">
                Button not working? Copy and paste this link into your browser:<br/>
                <a href="${verificationUrl}" style="color:#2563eb;word-break:break-all;">${verificationUrl}</a>
              </p>

              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:16px 0 0;">
                This link expires in <strong>24 hours</strong>. If you didn't create an account, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="color:#64748b;font-size:12px;margin:0 0 8px;">
                &copy; ${new Date().getFullYear()} Noon Marine Services. All rights reserved.
              </p>
              <p style="color:#334155;font-size:11px;margin:0;">
                Maritime Excellence &nbsp;·&nbsp; Professional Services &nbsp;·&nbsp; Global Reach
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const sendVerificationEmail = async (
  email: string,
  firstName: string,
  token: string
): Promise<boolean> => {
  const resend = getResend();

  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

  if (!resend) {
    console.warn('[Email] RESEND_API_KEY not set — skipping email send');
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Verify your email address — Noon Marine',
      html: verificationTemplate(firstName, verificationUrl),
    });

    if (error) {
      console.error('[Email] Resend error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Email] Failed to send verification email:', err);
    return false;
  }
};
