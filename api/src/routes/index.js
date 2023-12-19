// api/src/routes/dogs.js
const express = require('express');
const router = express.Router();
const dogsController = require('../controllers/dogsController');

// Obtener todas las razas de perros
router.get('/dogs', dogsController.getAllDogs);

// Obtener el detalle de una raza específica por ID
router.get('/dogs/:idRaza', dogsController.getDogById);

// Buscar razas por nombre (mayúsculas o minúsculas)
router.get('/dogs/name', dogsController.searchDogsByName);

// Crear una nueva raza de perro
router.post('/dogs', dogsController.createDog);

// Obtener todos los temperamentos
router.get('/temperaments', dogsController.getAllTemperaments);

module.exports = router;








// const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// module.exports = router;
