const {Pokemon, Type} = require("../db")

const createpokemon = async (name, hp, atk, dfs, vel, alt, peso, tipo, img) =>{
    if(!(name && hp && atk && dfs && vel && alt && peso && tipo )) throw Error ("Faltan parametros")
        console.log(typeof(tipo))
        var typeDB = await Type.findAll({
            where: {
                name: tipo
            }
        })
        console.log(typeDB)
       if(typeDB.length === 0 ) return ("No existe ese tipo")
    
    let creado = await Pokemon.create({
        name: name,
        hp: hp,
        atk: atk,
        dfs: dfs,
        vel: vel,
        alt: alt,
        peso: peso,
        tipo: tipo,
        img: img
    })
    // creado.addType(typeDB)
    return("pokemon creado")
}
module.exports = {createpokemon}