const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/register", (req, res) => {
  const { name, email, phone, plan } = req.body;

  if (!name || !email || !phone || !plan) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO members (name, email, phone, plan) VALUES (?, ?, ?, ?)",
    [name, email, phone, plan],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Member registered successfully" });
    }
  );
});

module.exports = router;
