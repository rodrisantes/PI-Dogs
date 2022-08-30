const axios = require('axios');
const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const router = Router();
const { API_KEY } = process.env;

const getDbDogs = async () => {
    return await Dog.findAll({
      include: Temperament
    });
  };


  const getApiDogs = async () => {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const apiResponse = await apiUrl.data.map((e) => {
      return {
        id: e.id,
        image: e.image.url,
        name: e.name,
        temperament: e.temperament,
        weight: e.weight.imperial,
        height: e.height.imperial,
        life_span: e.life_span,
      };
    });
    return apiResponse;
  };

  const getAllDogs = async () => {
    const apiInfo = await getApiDogs();
    const bdInfo = await getDbDogs();
    const allInfo = apiInfo.concat(bdInfo);
    return allInfo;
  };
  
  router.get("/", async (req, res) => {
    const { name } = req.query;
    const allBreeds = await getAllDogs();
  
    if (!name) {
      res.status(200).json(allBreeds);
    } else {
      const filtrados = allBreeds.filter((e) => {
        const names = e.name.toUpperCase();
        if (names.includes(name.toUpperCase())) return names;
      });
      filtrados.length 
      ? res.status(200).json(filtrados)
      : res.status(400).send("Raza no encontrada");
    }
  });
  
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const breeds = await getAllDogs();
    if (id) {
      const filtrados = await breeds.find((e) => e.id == id);
      filtrados
        ? res.status(200).json(filtrados)
        : res.status(404).send("Raza no encontrada por ID");
    }
  });

  module.exports = router;
  