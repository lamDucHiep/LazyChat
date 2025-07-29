const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const chatMessages = document.querySelector(".chat-messages");

document.addEventListener("DOMContentLoaded", () => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "message sent";
  userMsgDiv.textContent = message;
  chatMessages.appendChild(userMsgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  input.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      credentials: "include",
    });

    const data = await res.json();

    const botMsgDiv = document.createElement("div");
    botMsgDiv.className = "message received";
    botMsgDiv.textContent = data.reply;
    chatMessages.appendChild(botMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    const errMsgDiv = document.createElement("div");
    errMsgDiv.className = "message received";
    errMsgDiv.textContent = "Lỗi server!";
    chatMessages.appendChild(errMsgDiv);
  }
});
