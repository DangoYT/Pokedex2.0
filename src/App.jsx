import { useState } from 'react'
import './App.css'
import Search from './Components/Search/Search'
import PokemonList from './Components/PokémonList/PokemonList'
import Title from './Components/Title/Title'

function App() {
  const [appPokemonList, setAppPokemonList] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const updatePokemonList = (newPokemonList) => {
    setAppPokemonList(newPokemonList);
  };
  const updateFilteredPokemons = (filteredPokemons) => {
    setFilteredPokemons(filteredPokemons);
  };

  console.log("Hola soy la lista de pokemons filtrada en el app",filteredPokemons);
  return (
    <>
      <Title />
      <Search listaPokemons={appPokemonList} onFilteredPokemonsChange={updateFilteredPokemons} />
      <PokemonList onPokemonListChange={updatePokemonList} listafiltrada={filteredPokemons}/>
    </>
  );
}

export default App;
