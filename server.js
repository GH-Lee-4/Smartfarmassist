import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(".")); // serve your HTML, CSS, JS files

// === Free Hugging Face API ===
const HF_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // Smart, free open model

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: userMessage,
      }),
    });

    const data = await response.json();

    // Extract response text (depends on model)
    const reply = data[0]?.generated_text || "Sorry, I couldn’t understand that.";

    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ reply: "⚠️ Could not connect to AI server." });
  }
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
