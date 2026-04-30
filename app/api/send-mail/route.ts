import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Rexcrux Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: subject || "Rexcrux | New User Inquiry",
      html: `
  <div style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td style="padding:24px 32px;border-bottom:1px solid #1f2937;">
                <h1 style="margin:0;color:#22d3ee;font-size:20px;letter-spacing:1px;">
                  REXCRUX
                </h1>
                <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">
                  New Contact Form Submission
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:28px 32px;">
                
                <p style="color:#e5e7eb;font-size:14px;margin-bottom:20px;">
                  You have received a new inquiry from the website.
                </p>

                <!-- DETAILS TABLE -->
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  
                  <tr>
                    <td style="color:#9ca3af;padding:8px 0;">Name</td>
                    <td style="color:#ffffff;padding:8px 0;text-align:right;">
                      ${name || "N/A"}
                    </td>
                  </tr>

                  <tr>
                    <td style="color:#9ca3af;padding:8px 0;">Email</td>
                    <td style="color:#22d3ee;padding:8px 0;text-align:right;">
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td style="color:#9ca3af;padding:8px 0;">Phone</td>
                    <td style="color:#ffffff;padding:8px 0;text-align:right;">
                      ${phone || "N/A"}
                    </td>
                  </tr>

                  <tr>
                    <td style="color:#9ca3af;padding:8px 0;">Subject</td>
                    <td style="color:#ffffff;padding:8px 0;text-align:right;">
                      ${subject || "General Inquiry"}
                    </td>
                  </tr>

                </table>

                <!-- MESSAGE -->
                <div style="margin-top:24px;padding:16px;background:#0f172a;border-radius:8px;">
                  <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;">
                    MESSAGE
                  </p>
                  <p style="margin:0;color:#e5e7eb;line-height:1.6;">
                    ${message}
                  </p>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #1f2937;text-align:center;">
                <p style="margin:0;color:#6b7280;font-size:12px;">
                  This message was submitted via the Rexcrux website contact form.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `,
    });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}