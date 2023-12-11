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
      </div>
      {/* Mostrar resultados filtrados */}
      <div>
        <h2>Resultados de la búsqueda:</h2>
        <ul>
          {filteredPokemons.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
