import { useState } from 'react'
import './App.css'
import Search from './Components/Search/Search'
import PokemonList from './Components/PokémonList/PokemonList'
import Title from './Components/Title/Title'

function App() {

  const [appPokemonList, setAppPokemonList] = useState([]);

  const updatePokemonList = (newPokemonList) => {
    setAppPokemonList(newPokemonList);
  };



  return (
    <>
      <Title />
      <Search listaPokemons = {appPokemonList}/>
      <PokemonList onPokemonListChange={updatePokemonList} />
    </>
  );
}

export default App;
