const express = require("express");
const { generate } = require("./index");

const app = express();
const port = process.env.PORT || 3000;

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
