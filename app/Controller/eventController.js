const db = require('../models');
const Event = db.event;

exports.createEvent = async (req, res) => {

  const { title, description, date} = req.body;

  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(date)) {
    return res.status(500).send({ message: "error", result: "Invalid format tanggal YYYY-MM-DD." });
  }

  try {
    const event = await Event.create({
      title,
      description,
      date
    });

    res.status(200).send({ message: "success", event : event.title, result: "Create Event berhasil" });
  } catch (err) {
    res.status(500).send({ message: "error", result: "Gagal create event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const findEvents = await Event.findAll();
    res.status(200).send({ message: "success", result: "Event ditemukan", event : findEvents});
  } catch (err) {
    res.status(500).send({ message: "error", result: "Fungsi getEvents gagal" });
  }
};

exports.getEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const findEventId = await Event.findByPk(eventId);
    if (!findEventId){
      res.status(404).send({ message: "error", result: "Event tidak ditemukan"});
    }
    res.status(200).send({ message: "success", result: "Event ditemukan", event : findEventId});
  } catch (err) {
    res.status(500).send({ message: "error", result: "Fungsi getEventById gagal" });
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { title, description, date } = req.body;

  try {
    const findEventId = await Event.findByPk(eventId);
    if (!findEventId){
      res.status(404).send({ message: "error", result: "Event tidak ditemukan"});
    }

    // Update data event
    if (title) findEventId.title = title;
    if (description) findEventId.description = description;
    if (date) findEventId.date = date;

    await findEventId.save();
    res.status(200).send({ message: "success", result: "Update data Event"});
  } catch (err) {
    res.status(500).send({ message: "error", result: "Fungsi updateEvent gagal" });
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const findEventId = await Event.findByPk(eventId);
    if (!findEventId){
      res.status(404).send({ message: "error", result: "Event tidak ditemukan"});
    }

    await findEventId.destroy();
    res.status(200).send({ message: "success", result: "Delete data Event"});
  } catch (err) {
    res.status(500).send({ message: "error", result: "Fungsi deleteEvent gagal" });
  }
};