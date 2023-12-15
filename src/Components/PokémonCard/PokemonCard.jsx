import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./pokemoncard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
/* import "swiper/css";
 */
/* import "./styles.css"; */
export default function PokemonCard() {
  const location = useLocation();
  /* const pokemon = location.state; */
  const { selectedPokemon, filteredList } = location.state;
  /* console.log(pokemon); */

  const [pokedescription, setPokedescription] = useState("");
  const [pokeGift, setPokeGift] = useState("");
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  const obternerDescripcion = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`
    );
    const data = await response.json();
    /* console.log("aca data",data.flavor_text_entries[0].flavor_text); */
    setPokedescription(data.flavor_text_entries[10].flavor_text);
  };

  const obtenerGif = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}`
    );
    const gift = await response.json();
    /* console.log("aca los gift", gift.sprites.versions["generation-v"]["black-white"].animated.front_default); */
    setPokeGift(
      gift.sprites.versions["generation-v"]["black-white"].animated.front_shiny
    );
  };

  useEffect(() => {
    obternerDescripcion();
    obtenerGif();
    setCurrentPokemonIndex(0);
    setTypeUno(style[selectedPokemon.types[0].type.name]);
    /* setTypeDos(selectedPokemon.types["1"].type.name) */

  }, []);
  const handleSlideChange = (swiper) => {
    setCurrentPokemonIndex(swiper.activeIndex);
  };
  console.log(selectedPokemon);
  const pokemonArray = [selectedPokemon];

  const [typeUno, setTypeUno] = useState("")
  /* const [typeDos, setTypeDos] = useState("") */


  return (
    <Swiper onSlideChange={handleSlideChange}>
      {pokemonArray.map((pokemon) => (
        <SwiperSlide key={pokemon.id}>
          <div className={typeUno}>
            <p className="pokemon__name">{pokemon.name}</p>
            <span className="pokemon__id">{pokemon.id}</span>
            <img
              className="pokemon__image"
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <img src={pokeGift} alt="" />
            <div className={style.contenedor}>
              <div>
                {pokemon.types.map((type) => (<span className={style[type.type.name]}>{type.type.name}</span>))}
              </div>
              <p className={style.pokeabout}>About</p>
              <div>
                <div>
                  <p className="pokemon__height">{pokemon.height}</p>
                </div>
                <div>
                  {" "}
                  <p className="pokemon__weight">{pokemon.weight}</p>
                </div>

                {/* <div>
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index} className="pokemon__ability">
                      {ability.ability.name[0]}
                    </span>
                  ))}
                </div>

                <div>
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index} className="pokemon__ability">
                      {ability.ability.name[1]}
                    </span>
                  ))}
                </div> */}

                <div>
                  <ul className="pokemon__abilities">
                    {pokemon.abilities.map((ability, index) => (
                      <span key={index} className="pokemon__ability">
                        {ability.ability.name}
                      </span>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p>{pokedescription}</p>
              </div>

              <div className={style.pokestatscontainer}>
                <div className={style.pokestats}>
                  <p className={typeUno}>
                    HP
                  </p>
                  <p className={`${style[pokemon.types[0].type.name]} `}>
                    ATK
                  </p>
                  <p className={`${style[pokemon.types[0].type.name]} `}>
                    DEF
                  </p>
                  <p className={`${style[pokemon.types[0].type.name]} `}>
                    SATK
                  </p>
                  <p className={`${style[pokemon.types[0].type.name]} `}>
                    SDEF
                  </p>
                  <p className={`${style[pokemon.types[0].type.name]} `}>
                    SPD
                  </p>
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
