const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.post("/mark", (req, res) => {
  const { member_id } = req.body;

  if (!member_id) {
    return res.status(400).json({ message: "member_id required" });
  }

  
  db.query(
    `SELECT expiry_date FROM payments
     WHERE member_id = ?
     ORDER BY payment_date DESC
     LIMIT 1`,
    [member_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(403).json({ message: "No active membership" });
      }

      const expiry = new Date(result[0].expiry_date);
      const today = new Date();

      if (expiry < today) {
        return res.status(403).json({ message: "Membership expired" });
      }

      db.query(
        `INSERT INTO attendance (member_id, date, status)
         VALUES (?, CURDATE(), 'Present')`,
        [member_id],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.json({ message: "Attendance marked" });
        }
      );
    }
  );
});

module.exports = router;
