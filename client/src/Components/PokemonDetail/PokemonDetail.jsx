import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"

import { getPokemonDetail, pagar } from "../../Redux/Actions/actions";

import s from "./pokemonstyle.module.css"

export default function PokemonDetail(props){
    const mercadopago = new MercadoPago('APP_USR-55e1574d-61b9-49a8-a1dc-11d5c95584a6', {
        locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
      });
    const dispatch = useDispatch();
    let {id} = useParams()
    console.log(id)
    useEffect(() =>{
        dispatch(getPokemonDetail(id))
    },[])

    const pokemon = useSelector((state) => state.pokemonDetail);
    
    const cleanDetail = (e) =>{
        pokemon = [];
    }
    console.log(pokemon)
    //inclusion mercado pago
    
    // let script = document.createElement("script");
    // script.src = "https://sdk.mercadopago.com/js/v2";
    // script.type = "text/javascript";
     
    const [link, setLink] = useState("");

    let orderData = {
        name: pokemon.name,
        price: pokemon.hp,
        quantity: 1,
        unit_price: pokemon.hp
    }
    
    fetch("/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (preference) {
          createCheckoutButton(preference.id);
    
          $(".shopping-cart").fadeOut(500);
          setTimeout(() => {
            $(".container_payment").show(500).fadeIn();
          }, 500);
        })
        .catch(function () {
          alert("Unexpected error");
          $('#checkout-btn').attr("disabled", false);
        });

    // const handleMercadoPago = async (e) =>{
    //     e.preventDefault()
    //     let response = await dispatch(pagar(datos))
    //     console.log(response.data)
    //     if(response.data){
    //         const script = document.createElement("script");
    //         script.type = "text/javascript"
    //         script.src = "https://sdk.mercadopago.com/js/v2";

    //         // script.setAttribute(data-preference-id, response.data); 
    //         script.dataset.preferenceId = response.data.id;
    //         const form = document.getElementById("form");
    //         form.appendChild(script);
    //         console.log(response.data)
    //         console.log(script)
    //         setLink(response.data.init)
    //     }


        // script.dataset.preferenceId = response.data;
        // document.getElementById("pago").innerHTML= "";
        // document.getElementById("pago").appendChild(script);
        // console.log(script)

    
    return(
        <div>
            <Link to="/home">
                <button onClick={cleanDetail} value="clean" name="clean">Volver</button>
            </Link>
        <div className={s.plantilla}>
            <div>
                <img src={pokemon.img} className={s.img} alt="Flag not Found" />
            </div>
            <div className={s.dato} id="dato">
                <h2>Nombre: {pokemon.name}</h2>
                <h3>ID: {pokemon.id}</h3>
                <h4>Estadisticas: </h4>
                <p>
                    vida: {pokemon.hp}<br/>
                    Puntos de ataque: {pokemon.atk} <br/>
                    Defensa: {pokemon.dfs} <br />
                    Velocidad: {pokemon.vel} <br/>
                    Altura: {pokemon.alt} <br/>
                    Peso: {pokemon.peso} <br/>
                <div>
                    <script src="https://sdk.mercadopago.com/js/v2"></script>
                    <div  id="for"class="cho-container"></div>
                </div>
                {
                    link && (
                        <div>
                            <a href={link} >
                                <button>Link de pago</button>
                            </a>
                        </div>
                    )
                }
                </p>
            </div>
            <form id="form" method="GET">
            <button onClick={handleMercadoPago} id="pago">Pagar</button>
            </form>
        </div>
        </div>
    )
}



//CREDENCIALES DE PRUEBA VENDEDOR


// Public Key
// APP_USR-55e1574d-61b9-49a8-a1dc-11d5c95584a6
// Access Token
// APP_USR-3953691119722438-110705-8aa9c78385a42cb1b8a52623939155f8-1230124929