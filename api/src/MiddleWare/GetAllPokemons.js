//me exporto axios
const axios = require("axios");
//traigo los modelos
const {Pokemon, Type} = require("../db");

// get a la API
const getPokemonApi = async () =>{
    let pokemonsApi = await axios.get("https://pokeapi.co/api/v2/pokemon");
    pokemonsApi = pokemonsApi.data
    let pokemonsApi2 = pokemonsApi.next
    pokemonsApi = pokemonsApi.results
    pokemonsApi2 = await axios.get(pokemonsApi2)
    pokemonsApi2 = pokemonsApi2.data.results
    let allPokemons = pokemonsApi.concat(pokemonsApi2) // con todo hecho esto me traigo a los 40 pokemones en una sola variable
    let pokeInfo = [];
    for(let i = 0; i < allPokemons.length; i++){
        pokeInfo.push(await axios.get(allPokemons[i].url))
    }
    pokeInfo = pokeInfo.map(pokemon =>{
        return {
            name: pokemon.data.name,
            id: pokemon.data.id,
            hp: pokemon.data.stats[0].base_stat,
            atk: pokemon.data.stats[1].base_stat,
            dfs: pokemon.data.stats[2].base_stat,
            vel: pokemon.data.stats[5].base_stat,
            alt: pokemon.data.height,
            peso: pokemon.data.weight,
            img: pokemon.data.sprites.other.home.front_default,
            tipo: pokemon.data.types.map(t => t.type.name)
        }
    })
    return pokeInfo;
}
const getPokemonDB = async () =>{ // con esto me traigo los pokemones de la DB
    let pokemonsDB = await Pokemon.findAll()
    return pokemonsDB;
}
const getTodos = async (name) =>{ //juntamos tanto la api y la base de datos
    // let pokeapi = await getPokemonApi();
    // let pokedb = await getPokemonDB();

    // return pokeapi.concat(pokedb)
// ***********************
    let pokeapi = await getPokemonApi();
    let pokedb = await getPokemonDB();
    let total = pokeapi.concat(pokedb)
    console.log ("todos", total)
    console.log ("name", name)
    if(name){
        let finded = []

       finded.push(total.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase()))
       if(!finded.length) throw Error("No existe ese pokemon")
       return finded;
    } 
    else{
        return total

    }
}

module.exports = {getTodos}