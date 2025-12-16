const SuperAdmin = require('../model/superadmin_model');

// Superadmin Controller
const getSuperAdmin = async (req, res, next) => {
    try {
        const superadmins = await SuperAdmin.find({});
        res.status(200).json({response: superadmins});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."})
    }
};

const updateSuperAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {name, email, password} = req.body;

        const superAdminExist = SuperAdmin.findOne({id:id});
        if (!superAdminExist) {
            return res.status(404).json({message: "Super admin not found"});
        }

        const updatedSuperadmin = await SuperAdmin.findOneAndUpdate(
          { id: id },
          { $set: { name: name, email: email, password: password } }
        );
        res.status(200).json({
            response: updatedSuperadmin,
            message: "Profile updated successfully.",
        });
        console.log("Super admin updated successfully.");
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."})
    }
};
exports.getSuperAdmin = getSuperAdmin;
exports.updateSuperAdmin = updateSuperAdmin;