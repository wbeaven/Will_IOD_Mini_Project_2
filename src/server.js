const express = require("express");
const cors = require("cors");
const {
  days,
  simulateDay,
  getWeek,
  removeDayById,
} = require("./controller/simulator");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// Routes
app.use("/", express.static("./src/public"));

app.get("/days", (req, res) => {
  res.json(days);
});

app.post("/simulate", (req, res) => {
  const newDay = simulateDay();
  res.json(newDay);
});

app.get("/week", (req, res) => {
  const weekData = getWeek();
  res.json(weekData);
});

app.delete("/days/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const removed = removeDayById(id);
  if (removed) {
    res.status(200).json({ message: "Day removed" });
  } else {
    res.status(404).json({ message: "Day not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
