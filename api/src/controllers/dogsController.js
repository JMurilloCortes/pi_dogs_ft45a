// api/src/controllers/dogsController.js

const axios = require("axios");
const { Dog, Temperament } = require("../db");

const dogsController = {};

dogsController.getApiDogs = async (req, res) => {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener razas de perros de la API externa." });
  }
};

dogsController.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    res.json(dogs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener todas las razas de perros." });
  }
};

dogsController.getDogById = async (req, res) => {
  const { idRaza } = req.params;
  try {
    const dog = await Dog.findByPk(idRaza, {
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!dog) {
      return res.status(404).json({ message: "Raza de perro no encontrada." });
    }

    res.json(dog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener detalles de la raza de perro." });
  }
};

dogsController.searchDogsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const dogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (dogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron razas de perros con ese nombre." });
    }

    res.json(dogs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al buscar razas de perros por nombre." });
  }
};

dogsController.createDog = async (req, res) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    temperaments,
  } = req.body;

  try {
    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
    });

    const temperamentsDB = await Temperament.findAll({
      where: { name: temperaments },
    });
    await newDog.setTemperaments(temperamentsDB);

    res.status(201).json(newDog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear una nueva raza de perro." });
  }
};

dogsController.getAllTemperaments = async (req, res) => {
  try {
    const temperaments = await Temperament.findAll();
    res.json(temperaments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener todos los temperamentos." });
  }
};

module.exports = dogsController;
