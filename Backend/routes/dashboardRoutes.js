const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");


router.get("/members/count", auth, admin, (req, res) => {
  db.query("SELECT COUNT(*) AS totalMembers FROM members", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});


router.get("/members/active", auth, admin, (req, res) => {
  db.query(
    `SELECT COUNT(DISTINCT member_id) AS activeMembers
     FROM payments
     WHERE expiry_date >= CURDATE()`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});


router.get("/members/expired", auth, admin, (req, res) => {
  db.query(
    `SELECT COUNT(DISTINCT member_id) AS expiredMembers
     FROM payments
     WHERE expiry_date < CURDATE()`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});


router.get("/revenue", auth, admin, (req, res) => {
  db.query(
    "SELECT SUM(amount) AS totalRevenue FROM payments",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});


router.get("/payments/recent", auth, admin, (req, res) => {
  db.query(
    `SELECT member_id, plan, amount, payment_date
     FROM payments
     ORDER BY payment_date DESC
     LIMIT 5`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

module.exports = router;
