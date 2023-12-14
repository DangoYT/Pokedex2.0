import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './pokemoncard.module.css'
export default function PokemonCard() {
  const location = useLocation();
  const pokemon = location.state;
  console.log(pokemon);


  const [pokedescription, setPokedescription] = useState("")
  const [pokeGift, setPokeGift] = useState("")

  const obternerDescripcion = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
    const data = await response.json()
    /* console.log("aca data",data.flavor_text_entries[0].flavor_text); */
    setPokedescription(data.flavor_text_entries[10].flavor_text)
  }

  const obtenerGif = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
    const gift = await response.json()
    console.log("aca los gift",gift.sprites.versions["generation-v"]["black-white"].animated.front_default);
    setPokeGift(gift.sprites.versions["generation-v"]["black-white"].animated.front_default)
  }

  useEffect(() => {
    obternerDescripcion()
    obtenerGif()
  }, [])

  return (
    <div className={`${style[pokemon.types[0].type.name]} `}>

      <p className="pokemon__name">{pokemon.name}</p>
      <span className="pokemon__id">{pokemon.id}</span>
      <img className="pokemon__image" src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
      <img src={pokeGift} alt="" />
      <div className={style.contenedor}>
        <ul className="pokemon__types">
          {pokemon.types.map((type, index) => (
            <li key={index} className={`${style[pokemon.types[0].type.name]} ${style.contenedor}`}>{type.type.name}</li>
          ))}
        </ul>

        <p className="pokemon__height">{pokemon.height}</p>
        <p className="pokemon__weight">{pokemon.weight}</p>

        <p>
          {pokedescription}
        </p>
        <div>
          <ul className="pokemon__abilities">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="pokemon__ability">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.pokestatscontainer}>

          <div className={style.pokestats}>
            <p>HP</p>
            <p>ATK</p>
            <p>DEF</p>
            <p>SATK</p>
            <p>SDEF</p>
            <p>SPD</p>
          </div>
          <div className={style.pokestatsvalues}>
            {pokemon.stats.map((stat, index) => (
              <p className="pokemon__stats" key={index}>
                {stat.base_stat}
              </p>
            ))}
          </div>
          <div className={style.pokestatsbars}>
            {pokemon.stats.map((stat, index) => (
              <input
                key={index}
                type="range"
                id="slider"
                name="slider"
                min="0"
                max="252"
                step="1"
                value={stat.base_stat}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
