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
  const [radioValue, setRadioValue] = useState('');
  const handleRadioChange = (value) => {
    setRadioValue(value); // Actualiza el estado con el nuevo valor del radio
  };

  const [radioSeleccionado, setRadioSeleccionado] = useState();
  return (
    <>
      <Title />
      <Search listaPokemons={appPokemonList} onFilteredPokemonsChange={updateFilteredPokemons} onRadioChange={handleRadioChange} />
      <PokemonList onPokemonListChange={updatePokemonList} listafiltrada={filteredPokemons} perrito={radioSeleccionado} radioValue={radioValue}/>
    </>
  );
}

export default App;
