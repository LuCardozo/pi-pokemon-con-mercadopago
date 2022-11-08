import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
// me importo los components
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import PokemonCreate from "./Components/PokemonCreate/PokemonCreate"
import PokemonDetail from './Components/PokemonDetail/PokemonDetail';
function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Route exact path= "/">
      <Landing />
      </Route>
      <Route exact path="/home">
      <Home />
      </Route>
      <Route path= "/create">
        <PokemonCreate />
      </Route>
      <Route path="/home/:id" component={PokemonDetail} />
      
    </div>
  </BrowserRouter>
  );
}

export default App;
