const express = require("express");
require("./db/database");
const cors = require("cors");
const routes = require("./routers/routes"); 

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
