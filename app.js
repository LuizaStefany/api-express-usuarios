const express = require("express");
const cors = require("cors");
const path = require("path");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/usuarios", usuarioRoutes);

module.exports = app;
