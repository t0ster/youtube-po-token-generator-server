const express = require("express");
const { createTask } = require("./lib/task");
const { fetchVisitorData } = require("./lib/workflow");

const generate = async () => {
  const visitorData = await fetchVisitorData();
  const task = await createTask(visitorData);
  const { poToken } = await task.start();
  return { visitorData, poToken };
};

const app = express();
const port = 3000;

app.get("/token", async (req, res) => {
  try {
    const token = await generate();
    res.json(token);
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({
      error: "Failed to generate token",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Token generator service running on port ${port}`);
});

module.exports = app;
