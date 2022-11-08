import axios from "axios"

export function getPokemons(){
    return async (dispatch) =>{
        var pokemons = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
            type: "GET_ALL_POKEMONS",
            payload: pokemons.data
        })
    }
}
export function getPokemonsByType(payload){
    return {
        type: "FILTER_BY_TYPE",
        payload
    }
}
export function filterByCreated(payload){
    return{
        type: "FILTER_BY_CREATED",
        payload
    }
}
export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByDamage(payload){
    return {
        type: "ORDER_BY_DAMAGE",
        payload
    }
}

export function searchByName(name){
    return async (dispatch) =>{
        let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: "GET_POKEMON",
            payload: pokemon.data
        })}
}

export function getType(){
    return async (dispatch) =>{
        let types = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: "GET_TYPE",
            payload: types.data

        })
    }
}

export function postPokemon(payload){
    return async (dispatch) =>{
        try {
            let response =  await axios.post("http://localhost:3001/pokemons",payload)
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export function pagar(payload){
    return async(dispatch)=>{
        try {
            let response = await axios.post("http://localhost:3001/comprar", payload);
            console.log(response);
            return response
        } catch (error) {
                console.log(error)
        }
    }
}

export function getPokemonDetail(id){
    return async (dispatch) =>{
        try {
            let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: "GET_POKEMON_DETAIL",
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}