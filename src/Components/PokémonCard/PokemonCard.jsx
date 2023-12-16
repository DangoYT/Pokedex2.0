import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./pokemoncard.module.css";
import { useSwipeable } from 'react-swipeable'

export default function PokemonCard() {
  const navigate = useNavigate(); // Correcto: Use dentro de la función de componente
  const location = useLocation();
  const { selectedPokemon, filteredList } = location.state;

  const [pokedescription, setPokedescription] = useState("");
  const [pokeGift, setPokeGift] = useState("");

  const obternerDescripcion = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`
    );
    const data = await response.json();
    setPokedescription(data.flavor_text_entries[10].flavor_text);
  };

  const hacerClick = () => {
    navigate("/"); // Correcto: Se utiliza en el cuerpo de la función de componente
  }

  const obtenerGif = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}`
    );
    const gift = await response.json();
    setPokeGift(
      gift.sprites.versions["generation-v"]["black-white"].animated.front_shiny
    );
  };
  const [pokemonData, setPokemonData] = useState(null);

  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokeNumero, setPokeNumero] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}${pokeNumero}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchData();
    obternerDescripcion();
    obtenerGif();
  }, [baseURL, pokeNumero]);



  const siguientePokemon = () => {
    setPokeNumero(pokeNumero + 1);
  }
  const anteriorPokemon = () => {
    setPokeNumero((prevNumber) => (prevNumber > 1 ? prevNumber - 1 : 1));
  }

  const pokemon = selectedPokemon;
  const typeUno = style[pokemon.types[0].type.name];

  const config = {
    delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: true,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => siguientePokemon(),
    onSwipedRight: () => anteriorPokemon(),
    ...config
  });
  const [pokePrueba, setPokePrueba] = useState(selectedPokemon, pokemonData);

  console.log("pokePrueba", pokePrueba);
  return (
    <div {...handlers}>
      {selectedPokemon && (
        <div>
          <div className={`${typeUno} ${style.pokemon_card}`}>
            <div className={style.pokemon__header}>
              <div className={style.pokemon__name__container}>
                <img
                  className={style.pokemon__back}
                  src="images_figma/arrow_back.svg"
                  alt=""
                  onClick={hacerClick}
                />
                <img src="images_figma/chevron_left.svg" alt="" onClick={anteriorPokemon} />
                <img src="images_figma/chevron_right.svg" alt="" onClick={siguientePokemon} />
                <p id={style.pokemon__name} className={style.pokemon__name}>
                  {selectedPokemon.name}
                </p>
              </div>
              <div className={style.pokemon__id__container}>
                <span className={style.pokemon__id}>#00{selectedPokemon.id}</span>
              </div>
            </div>
            <img
              className={style.pokemon__img}
              src={selectedPokemon.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <img src={pokeGift} alt="" />
            <div className={style.contenedor}>
              <div>
                {selectedPokemon.types.map((type) => (
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
                  <p>{selectedPokemon.height}</p>
                </div>
                <div className={style.pokemon__weight}>
                  {" "}
                  <img
                    className={style.weightimg}
                    src="images_figma/weight.svg"
                    alt=""
                  />
                  <p>Weight</p>
                  <p>{selectedPokemon.weight}</p>
                </div>
                <div className="pokemon__abilities">
                  {selectedPokemon.abilities.map((ability, index) => (
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
                  <p className={`${style[selectedPokemon.types[0].type.name]} `}>ATK</p>
                  <p className={`${style[selectedPokemon.types[0].type.name]} `}>DEF</p>
                  <p className={`${style[selectedPokemon.types[0].type.name]} `}>
                    SATK
                  </p>
                  <p className={`${style[selectedPokemon.types[0].type.name]} `}>
                    SDEF
                  </p>
                  <p className={`${style[selectedPokemon.types[0].type.name]} `}>SPD</p>
                </div>
                <div className={style.pokestatsvalues}>
                  {selectedPokemon.stats.map((stat, index) => (
                    <span className={style.statvalues} key={index}>
                      {stat.base_stat}
                    </span>
                  ))}
                </div>
                <div className={style.pokestatsbars}>
                  {selectedPokemon.stats.map((stat, index) => (
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
        </div>
      )}
    </div>
  );
}
