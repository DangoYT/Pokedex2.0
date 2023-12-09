import React, { useEffect, useState } from 'react';
import style from './pokemonlist.module.css'
export default function PokemonList() {
    const pokeApi = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=9';
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(pokeApi); // Corregido el nombre de la variable
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
                <div key={pokemon.id}>
                    <img src={pokemon.sprites.front_default} alt="" />
                    <p>Nombre: {pokemon.name}</p>
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                </div>
            ))}
        </div>
    );
}
