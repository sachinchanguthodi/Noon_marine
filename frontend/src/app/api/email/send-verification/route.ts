import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as jwt from 'jsonwebtoken';

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
              <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;">&#9875; NOON MARINE</span>
              <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:10px 0 0;letter-spacing:0.5px;">MARITIME SERVICES PLATFORM</p>
            </td>
          </tr>

          <!-- Accent stripe -->
          <tr>
            <td style="padding:0;line-height:0;">
              <div style="height:4px;background:linear-gradient(90deg,#38bdf8,#818cf8,#c084fc);font-size:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:48px 48px 40px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

              <div style="text-align:center;margin-bottom:28px;">
                <div style="display:inline-block;background:#eff6ff;border-radius:50%;width:72px;height:72px;line-height:72px;text-align:center;">
                  <span style="font-size:32px;">&#10003;</span>
                </div>
              </div>

              <h1 style="color:#0f172a;font-size:26px;font-weight:700;text-align:center;margin:0 0 12px;line-height:1.3;">
                Verify Your Email Address
              </h1>

              <p style="color:#64748b;font-size:16px;text-align:center;margin:0 0 32px;line-height:1.6;">
                Hi <strong style="color:#0f172a;">${firstName}</strong>, welcome aboard!<br/>
                Confirm your email to activate your Noon Marine account and access all maritime services.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center;margin:0 0 36px;">
                <a href="${verificationUrl}"
                   style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#ffffff;
                          text-decoration:none;font-size:16px;font-weight:700;padding:16px 48px;
                          border-radius:10px;letter-spacing:0.3px;">
                  Verify Email Address &rarr;
                </a>
              </div>

              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;" />

              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;padding:24px;">
                    <p style="color:#475569;font-size:12px;font-weight:700;margin:0 0 14px;text-transform:uppercase;letter-spacing:1px;">
                      WHAT HAPPENS NEXT
                    </p>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr><td style="padding:7px 0;color:#374151;font-size:14px;">
                        <span style="color:#1d4ed8;font-weight:700;margin-right:10px;">01</span>
                        Click the button above to verify your email
                      </td></tr>
                      <tr><td style="padding:7px 0;color:#374151;font-size:14px;">
                        <span style="color:#1d4ed8;font-weight:700;margin-right:10px;">02</span>
                        Log in to your Noon Marine account
                      </td></tr>
                      <tr><td style="padding:7px 0;color:#374151;font-size:14px;">
                        <span style="color:#1d4ed8;font-weight:700;margin-right:10px;">03</span>
                        Browse services, marketplace &amp; more
                      </td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:28px 0 8px;line-height:1.6;">
                Button not working? Copy and paste this link:<br/>
                <a href="${verificationUrl}" style="color:#2563eb;word-break:break-all;font-size:11px;">${verificationUrl}</a>
              </p>
              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0;">
                This link expires in <strong>24 hours</strong>.
                If you did not create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="color:#64748b;font-size:12px;margin:0 0 6px;">
                &copy; ${new Date().getFullYear()} Noon Marine Services. All rights reserved.
              </p>
              <p style="color:#334155;font-size:11px;margin:0;">
                Maritime Excellence &nbsp;&middot;&nbsp; Professional Services &nbsp;&middot;&nbsp; Global Reach
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

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userToken = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json({ success: false, message: 'Server misconfigured' }, { status: 500 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(userToken, jwtSecret) as any;
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
    }

    const { firstName } = await request.json().catch(() => ({ firstName: 'there' }));

    // Generate a 24h verification token
    const verificationToken = jwt.sign(
      { id: decoded.id, email: decoded.email, purpose: 'email_verification' },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Use the request origin so it works on any deployment automatically
    const origin = request.nextUrl.origin;
    const verificationUrl = `${origin}/verify-email?token=${verificationToken}`;

    const resendKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.EMAIL_FROM || 'Noon Marine <noreply@noonmarine.com>';

    if (!resendKey) {
      // Dev fallback — log the link so it can still be tested
      console.log(`\n[DEV] Verification link for ${decoded.email}:\n${verificationUrl}\n`);
      return NextResponse.json({ success: true, message: 'Dev mode: check server logs for verification link' });
    }

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: decoded.email,
      subject: 'Verify your email address — Noon Marine',
      html: verificationTemplate(firstName || 'there', verificationUrl),
    });

    if (error) {
      console.error('[Email] Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Verification email sent' });
  } catch (err) {
    console.error('[Email] Unexpected error:', err);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
