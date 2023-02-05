const express = require("express");

const Financier = require("../models/financier.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const financier = await Financier.find().lean().exec();
    return res.status(200).send(financier);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const financier = await Financier.findById(req.params.id).lean().exec();

    return res.status(201).send(financier);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const financier = await Financier.create(req.body);

    return res.status(200).send(financier);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const financier = await Financier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.status(200).send(financier);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const financier = await Financier.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(financier);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
