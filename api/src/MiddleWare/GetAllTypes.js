const axios = require("axios");
//traigo los modelos
const {Pokemon, Type} = require("../db");

const getAllTypes = async () =>{
    let types = await axios.get("https://pokeapi.co/api/v2/type")
    types = types.data.results
    types = types.map(t => {
        return {
            name: t.name,
            id: t.url.split("/")[6]
        }
    })
// ****************** aqui arriba ya me traje todos los tipos de pokemon

    for(let i = 0; i < types.length; i++){
            await Type.findOrCreate({
                where: {
                    name: types[i].name,
                    id: types[i].id
                }
            })
        

    }
    let typeDB = await Type.findAll()
    return typeDB;
}
module.exports = {getAllTypes}