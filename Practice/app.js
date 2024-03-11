const express = require("express");
const indexRouter = require('./routes/index.route');


const app = express();

app.get("/", (req, res) =>
    res.send("<h1 style='text-align: center'>E-COMMERCE API</h1>")
);
app.use(express.json()); // Add this line to parse JSON requests

app.use("/api", indexRouter);

module.exports = app;
