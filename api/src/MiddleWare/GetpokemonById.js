const axios = require("axios");
const { where } = require("sequelize");
//traigo los modelos
const {Pokemon, Type} = require("../db");

const getByIdforApi = async (id) =>{
    try {
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        pokemon = pokemon.data
        return {
            id: pokemon.id,
            name: pokemon.name,
            img: pokemon.sprites.other.home.front_default,
            hp: pokemon.stats[0].base_stat,
            atk: pokemon.stats[1].base_stat,
            dfs: pokemon.stats[2].base_stat,
            vel: pokemon.stats[5].base_stat,
            alt: pokemon.height,
            peso: pokemon.weight,
            tipo: pokemon.types.map(el => el.type.name)
        }
        
    } catch (error) {
        return false
    }

}
const getByIdforDB = async (id) =>{
    try {
        let pokemon = await Pokemon.findOne({
            where: {
                id: id
            }
        })
        if(pokemon)return pokemon;
        else throw Error
    } catch (error) {
        return false
    }
}
const getById = async (id) =>{
    let pokemonAPI = await getByIdforApi(id);
    if(!pokemonAPI){
        let pokemonDB = await getByIdforDB(id);
        if(!pokemonDB) return "No existe un pokemon con esa ID"
        else{
            return pokemonDB;
        }
    }
    else{

        return pokemonAPI;
    }
}
module.exports = {getById}