const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loader = require("./loaders");
const { UserRoutes, ContactRoutes } = require("./api-routes/");

config();
loader();

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
  console.log("DB is up...");
  app.use("/contacts", ContactRoutes);
  app.use("/users", UserRoutes);
});
