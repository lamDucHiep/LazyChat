const loginRoute = require("./login.route");
const registerRoute = require("./register.route");
const chatRoute = require("./chat.route");
const statisticRoute = require("./statistic.route");
const transactionRoute = require("./transactions.route");

module.exports.index = (app) => {
  app.get("/login", loginRoute);
  app.get("/logout", loginRoute);
  app.post("/login", loginRoute);

  app.get("/register", registerRoute);
  app.post("/register", registerRoute);

  app.get("/chat", chatRoute);
  app.post("/chat", chatRoute);

  app.get("/statistic", statisticRoute);
  app.get("/statistic/expense-data", statisticRoute);

  app.get("/transaction", transactionRoute);
  app.get("/transaction-data", transactionRoute);
  app.get("/transaction-filter", transactionRoute);
  app.delete("/transaction-data/:id", transactionRoute);
  app.put("/transaction-data/:id", transactionRoute);
};
