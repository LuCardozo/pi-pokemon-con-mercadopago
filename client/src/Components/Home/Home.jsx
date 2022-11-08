import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"

import {filterByCreated, getPokemons, getPokemonsByType, orderByDamage, orderByName} from "../../Redux/Actions/actions"
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado"
import SearchBar from "../SearchBar/SearchBar";

import s from "./Home.module.css"

export default function Home(){
    const dispatch = useDispatch();
    const allpokemons = useSelector((state) => state.Pokemons);
    const [orden, setOrden] = useState("")
    const [orderDamage, setOrderDamage] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsForPage, setPokemonsForPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsForPage;
    const indexOfFirtsPokemon = indexOfLastPokemon - pokemonsForPage;
    const currentPokemons = allpokemons.slice(indexOfFirtsPokemon, indexOfLastPokemon);
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        dispatch(getPokemons())
    },[dispatch])

    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(getPokemons())
        setCurrentPage(1)
    }

    const handleFilterByType = (e) =>{
        dispatch(getPokemonsByType(e.target.value))
    }

    const handleFilterByCreated = (e) =>{
        dispatch(filterByCreated(e.target.value))
    }

    const handleOrderByName = (e) =>{
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrderByDamage = (e) =>{
        e.preventDefault()
        dispatch(orderByDamage(e.target.value))
        setCurrentPage(1)
        setOrderDamage(`Ordenado ${e.target.value}`)
    }


    return (
        <div>
            <div className={s.h1}>
            <Link to= "/create">
                <h1>Crear tu Propio pokemon!</h1>
            </Link>
            </div>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar pokemones
            </button>
            <div>
                <SearchBar  setCurrentPage={setCurrentPage} />
            </div>
            <div className={s.selectores}>
            <h4>Filtrar Por base de datos: </h4>
                <select onChange={e => handleFilterByCreated(e)}>
                    <option value="all">Todos</option>
                    <option value="create">Creado</option>
                    <option value="ex">Existentes</option>
                </select>
            <h4>Ordenar por Nombre:</h4>
                <select onChange={e => handleOrderByName(e)} >
                    <option value="-">-</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            <h4>Ordenar por daño:</h4>    
                <select onChange={e => handleOrderByDamage(e)} >
                <option value="-">-</option>
                <option value="mayor">Mayor a menor</option>
                <option value="menor">Menor a Mayor</option>
                </select>
                <h4>Filtrar por: </h4>
                <select onChange={e => handleFilterByType(e)}>
                    <option value="all">Todos</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">fighting</option>
                    <option value="flying">flying</option>
                    <option value="poison">poison</option>
                    <option value="ground">ground</option>
                    <option value="rock">rock</option>
                    <option value="bug">bug</option>
                    <option value="ghost">ghost</option>
                    <option value="steel">steel</option>
                    <option value="fire">fire</option>
                    <option value="water">water</option>
                    <option value="grass">grass</option>
                    <option value="electric">electric</option>
                    <option value="psychic">psychic</option>
                    <option value="ice">ice</option>
                    <option value="dragon">dragon</option>
                    <option value="dark">dark</option>
                    <option value="fairy">fairy</option>
                    <option value="unknown">unknown</option>
                    <option value="shadow">shadow</option>
                </select>
                </div>
            <div className={s.cards}>
                {
                     currentPokemons.length === 0 &&
                     <div className={s.loading}>
                        <h1>Loading...</h1>
                        <img src="https://courses.cs.washington.edu/courses/cse154/17sp/project/pokedex-2/resources/starter/resources/icons/loading-pikachu.gif"/>
                     </div>
                }
                {
              
                    currentPokemons && currentPokemons.map((p) =>{
                        return(
                            <div key = {p.id} className={s.orden}>
                            <PokemonCard name={p.name} id={p.id} hp={p.hp} atk={p.atk} dfs={p.dfs} vel={p.vel} alt={p.alt}
                            peso={p.peso} image={p.img} tipo={p.tipo} />
                            </div>
                        )
                    })
                }
            </div>
                <Paginado
                pokemonsForPage = {pokemonsForPage}
                allpokemons = {allpokemons.length}
                paginado = {paginado}
                />
        </div>
    )
}