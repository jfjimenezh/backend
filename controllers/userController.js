const fs = require("fs");
const dbConnection = require("../infraestructura/dataBaseConfig");

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const edad = req.body.edad;
  const email = req.body.email;
  const pass = req.body.pass;
  const Repeatpass = req.body.Repeatpass;

  const data = {
    name,
    lastName,
    edad,
    email,
    pass,
  };

  dbConnection.pool.query(
    "INSERT INTO usuario (id, nombre, apellido, edad, correo) VALUES ($1, $2, $3, $4, $5) ",
    Object.values(data),
    (error, resp) => {
      if (error) {
        res.status(400).json({
          message: "Usuario No creado",
          id: Date.now(),
        });
      }
      res.status(200).json({
        message: "Usuario creado",
        user: resp.rows,
        id: Date.now(),
      });
    }
  );
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.id;

  dbConnection.pool.query(
    "SELECT * FROM usuario WHERE userid = $1",
    [userId],
    (error, results) => {
      if (error) {
        res.status(400).json({
          message: "Usuario No encontrado",
          id: Date.now(),
        });
      }
      res.status(200).json(results.rows);
    }
  );
};

exports.getAllUsers = (req, res, next) => {
  dbConnection.pool.query("SELECT * FROM usuario", (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Usuario No encontrado",
        id: Date.now(),
      });
    }
    res.status(200).json(results.rows);
  });
};

/*
  fs.writeFile(`./users/${name}`, JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("Data is written to file successfully.");
  });

  res.status(200).json({
    message: "usuario creado",
    id: Date.now(),
  });
};
*/

/*
exports.getUser = (req, res, next) => {
  

  fs.readFile("./data/person.json", function (err, data) {
    res.writeHead(200, { "content-Type": "text/html" });
    res.write(data); //leo el archivo y envio respuesta de los datos.
    return res.end();
  });

exports.postUser = (req, res, next) => {
  const fs = require("fs");

  fs.appendFile(
    "./data/person.json",
    JSON.stringify(req.body) + "\r\n", //convierte la query a formato JSON.

    function (err) {
      if (err) throw err;
      console.log("save to person!");
    }
  );
  //respuesta del servidor cargada a un archivo HTML.
  fs.readFile("./formulario.html", function (err, data) {
    res.writeHead(200, { "content-Type": "text/html" });
    res.write(data); //leo el archivo y envio respuesta de los datos.
    return res.end();
  });

  res.send("sus datos han sido guardados");
};

*/
