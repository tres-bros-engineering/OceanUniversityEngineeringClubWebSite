const Admin = require('../model/admin_model');
const { sendMail } = require('./mail');
const hash = require('./passwordHashing');
const reset_password_template = require('./reset_password_template');
const welcome_admin_template = require('./welcome_admin_template');

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

    // Send an email to admin
    sendMail(
      admin.email,
      "New Admin Account created",
      welcome_admin_template({
        userName: admin.name,
        password: `${req.body.name.replace(/\s+/g, "%")}123`,
      }),
    );
    
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

    //for updated of admins by superadmin
    if (!currentPassword) {
      const updatedAdmin = await Admin.findOneAndUpdate(
        { id: id },
        { $set: { name: name, email: email } }
      );
      res.status(200).json({
        response: updatedAdmin,
        message: "Admin updated successfully.",
        user_message: "Profile updated successfully."
      });
      console.log("Admin updated successfully.");
    } else {
      //admin update only done by admin
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

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const adminExist = await Admin.findOne({ email: email });
    if (!adminExist) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Send the reset link as an email
    await sendMail(
      adminExist.email,
      "Reset Admin Password",
      reset_password_template({
        userName: adminExist.name,
        resetLink: "http://localhost:3000/admin",
      }),
    );
    res.status(200).json({ message: "Reset link sent to your email." });
    console.log("Reset link sent to your email.");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getAdmin = getAdmin;
exports.addAdmin = addAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
exports.forgotPassword = forgotPassword;