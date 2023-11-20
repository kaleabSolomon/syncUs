const dotenv = require("dotenv").config();
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("uncaught Exception");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
