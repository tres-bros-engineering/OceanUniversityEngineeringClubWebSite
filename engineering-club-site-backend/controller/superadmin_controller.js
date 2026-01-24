const SuperAdmin = require('../model/superadmin_model');
const { sendMail } = require('./mail');
const { generateOTP, verifyOTP } = require('./otp');
const hash = require('./passwordHashing');
const reset_password_template = require('./reset_password_template');

let generate_OTP;

// Superadmin Controller
const getSuperAdmin = async (req, res, next) => {
    try {
        const superadmins = await SuperAdmin.find({});
        res.status(200).json({ response: superadmins });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
};

const updateSuperAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, email, currentPassword, password } = req.body;
        const superAdminExist = await SuperAdmin.findOne({ id: id });

        if (!superAdminExist) {
            return res.status(404).json({ message: "Super admin not found" });
        }

        if (name || email) {
            const updatedSuperadmin = await SuperAdmin.findOneAndUpdate(
                { id: id },
                { $set: { name: name, email: email } }
            );
            res.status(200).json({
                response: updatedSuperadmin,
                message: "Profile details updated successfully.",
            });
            console.log("Super admin details updated successfully.");
        } else {

            if (hash.verifyPasswordBcrypt(currentPassword, superAdminExist.password)) {
                const updatedSuperadmin = await SuperAdmin.findOneAndUpdate(
                    { id: id },
                    { $set: { name: name, email: email, password: hash.hashPasswordBcrypt(password) } }
                );
                res.status(200).json({
                    response: updatedSuperadmin,
                    message: "Profile password updated successfully.",
                });
                console.log("Super admin password updated successfully.");
            } else {
                res.status(200).json({
                    response: false,
                    message: "Current Password Not Matching.",
                    user_message: "Current Password Not Matching."
                });
            }
        }



    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
};

const sendSuperAdminOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const superAdminExist = await SuperAdmin.findOne({ email: email });
    if (!superAdminExist) {
      return res.status(404).json({ message: "Email not found." });
    }

    generate_OTP = generateOTP();

    // Send the OTP as an email
    await sendMail(
      superAdminExist.email,
      "Reset Super Admin Password",
      reset_password_template({
        userName: superAdminExist.name,
        otp: generate_OTP,
      }),
    );
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const resetSuperAdminPassword = async (req, res, next) => {
  try {
    const email = req.params.email;
    const { user_OTP, password } = req.body;

    const verify_OTP = verifyOTP(user_OTP, generate_OTP);

    if(verify_OTP.success === false) {
      return res.status(404).json({ message: verify_OTP.message });
    }

    const updatedSuperAdmin = await SuperAdmin.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: hash.hashPasswordBcrypt(password),
        },
      },
    );
    res.status(200).json({
      response: updatedSuperAdmin,
      message: "Password changed successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getSuperAdmin = getSuperAdmin;
exports.updateSuperAdmin = updateSuperAdmin;
exports.sendSuperAdminOTP = sendSuperAdminOTP;
exports.resetSuperAdminPassword = resetSuperAdminPassword;