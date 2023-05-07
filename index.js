const express = require("express");
const cookieParser = require("cookie-parser");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const propieadesRoutes = require("./routes/propiedadesRoutes.js");
const db = require("./config/db.js");

//crear la app
const app = express();

//habilitar lectura datos formularios
app.use(express.urlencoded({ extended: true }));

//habilitar cookie-parser
app.use(cookieParser());

//conexion db
try {
	db.authenticate();
	db.sync();
	console.log("database connected");
} catch (error) {
	console.log(error);
}

//habilitar pug
app.set("view engine", "pug");
app.set("views", "./views");

//carpeta publica
app.use(express.static("public"));

//routing
app.use("/auth", usuarioRoutes);
app.use("/", propieadesRoutes);

//definir un puerto y arrancar
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server runing in port ${port}`);
});
