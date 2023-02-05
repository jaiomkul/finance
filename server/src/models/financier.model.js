const mongoose = require("mongoose");

const financierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    loan_history: [
      {
        loan_amount: { type: Number, required: true },
        cibil_score: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Financier = mongoose.model("financier", financierSchema);
module.exports = Financier;
