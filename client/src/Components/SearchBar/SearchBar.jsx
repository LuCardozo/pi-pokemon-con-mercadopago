import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchByName } from "../../Redux/Actions/actions";


export default function SearchBar(props){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value)
    }

    const inputSubmit = (e) =>{
        e.preventDefault()
        dispatch(searchByName(name))
        props.setCurrentPage(1)

    }

    return(
        <div>
            <input type="text" placeholder="Nombre del pokemon" onChange={e => handleInputChange(e)} />
            <button type="submit" onClick={e => inputSubmit(e)} >Buscar</button>
        </div>
    )
}