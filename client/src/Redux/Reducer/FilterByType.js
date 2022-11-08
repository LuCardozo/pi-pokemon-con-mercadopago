

export function  FilterByType(allpokemons, payload){
    let todos = allpokemons
    let filtered = [];
    if(payload === "all") return allpokemons;
    if(payload){
        for(let i = 0; i < todos.length; i++){
            for(let j = 0; j < todos[i].tipo.length; j++){
                if(todos[i].tipo[j] === payload) 
                filtered.push(todos[i])
            }
        }
        if(filtered === []) return []
        return filtered;
    }
}

export function FilterByCreated(allpokemons, payload){
    if(payload === "all") return allpokemons;
    if(payload === "create"){
        let todos = allpokemons.filter(pokemon => pokemon.created === true)
        return todos;

    }
    else if(payload === "ex"){
        let todos = allpokemons.filter(pokemon => pokemon.created !== true)
        return todos;
    }

}
export function OrderByName(allpokemons, payload){
    
    let order = allpokemons;
    // if(payload === "-") return order;
    if(payload === "asc"){
        order.sort((a,b) =>{
            if(a.name > b.name){
                return 1;
            }
            if(b.name > a.name){
                return -1;
            }
            return 0;
        })
    }
    if(payload === "desc"){
        order.sort((a,b) =>{
            if(a.name > b.name){
                return -1;
            }
            if(b.name > a.name){
                return 1;
            }
            return 0;
        })
    }
    
    console.log(order)
    return order;
}

export function OrderByDamage(allpokemons, payload){
    let order = allpokemons;

    if(payload === "-") return allpokemons;

    if(payload === "mayor"){
        order.sort((a,b) =>
        b.atk - a.atk
        )
    }

    if(payload === "menor"){
        
        order.sort((a,b) =>
            a.atk - b.atk
        )
    }

    return order;
}