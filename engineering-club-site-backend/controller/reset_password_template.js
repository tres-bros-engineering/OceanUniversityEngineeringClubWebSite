// emailTemplates/resetPassword.js
module.exports = function resetPasswordTemplate({
  userName,
  otp,
  clubName = "Ocean University Engineering Club",
  logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuocjgIXjtX2iRgh3emheXTnKaEd8fvkx2-g&s",
}) {
    return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:40px 0; border-radius:6px;">

            <!-- Header -->
            <tr>
                <td align="center" style="padding:20px;">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                    <td style="vertical-align:middle;">
                        <img
                        src="${logoUrl}"
                        width="48"
                        height="48"
                        alt="${clubName} Logo"
                        style="display:block; margin-right:10px;"
                        />
                    </td>
                    <td style="vertical-align:middle; font-size:20px; font-weight:bold;">
                        ${clubName}
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <!-- Body -->
            <tr>
                <td style="padding:30px; color:#333333;">
                <h2 style="margin-top:0;">Hi ${userName} 👋</h2>

                <p>Use the otp below to reset your password:</p>

                <p style="background:#f4f6f8; padding:12px; font-size:28px; font-weight:bold; letter-spacing:1px; text-align: center;">
                    ${otp}
                </p>
                <p>If you didn’t request this, please ignore this email.</p>
                <p>Best regards,<br>
                <strong>${clubName}</strong></p>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background:#f4f6f8; padding:15px; text-align:center; font-size:12px; color:#777;">
                © ${new Date().getFullYear()} ${clubName}. All rights reserved.
                </td>
            </tr>

            </table>

        </td>
        </tr>
    </table>
    </body>
    </html>
    `;
};
