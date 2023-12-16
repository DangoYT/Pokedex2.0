import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PokemonCard from './Components/PokémonCard/PokemonCard.jsx';
import { register } from 'swiper/element/bundle';
import PokemonList from './Components/PokémonList/PokemonList.jsx';

register();


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemonCard",
    element: <PokemonCard/>
  },
  {
    path: "/pokemonList",
    element: <PokemonList/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
