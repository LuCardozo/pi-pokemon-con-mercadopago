import React from "react";
import {Link} from "react-router-dom";

import s from "./Landing.module.css"

export default function Landing() {
    return (
        <div className={s.h1}>
            <h1 >Bienvenidos a la Pokepagina!</h1>
            <Link to="/home">
                <button className={s.button}>Ingresar</button>
            </Link>
        </div>
    )
}