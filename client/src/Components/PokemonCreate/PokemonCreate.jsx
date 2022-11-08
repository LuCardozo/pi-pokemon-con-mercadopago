import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from "react";
import s from "./PokemonCreate.module.css"

import { getType, postPokemon } from "../../Redux/Actions/actions";

export default function PokemonCreate(){
    let selectposition= false;
    const dispatch = useDispatch()
    const types = useSelector((state) => state.Types)
    const [input, setInput] = useState({
        name: "",
        hp: 0,
        atk: 0,
        dfs: 0,
        vel: 0,
        alt: 0,
        peso: 0,
        img: "",
        tipo: []
    })
    var band = true;
    const validate = (input) =>{
        let error = {};
        if(!input.name) error.name = "Tu pokemon debe tener un nombre";
        if(input.hp <= 0) error.hp = "Tu pokemon debe tener puntos de vida";
        if(input.hp > 1000) error.hp = "Tu pokemon no puede tener mas de 1000 puntos de vida";
        if(!input.atk) error.atk = "Tu pokemon debe tener puntos de ataque";
        if(!input.dfs) error.dfs = "Tu pokemon debe tener puntos de defensa";
        if(!input.vel) error.vel = "Tu pokemon debe tener puntos de velocidad";
        if(!input.alt) error.alt = "Tu pokemon debe tener una altura";
        if(!input.peso) error.peso = "Tu pokemon debe tener un peso";
        if(!selectposition) error.tipo = "Tu pokemon debe tener un tipo";
        
        return error;
    }
    const [error, setError] = useState({})

    useEffect(() =>{
        dispatch(getType())
    }, [dispatch])
    console.log(input)

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]:  e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleSelect = (e) =>{
        selectposition=true;
        setInput({
            ...input,
            tipo: [...input.tipo, e.target.value]
        })
      setError(validate({
        ...input,
        tipo: [...input.tipo, e.target.value]
      }))
    }
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Pokemon creado");
        selectposition=false;
        setInput({
            name: "",
            hp: 0,
            atk: 0,
            dfs: 0,
            vel: 0,
            alt: 0,
            peso: 0,
            img: "",
            tipo: []
        })
    }

    return(
        <div >
            <div className={s.inicio}>
                <Link to="/home">
                    Inicio
                </Link>
            </div>
            <div className={s.form}>
                <h2>Crea tu Pokemon</h2>
                <form onSubmit={(e) =>{handleSubmit(e)}}>
                    <label className={s.label}>Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} required />

                    <label className={s.label}>Vida:</label>
                    <input type="number" value={input.hp} name="hp" onChange={handleChange} required/>

                    <label className={s.label}>Ataque:</label>
                    <input type="number" value={input.atk} name="atk" onChange={handleChange} required/>

                    <label className={s.label}>Defensa:</label>
                    <input type="number" value={input.dfs} name="dfs" onChange={handleChange}required/>

                    <label className={s.label}>Velocidad:</label>
                    <input type="number" value={input.vel} name="vel" onChange={handleChange} required/>

                    <label className={s.label}>Altura:</label>
                    <input type="number" value={input.alt} name="alt" onChange={handleChange} required/>

                    <label className={s.label}>Peso:</label>
                    <input type="number" value={input.peso} name="peso"onChange={handleChange} required/>

                    <label className={s.label}>Imagen representativa</label>
                    <input type="text" value={input.img} name="img" onChange={handleChange}/> <br/>
                    <h2>Tipo: </h2>
                    <select onChange={(e) =>{handleSelect(e)}}>
                    {
                        
                    }
                    
                    
                    {

                        types.map((t) =>(
                            

                            <option value={t.name} name="tipo" >{t.name}</option>
                        ))
                    }
                    </select> <br/>
                    
                    {
                        error && Object.values(error).map(e => {
                            return(
                                <div>{e}</div>
                            )
                        })
                    }
                    {
                        console.log(Object.values(error).map( e => {console.log(e)}))
                    }
                    <button disabled={Object.entries(error).length} className={s.button} type="submit" >Crear Pokemon</button>
                </form>
            </div>
        </div>
    )
}