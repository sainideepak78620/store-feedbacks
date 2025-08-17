const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const feedbackFilePath = path.join(__dirname, "data", "feedback.json");
// Middleware
app.use(cors());
app.use(express.json());

// Load quotes
// const quotes = require("./quotes.json");

// GET /quote - return a random motivational quote
// app.get("/quote", (req, res) => {
//   const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//   res.json({ quote: randomQuote });
// });

// POST /feedback - save feedback to feedback.json
app.post("/feedback", (req, res) => {
  const { name, email, feedback } = req.body;
  console.log(name, email, feedback);
  if (!name || !feedback) {
    return res.status(400).json({ error: "Name and feedback are required" });
  }

  let feedbackData = [];
  console.log("hello")
  if (fs.existsSync(feedbackFilePath)) {
    const data = fs.readFileSync(feedbackFilePath, "utf8");
    console.log(data)
    feedbackData = JSON.parse(data);
    console.log(feedbackData)
  }

  feedbackData.push({ name, feedback, date: new Date().toISOString() });

  fs.writeFileSync(feedbackFilePath, JSON.stringify(feedbackData, null, 2));

  res.json({ message: "Feedback submitted successfully!" });
});

app.get("/feedbacks", (req, res) => {
    let feedbackData = []
    if (fs.existsSync(feedbackFilePath)) {
        const data = fs.readFileSync(feedbackFilePath, "utf8");
        console.log(data)
        feedbackData = JSON.parse(data);
        console.log(feedbackData)
      }
    
    //   feedbackData.push({ name, feedback, date: new Date().toISOString() });
    
    //   fs.writeFileSync(feedbackFilePath, JSON.stringify(feedbackData, null, 2));
    
      res.json(feedbackData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
