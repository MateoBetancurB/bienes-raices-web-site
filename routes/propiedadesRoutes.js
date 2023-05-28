const express = require("express");
const router = express.Router();
const {
	admin,
	crearPropiedad,
	guardarPropiedad,
	agregarImagen,
	almacenarImagen,
	editarPropiedad,
  guardarPropiedadEditada,
  eliminarPropiedad
} = require("../controllers/propiedadesController.js");
const protegerRuta = require("../middlewares/protegerRuta.js");
const upload = require("../middlewares/subirImagen.js");

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crearPropiedad);
router.post("/propiedades/crear", protegerRuta, guardarPropiedad);
router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post(
	"/propiedades/agregar-imagen/:id",
	protegerRuta,
	upload.single("imagen"),
	almacenarImagen
);
router.get("/propiedades/editar/:id", protegerRuta, editarPropiedad);
router.post("/propiedades/editar/:id", protegerRuta, guardarPropiedadEditada);
router.post("/propiedades/eliminar/:id", protegerRuta, eliminarPropiedad);

module.exports = router;
