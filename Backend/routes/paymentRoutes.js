const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/pay", (req, res) => {
  const { member_id, plan } = req.body;

  if (!member_id || !plan) {
    return res.status(400).json({ message: "member_id and plan required" });
  }

  let amount = 0;
  let duration = 0;

  if (plan === "Basic") {
    amount = 499;
    duration = 30;
  } else if (plan === "Standard") {
    amount = 799;
    duration = 30;
  } else if (plan === "Premium") {
    amount = 1199;
    duration = 30;
  } else {
    return res.status(400).json({ message: "Invalid plan" });
  }

  const paymentDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(paymentDate.getDate() + duration);

  db.query(
    `INSERT INTO payments (member_id, plan, amount, payment_date, expiry_date)
     VALUES (?, ?, ?, ?, ?)`,
    [member_id, plan, amount, paymentDate, expiryDate],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({
        message: "Payment successful",
        expiry_date: expiryDate
      });
    }
  );
});

module.exports = router;
