import React from "react";

import {Link} from "react-router-dom"

import s from "./Card.module.css"

export default function PokemonCard(props){
    let tipo = props.tipo.join(" ")
    return (
        <div className={s.card}>
            <p>
                <Link  to={`/home/${props.id}`}>
                <h2>{props.name}</h2>
                </Link>
                <img src={props.image} alt="image not found" height="150px" width="150px"/>
                <br/>
                <p>
                    <a>Vida: {props.hp}</a>
                    <a>Ataque: {props.atk}</a>
                    <a>Defensa: {props.dfs}</a><br/>
                    <a>Vel: {props.vel}</a>
                    <a>Altura: {props.alt}</a>
                    <a>Peso: {props.peso}</a>
                    <a>Tipo: {tipo}</a>
                </p>
            </p>
        </div>
    )
}