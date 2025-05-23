const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const fetch = require("node-fetch");

const app = express();

// Enable trust proxy to handle X-Forwarded-For header
app.set("trust proxy", 1);

// CORS: Allow all origins
app.use(cors({
  origin: "*",
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Handle CORS preflight requests
app.options("/api/chat", cors());

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests, please try again later."
});
app.use(limiter);

app.use(express.json());

// xAI Grok API setup
const XAI_API_KEY = process.env.XAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    console.log("Received message:", message);
    console.log("Using XAI_API_KEY:", XAI_API_KEY ? "Set (hidden)" : "Not set");
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant for Bradley Matera's web development projects. Provide detailed, accurate information about Bradley's projects, CodePens, GitHub, LinkedIn, skills, and experience as a web developer. Do not assume the user is Bradley; treat the user as someone seeking information about him." },
          { role: "user", content: message }
        ],
        model: "grok-3-beta",
        stream: false,
        temperature: 0,
        max_tokens: 500 // Increased to allow longer responses
      })
    });
    const data = await response.json();
    console.log("xAI response:", JSON.stringify(data, null, 2));
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "Invalid response from xAI API", details: data });
    }
  } catch (error) {
    console.error("xAI error:", error.message, error.response ? error.response.data : "");
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
