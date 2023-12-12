import React, { useState } from "react";
import style from "./search.module.css";
export default function Search({ listaPokemons }) {
  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar cambios en el campo de búsqueda
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar la lista de Pokémon según el término de búsqueda
  const filteredPokemons = listaPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearClick = () => {
    setSearchTerm("");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(
    "este es el resultado de los pokemons filtrados",
    filteredPokemons
  );
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
      {searchTerm && (
        <div className={style.searchresults}>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {filteredPokemons.map((pokemon) => (
              <li key={pokemon.id}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
      {isModalOpen && (
        <div className={style.pokemodal}>
          <div className={style.modalContent}>
            {/* Contenido del modal */}
            <span className={style.close} onClick={closeModal}>
              &times;
              <h2 className={style.sorttitle}>Filtrar por nombre</h2>
              <div className={style.sortoptions}>
                <label htmlFor="number">Number</label>
                <input name="sort" id="number" type="radio" />
                <label htmlFor="name">Name</label>
                <input name="sort" id="name" type="radio" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
