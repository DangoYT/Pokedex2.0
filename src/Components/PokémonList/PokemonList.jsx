import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PokemonList({ pokemon }) {
import style from './pokemonlist.module.css'
export default function PokemonList() {
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
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className= {style.pokelist}>
            {pokemonList.map((pokemon) => (
                <div onClick={() => handleClick(pokemon)}  key={pokemon.id}>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                    <p>Nombre: {pokemon.name}</p>
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                </div>
            ))}
        </div>
    );
}
