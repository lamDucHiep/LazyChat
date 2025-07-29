const gpt_ai = require("./../../services/openai");

module.exports.getChat = (req, res) => {
  const username = req.cookies.username;
  const messages = req.session.messages || [];
  const headerContent = "Chat with me !!!";
  res.render("client/pages/chat", { messages, username, headerContent });
};

module.exports.postChat = async (req, res) => {
  if (!req.session.messages) req.session.messages = [];
  let botReply;
  const messages = req.session.messages;
  const userMessage = req.body.message;
  messages.push({ role: "user", text: userMessage });
  try {
    botReply = await gpt_ai.generateBotReply(
      messages.slice(-6),
      req.user.userId
    );
  } catch (error) {
    messages.push({ role: "assistant", text: "Server error!!" });
  }
  messages.push({ role: "assistant", text: botReply });
  if (messages.length > 20) {
    messages.shift();
  }
  res.json({ reply: botReply });
};
