import { useState } from 'react'
import './App.css'
import Search from './Components/Search/Search'
import PokemonList from './Components/PokémonList/PokemonList'
import Title from './Components/Title/Title'
import { useState } from "react";
import "./App.css";
import Search from "./Components/Search/Search";
import PokemonList from "./Components/PokémonList/PokemonList";
import Title from "./Components/Title/Title";

function App() {
  return (
    <>
      <Search />
      <PokemonList/>
      <Title/>
      <Title />
      <Search />
      <PokemonList />
    </>
  );
}

export default App;
