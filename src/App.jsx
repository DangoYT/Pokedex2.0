import { useState } from 'react'
import './App.css'
import Search from './Components/Search/Search'
import PokemonList from './Components/PokémonList/PokemonList'

function App() {

  return (
    <>
      <Search />
      <PokemonList/>
    </>
  )
}

export default App
