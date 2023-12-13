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

    const [radioSeleccionado, setRadioSeleccionado] = useState(null);
    const manejarCambioRadio = (valor) => {
        setRadioSeleccionado(valor);
    };






    const sortedListByName = [...listafiltrada].sort((a, b) => a.name.localeCompare(b.name));
    const sortedListById = [...listafiltrada].sort((a, b) => a.id - b.id);



    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFilterClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

            <div className={style.pokefilter}>
                <img
                    className={style.pokefilterimg}
                    src="images_figma/filter.svg"
                    alt=""
                    onClick={handleFilterClick}
                />
            </div>
            {radioSeleccionado === 'opcion1'
                ? sortedListByName.map((pokemon) => (
                    <div className={style.pokeitem} onClick={() => handleClick(pokemon)} key={pokemon.id}>
                        <p className={style.pokeid}>#00{pokemon.id}</p>
                        <img className={style.pokeimage} src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <p className={style.pokename}>{pokemon.name}</p>
                    </div>
                ))
                : sortedListById.map((pokemon) => (
                    <div className={style.pokeitem} onClick={() => handleClick(pokemon)} key={pokemon.id}>
                        <p className={style.pokeid}>#00{pokemon.id}</p>
                        <img className={style.pokeimage} src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <p className={style.pokename}>{pokemon.name}</p>
                    </div>
                ))
            }
            {
                isModalOpen && (
                    <div className={style.pokemodal}>
                        <div className={style.modalContent}>
                            {/* Contenido del modal */}
                            <span className={style.close} onClick={closeModal}>
                                &times;
                                <h2 className={style.sorttitle}>Filtrar por nombre</h2>
                                <div className={style.sortoptions}>
                                    <label>
                                        <input
                                            type="radio"
                                            value="opcion1"
                                            checked={radioSeleccionado === 'opcion1'}
                                            onChange={() => manejarCambioRadio('opcion1')}
                                        />
                                        Por Nombre
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            value="opcion2"
                                            checked={radioSeleccionado === 'opcion2'}
                                            onChange={() => manejarCambioRadio('opcion2')}
                                        />
                                        Por ID
                                    </label>
                                </div>
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
