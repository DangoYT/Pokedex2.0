import React, { useState, useEffect } from "react";
import style from "./search.module.css";
export default function Search({ listaPokemons, onFilteredPokemonsChange, onRadioChange}) {
  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [filterBy, setFilterBy] = useState("name");
  // Función para manejar cambios en el campo de búsqueda
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [radioSeleccionado, setRadioSeleccionado] = useState('opcion');
  const manejarCambioRadio = (event) => {
    const valor = event.target.value;
    setRadioSeleccionado(valor);
    onRadioChange(valor);

  };


  useEffect(() => {
    const filteredPokemons = listaPokemons.filter((pokemon) => {
      const searchTermLowerCase = searchTerm.toLowerCase();

      if (filterBy === "name") {
        return pokemon.name.toLowerCase().includes(searchTermLowerCase);
      } else if (filterBy === "id") {
        // Filtrar por ID si el término de búsqueda es un número y coincide con el ID del pokemon
        const searchTermAsNumber = parseInt(searchTerm, 10);
        return !isNaN(searchTermAsNumber) && pokemon.id === searchTermAsNumber;
      }

      return false;
    });

    setFilteredPokemons(filteredPokemons);
    onFilteredPokemonsChange(filteredPokemons);
  }, [listaPokemons, searchTerm, filterBy]);

  const handleClearClick = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div className={style.pokesearch}>
        <img className={style.pokelupa} src="images_figma/search.svg" alt="" />
        <input
          className={style.pokesearchbar}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar por nombre o ID..."
        />
        {searchTerm && (
          <img
            className={style.pokeclose}
            src="images_figma/close.svg"
            alt=""
            onClick={handleClearClick}
          />
        )}
        <div className={style.pokefilter}>
          <img
            className={style.pokefilterimg}
            src="images_figma/filter.svg"
            alt=""
            onClick={handleFilterClick}
          />
        </div>
      </div>

      {/* Mostrar resultados filtrados */}

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
                      onChange={manejarCambioRadio}
                    />
                    Por Nombre
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="opcion2"
                      checked={radioSeleccionado === 'opcion2'}
                      onChange={manejarCambioRadio}
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