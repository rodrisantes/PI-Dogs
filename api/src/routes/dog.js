const { Router } = require("express");
const { Dog, Temperament } = require("../db");

const router = Router();

router.post("/dog", async (req, res) => {
  
    const {
    name,
    height,
    weight,
    life_span,
    temperaments,
    image,
  } = req.body;
  console.log(req.body)
try {
  const ids = await Temperament.findAll({where: {name : temperaments}, attributes : ["id"] }).then((arg) => arg.map(e => e.id))

  console.log(ids)

  const createDog = {
    name: name,
    height: height,
    weight: weight,
    life_span: life_span,
    image: image,
     }

    const newDog = await Dog.create(createDog)
     await newDog.addTemperament(ids)
    
    return res.status(201).json(newDog);


    
} catch (error) {
  return res.status(400).send('dog unsuccesfully created, please try again')

}

});


module.exports = router;
