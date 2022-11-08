
import {FilterByType, FilterByCreated, OrderByName, OrderByDamage} from "./FilterByType"

const initialState = {
    Pokemons: [],
    allpokemons: [],
    Types: [],
    pokemonDetail: [],
    band: false

}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_ALL_POKEMONS":
            return{
                ...state,
                Pokemons: action.payload,
                allpokemons: action.payload
            }
        case "FILTER_BY_TYPE":
            const filtered = FilterByType(state.allpokemons, action.payload)
            return{
                ...state,
                Pokemons: filtered
            }

        case "FILTER_BY_CREATED":
            const filteredbycreated = FilterByCreated(state.allpokemons, action.payload)
            console.log(action.payload)
            return{
                ...state,
                Pokemons: filteredbycreated
            }
        case "ORDER_BY_NAME":
            const order = OrderByName(state.allpokemons, action.payload)
        
            return{
                ...state,
                Pokemons: order
            }
        case "ORDER_BY_DAMAGE":
            const orderDamage = OrderByDamage(state.allpokemons, action.payload)
            return{
                ...state,
                Pokemons: orderDamage
            }
        case "GET_POKEMON":

            return{
                ...state,
                Pokemons: action.payload
            }

        case "POST_POKEMON":
            return{
                ...state,
            }

        case "GET_TYPE":
            return{
                ...state,
                Types: action.payload
            }

        case "GET_POKEMON_DETAIL":
            return{
                ...state,
                pokemonDetail: action.payload

            }
        
        default: 
        return{
            ...state
        }



    }
}