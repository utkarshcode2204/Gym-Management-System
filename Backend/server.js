const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const planRoutes = require("./routes/planRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");




app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);



app.get("/", (req, res) => {
  res.send("Gym Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
