const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//me traigo la funcion q trae a los pokemones
const {getTodos} = require("../MiddleWare/GetAllPokemons")
const {getAllTypes} = require("../MiddleWare/GetAllTypes")
const {getById} = require("../MiddleWare/GetpokemonById")
const {createpokemon} = require("../MiddleWare/CreatePokemon")
const router = Router();
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: "APP_USR-3953691119722438-110705-8aa9c78385a42cb1b8a52623939155f8-1230124929",
  });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", async (req, res) =>{
    // let {name} = req.query;
    // let allpokemons = await getTodos(name)
    // if(name) {
    //     let finded = []
    //    finded.push(allpokemons.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase())) // buscamos al pokemon por su name 
    //    if(!finded) res.status(404).send(["No existe un pokemon con ese nombre"]) // por si ponen cualquier cosa
    //    res.send(finded)
    // }
    // else{
    //     res.send(allpokemons);
    // }
// *****************
let {name} = req.query;
try {
    let allpokemons = await getTodos(name)
    res.send(allpokemons)
} catch (error) {
    res.status(404).send(error.message)
}



})

router.get("/types", async (req, res) =>{
    let types = await getAllTypes()
    res.send(types)
})

router.get("/pokemons/:id", async (req, res) =>{
    let {id} = req.params
    let pokemon = await getById(id)
    res.send(pokemon)
})
router.post("/pokemons", async (req, res) =>{
    let {name, hp, atk, dfs, vel, alt, peso, tipo, img} = req.body
    try {
        let poke = await createpokemon(name, hp, atk, dfs, vel, alt, peso, tipo, img);
        res.send(poke)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/comprar", async (req, res) =>{
    let {price, name, quantity, unit_price} = req.body;
    console.log(price)
    if(!quantity)  quantity = 1;
    let preference = {
        items: [
            {
                title: name,
                price: price,
                quantity: quantity,
                unit_price: unit_price
            }
        ]
    }
    // mercadopago.preferences.create(preference)
    // .then(function(response){
    //     res.send(response.body.id);
    // })
    // .catch(function(error){
    //     console.log(error)
    // })

    const response = await mercadopago.preferences.create(preference);
    const prefeId = {
        id: response.body.id,
        init: response.body.init_point
    }
    console.log(response)
    res.send(prefeId);

})

module.exports = router;
