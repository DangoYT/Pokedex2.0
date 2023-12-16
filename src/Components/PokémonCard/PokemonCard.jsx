import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./pokemoncard.module.css";

export default function PokemonCard() {
  const location = useLocation();
  const { selectedPokemon } = location.state;

  const [pokedescription, setPokedescription] = useState("");
  const [pokeGift, setPokeGift] = useState("");

  const obternerDescripcion = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`
    );
    const data = await response.json();
    setPokedescription(data.flavor_text_entries[10].flavor_text);
  };

  const obtenerGif = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}`
    );
    const gift = await response.json();
    setPokeGift(
      gift.sprites.versions["generation-v"]["black-white"].animated.front_shiny
    );
  };

  useEffect(() => {
    obternerDescripcion();
    obtenerGif();
  }, []);

  const pokemon = selectedPokemon;
  const typeUno = style[pokemon.types[0].type.name];

  return (
    <div className={`${typeUno} ${style.pokemon_card}`}>
      <div className={style.pokemon__header}>
        <div className={style.pokemon__name__container}>
          <img
            className={style.pokemon__back}
            src="images_figma/arrow_back.svg"
            alt=""
          />
          <p id={style.pokemon__name} className={style.pokemon__name}>
            {pokemon.name}
          </p>
        </div>
        <div className={style.pokemon__id__container}>
          <span className={style.pokemon__id}>#00{pokemon.id}</span>
        </div>
      </div>
      <img
        className={style.pokemon__img}
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <img src={pokeGift} alt="" />
      <div className={style.contenedor}>
        <div>
          {pokemon.types.map((type) => (
            <span className={style[type.type.name]} key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
        <p className={style.pokeabout}>About</p>
        <div id={style.pokemon__stats__container} className={style.pokemon__stats}>
          <div className={style.pokemon__height}>
            <img
              className={style.heightimg}
              src="images_figma/straighten.svg"
              alt=""
            />
            <p>Height</p>
            <p>{pokemon.height}</p>
          </div>
          <div className={style.pokemon__weight}>
            {" "}
            <img
              className={style.weightimg}
              src="images_figma/weight.svg"
              alt=""
            />
            <p>Weight</p>
            <p>{pokemon.weight}</p>
          </div>
          <div className="pokemon__abilities">
            {pokemon.abilities.map((ability, index) => (
              <span key={index} className="pokemon__ability">
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p>{pokedescription}</p>
        </div>

        <div className={style.pokestatscontainer}>
          <div className={style.pokestats}>
            <p className={typeUno}>HP</p>
            <p className={`${style[pokemon.types[0].type.name]} `}>ATK</p>
            <p className={`${style[pokemon.types[0].type.name]} `}>DEF</p>
            <p className={`${style[pokemon.types[0].type.name]} `}>
              SATK
            </p>
            <p className={`${style[pokemon.types[0].type.name]} `}>
              SDEF
            </p>
            <p className={`${style[pokemon.types[0].type.name]} `}>SPD</p>
          </div>
          <div className={style.pokestatsvalues}>
            {pokemon.stats.map((stat, index) => (
              <span className={style.statvalues} key={index}>
                {stat.base_stat}
              </span>
            ))}
          </div>
          <div className={style.pokestatsbars}>
            {pokemon.stats.map((stat, index) => (
              <input
                key={index}
                type="range"
                id={`slider-${index}`}
                name={`slider-${index}`}
                min="0"
                max="252"
                step="1"
                value={stat.base_stat}
                readOnly
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
