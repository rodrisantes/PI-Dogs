const { Router } = require('express');
// Importar todos los routers;
const { Temperament } = require('../db');
const { API_KEY } = process.env;
const { default: axios } = require('axios');
const router = Router();

router.get('/', async (req, res)=>{
   const temperamentsInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
   
    const temperamentsBd = temperamentsInfo.data.map((e) => e.temperament).toString().split(/\s*,\s*/)
   

   const filtradoEach =[... new Set (temperamentsBd)];
   filtradoEach.forEach(e =>{
      Temperament.findOrCreate({
         where: {name: e},
      })
   })
   const allTemperaments =await Temperament.findAll();
   res.json(allTemperaments);


})


module.exports = router;