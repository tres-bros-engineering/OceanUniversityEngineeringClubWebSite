// emailTemplates/resetPassword.js
module.exports = function resetPasswordTemplate({
  userName,
  password,
  loginLink = "http://localhost:3000/admin", // Replace this with actual link
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
                <h2 style="margin-top:0;">Welcome to ${clubName}, ${userName} 👋</h2>

                <p>Your account has been successfully created.</p>

                <p>Please use the temporary password below to log in:</p>

                <p style="background:#f4f6f8; padding:12px; font-size:16px; font-weight:bold; letter-spacing:1px; text-align: center;">
                    ${password}
                </p>

                <p style="color:#b00020;">
                    ⚠️ For security reasons, you must change this password immediately after logging in.
                </p>

                <p>
                    Click the button below to log in to your account:
                </p>

                <p style="text-align:center; margin:30px 0;">
                    <a href="${loginLink}"
                    style="background:#000000; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;">
                    Login Now
                    </a>
                </p>

                <p>If you did not expect this email, please contact our support team immediately.</p>

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
