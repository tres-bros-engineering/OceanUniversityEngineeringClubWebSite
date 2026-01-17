const SuperAdmin = require('../model/superadmin_model');
const hash = require('./passwordHashing');

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
exports.getSuperAdmin = getSuperAdmin;
exports.updateSuperAdmin = updateSuperAdmin;