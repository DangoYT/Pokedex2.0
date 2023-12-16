import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './pokemonlist.module.css'

export default function PokemonList({ onPokemonListChange, listafiltrada, radioValue }) {
    const pokeApi = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=9';
    const [pokemonList, setPokemonList] = useState([]);
    const navigate = useNavigate();
    const handleClick = (p) => {
        navigate('/pokemonCard', { state: { selectedPokemon: p, filteredList: listafiltrada } });
        /* navigate('/pokemonCard', { state: p }); */
    };


    const sortedListByName = [...listafiltrada].sort((a, b) => a.name.localeCompare(b.name));
    const sortedListById = [...listafiltrada].sort((a, b) => a.id - b.id);


    const [pokemonNumero, setPokemonNumero] = useState(0);



    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(pokeApi);
            const data = await response.json();

            // Obtener detalles para cada Pokémon en la lista
            const promises = data.results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                return pokemonResponse.json();
            });


            const detailedPokemonData = await Promise.all(promises);
            setPokemonList(detailedPokemonData);

            onPokemonListChange(detailedPokemonData);/* aumentar este numero */
        };
        fetchData()
    }, []);
    const [pruebita, setPruebita] = useState(0);
    console.log("lista filtrada pero en pokemon list",sortedListByName[0]);

    return (
        <div className={style.pokelist}>

            {radioValue === 'opcion1'
                ? sortedListByName.map((pokemon) => (
                    <div className={style.pokeitem} onClick={() => handleClick(pokemon)} key={pokemon.id}>
                        <p className={style.pokeid}>#00{pokemon.id}</p>
                        <img className={style.pokeimage} src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <p className={style.pokename}>{pokemon.name}</p>
                        {/* <img src={pokemon.sprite.versions.generation-v.black-white.animated.front_default} alt="" /> */}
                    </div>
                ))
                : sortedListById.map((pokemon) => (
                    <div className={style.pokeitem} onClick={() => handleClick(pokemon)} key={pokemon.id}>
                        <p className={style.pokeid}>#00{pokemon.id}</p>
                        <img className={style.pokeimage} src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <p className={style.pokename}>{pokemon.name}</p>
                        {/* <img src={pokemon.sprite.versions.generation-v.black-white.animated.front_default} alt="" /> */}
                    </div>
                ))
            }
        </div>
    );
}