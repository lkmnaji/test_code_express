const db = require('../models');
const User = db.user;
const Event = db.event;
const jwt = require('jsonwebtoken');
const config = require('../config/database.config');

exports.register = async (req, res) => {

  const { username, password, role } = req.body;

  if (password.length < 8) {
    return res.status(500).send({ message: "Password minimal 8 karakter" });
  }

  try {

    const user = await User.create({
      username,
      password,
      role
    });

    res.status(200).send({ message: "success", result: "Registrasi Berhasil" });
  } catch (error) {
    res.status(500).send({ message: "error", result: "Gagal Create User" });
  }
};

exports.login = async (req, res) => {
  try {
    const userName = await User.findOne({ where: { username: req.body.username } });
    if (!userName) {
      res.status(404).send({ message: "error", result : "User tidak ditemukan"});
    }

    // const passwordLogin = await User.findOne({ where: { password: req.body.password } });
    if (userName.password !== req.body.password) {
      return res.status(500).send({ message: "error", result : "Password salah" });
    }

    const token = jwt.sign({ id: userName.id, role: userName.role }, config.secret, {
      expiresIn: 86500 // expires in 24 hours
    });

    res.status(200).send({ message: "success", token: token , result : "login berhasil"});
  } catch (err) {
    res.status(500).send({ message: "error", result : "Gagal login"});
  }
};

exports.getUsers = async (req,res) => {
  try {
    const findUsers = await User.findAll({ attributes : ['id', 'username', 'role']});
    res.status(200).send({ message: "success", result: "User ditemukan", user : findUsers});
  } catch (err) {
    res.status(500).send({message :"error", result: "Fitur getUsers gagal"});
  }
}

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const findUserId = await User.findByPk(userId, { attributes: ['id', 'username', 'role'] });
    if (!findUserId){
      res.status(404).send({ message: "error", result: "User tidak ditemukan"});
    } 
    res.status(200).send({ message: "success", result: "User ditemukan", user : findUsers});
  } catch (err) {
    res.status(500).send({message :"error", result: "Fungsi Pencarian gagal"});
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, password, role } = req.body;

  try {
    const findUserId = await User.findByPk(userId);
    if (!findUserId){
      res.status(404).send({ message: "error", result: "User tidak ditemukan"});
    } 

    // untuk update data user
    if (username) findUserId.username = username;
    if (password) findUserId.password = password;
    if (role) findUserId.role = role;

    await findUserId.save();
    res.status(200).send({ message: "success", result: "Update data user berhasil"});
  } catch (err) {
    res.status(500).send({message :"error", result: "Fungsi updateUser gagal"});
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const findUserId = await User.findByPk(userId);
    if (!findUserId){
      res.status(404).send({ message: "error", result: "User tidak ditemukan"});
    } 
    await findUserId.destroy();
    res.status(200).send({ message: "success", result: "Delete data user berhasil"});
  } catch (err) {
    res.status(500).send({message :"error", result: "Fungsi deleteUser gagal"});
  }
};

exports.addEventsUser = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const findUserId = await User.findByPk(userId);
    if (!findUserId){
      res.status(404).send({ message: "error", result: "User tidak ditemukan"});
    } 
    
    const findEventId = await Event.findByPk(eventId);
    if (!findEventId){
      res.status(404).send({ message: "error", result: "Event tidak ditemukan"});
    }

    await findUserId.addEvents(findEventId);
    res.status(200).send({ message: "success", result: "User pilih event berhasil"});
  } catch (err) {
    res.status(500).send({message :"error", result: "Fungsi addEventsUser gagal"});
  }
};