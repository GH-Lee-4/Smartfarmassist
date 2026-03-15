// ✅ Make sure this file is included at the end of index.html

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  // Add user message
  addMessage("You: " + message, "user");
  input.value = "";

  try {
    // Send request to backend
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    addMessage("Bot: " + data.reply, "bot");
  } catch (error) {
    addMessage("⚠️ Could not reach server.", "bot");
  }
}

function addMessage(message, sender = "bot") {
  const chatBox = document.getElementById("messages"); // ✅ consistent ID
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  document.getElementById("messages").innerHTML = "";
  addMessage("🧹 Chat cleared!", "bot");
}

function showTopics() {
  const topics = [
    "🌾 Soil health monitoring",
    "💧 Smart irrigation",
    "🌻 Crop selection",
    "🐛 Pest management",
    "🌿 Organic farming",
  ];
  addMessage("Here are some topics:\n" + topics.join("\n"), "bot");
}

function randomTip() {
  const tips = [
    "Water early in the morning for best results!",
    "Rotate crops every season to protect soil nutrients.",
    "Use mulch to retain moisture and reduce weeds.",
    "Compost regularly for richer soil.",
  ];
  const random = tips[Math.floor(Math.random() * tips.length)];
  addMessage("💡 Tip: " + random, "bot");
}
