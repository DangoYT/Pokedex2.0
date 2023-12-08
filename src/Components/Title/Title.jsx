import style from './title.module.css'

import React from 'react'

export default function Title() {
  return (
    <div className= {style.title_container}>
        <img className= {style.pokeball} src="images_figma/pokeball.svg" alt="pokeball" />
        <h1 className= {style.title}>Pokédex</h1>
    </div>
  )
}

