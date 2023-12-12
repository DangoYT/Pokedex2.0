import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './pokemonlist.module.css'

export default function PokemonList({ onPokemonListChange, listafiltrada }) {
    const pokeApi = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=9';
    const [pokemonList, setPokemonList] = useState([]);
    const navigate = useNavigate();
    const handleClick = (p) => {
        navigate('/pokemonCard', { state: p });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(pokeApi);
                const data = await response.json();

                // Obtener detalles para cada Pokémon en la lista
                const promises = data.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    return pokemonResponse.json();
                });

                const detailedPokemonData = await Promise.all(promises);
                setPokemonList(detailedPokemonData);

                onPokemonListChange(detailedPokemonData);

            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }



        };

        fetchData();
    }, []);


    return (
        <div className={style.pokelist}>
            {listafiltrada.map((pokemon) => (
                <div className={style.pokeitem} onClick={() => handleClick(pokemon)} key={pokemon.id}>
                    <p className={style.pokeid} >#00{pokemon.id}</p>
                    <img className={style.pokeimage} src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                    <p className={style.pokename}>{pokemon.name}</p>
                </div>
            ))}
        </div>
    );
}
