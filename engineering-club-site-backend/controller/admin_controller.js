const Admin = require('../model/admin_model');
const hash = require('./passwordHashing');

const getAdmin = async (req, res, next) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json({ response: admins });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const addAdmin = async (req, res, next) => {
  try {
    const admin = new Admin({
      id: Number(req.body.id) + 1,
      name: req.body.name,
      email: req.body.email,
      password: hash.hashPasswordBcrypt(`${req.body.name.replace(/\s+/g, "%")}123`),
    });
    // console.log(admin.password)
    const emailExist = await Admin.findOne({ email: admin.email });
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const savedAdmin = await admin.save();
    res.status(201).json({
      response: savedAdmin,
      message: "Admin added successfully.",
    });
    console.log("Admin created successfully.");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, currentPassword, password } = req.body;

    const adminExist = await Admin.findOne({ id: id });
    if (!adminExist) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const emailExist = await Admin.findOne({ email: email });
    if (emailExist && (adminExist.email !== email)) {
      return res.status(409).json({ message: "Email already exists." });
    }

    if (hash.verifyPasswordBcrypt(currentPassword, adminExist.password)) {
      const updatedAdmin = await Admin.findOneAndUpdate(
        { id: id },
        { $set: { name: name, email: email, password: hash.hashPasswordBcrypt(password) } }
      );
      res.status(200).json({
        response: updatedAdmin,
        message: "Admin updated successfully.",
        user_message: "Profile updated successfully."
      });
      console.log("Admin updated successfully.");
    } else {
      res.status(200).json({
        response: false,
        message: "Current Password Not Matching.",
        user_message: "Current Password Not Matching."
      });
    }

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const adminExist = await Admin.findOne({ id: id });
    if (!adminExist) {
      return res.status(404).json({ message: "Admin not found." });
    }

    await Admin.findOneAndDelete({ id: id })
    res.status(200).json({ message: "Admin deleted successfully." });
    console.log("Admin deleted successfully.");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getAdmin = getAdmin;
exports.addAdmin = addAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;