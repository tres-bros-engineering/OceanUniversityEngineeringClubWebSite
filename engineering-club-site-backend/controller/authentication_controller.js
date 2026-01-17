const Admin = require('../model/admin_model');
const SuperAdmin = require('../model/superadmin_model');
const hash = require('./passwordHashing');

const getAuthAdmin = async (req, res, next) => {
    try {
        //find the user in database
        const admin = await Admin.findOne({ email: String(req.body.email) });
        //if user exists verify password
        if (admin) {
            //verify password hashing
            const isAuthentication = hash.verifyPasswordBcrypt(String(req.body.password), admin.password)
            if (isAuthentication) {
                res.status(200).json({ response: [isAuthentication, admin] });
            } else {
                res.status(200).json({ response: [isAuthentication] });
            }
        } else {
            //user not exists
            res.status(200).json({ response: [false] });
        }

    } catch (err) {
        //when server error
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const getAuthSuperAdmin = async (req, res, next) => {
    try {
        //find the user in database
        const superadmin = await SuperAdmin.findOne({ email: String(req.body.email) });
        //if user exists verify password
        if (superadmin) {
            //verify password hashing
            const isAuthentication = hash.verifyPasswordBcrypt(String(req.body.password), superadmin.password)

            if (isAuthentication) {
                res.status(200).json({ response: [isAuthentication, superadmin] });
            } else {
                res.status(200).json({ response: [isAuthentication] });
            }
        } else {
            //user not exists
            res.status(200).json({ response: [false] });
        }


    } catch (err) {
        //when server error
        res.status(500).json({ error: "Internal Server Error." });
    }
};

exports.getAuthAdmin = getAuthAdmin;
exports.getAuthSuperAdmin = getAuthSuperAdmin;