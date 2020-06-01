const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const dataBase = require("./infraestructura/dataBaseConfig");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

dataBase.initDB(); // Crear el pool o conexión con la base de datos

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-Type, Authorization");
  next();
});

app.use(bodyparser.json());

app.use(userRoute);

var server = app.listen(process.env.PORT || 8080, () => {
  console.log(
    `el servicio ha iniciado en el puerto ${process.env.PORT || 8080}`
  );
});
