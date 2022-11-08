import React from "react";
import s from "./Paginado.module.css"

export default function Paginado(props){
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(props.allpokemons/ props.pokemonsForPage ); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className={s.orden}>
                
                {

                    pageNumber && pageNumber.map((p, index) => (
                        <div className={s.page} key={index} >
                        <a onClick={() => props.paginado(p)}>{p}</a>

                        </div>
                    ))
                }
            </ul>
        </nav>
    )
}