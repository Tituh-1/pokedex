import { useState,useEffect } from 'react'

import './App.css'

import axios from 'axios'

function App() {
  const [count, setCount] = useState(1)

  const [input, setInput] = useState("");

  const [poke, setPoke] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [visual, setVisual] = useState("Arte")

  const [shiny, setShiny] = useState(false);

useEffect(() => {

const getData = async () => {
  if (count === 0) {
  setPoke({
    id: 0,
    name: "MissingNo",
    forms: [
      {
        name: "missingno"
      }
    ],
    sprites: {
      front_default: "/MissingNo-ghost.png",
      back_default: "/MissingNo-ghost.png",
      front_shiny: "/MissingNoYellow.png",
      back_shiny: "/MissingNoYellow.png",
      other: {
        "official-artwork": {
          front_default: "/MissingNo.png",
          front_shiny: "/MissingNoYellow.png"
        },
        home: {
          front_default: "/MissingNo-kabutops.png",
          front_shiny: "/MissingNoYellow.png"
        },
        showdown: {
          front_default: "/missingno-aerodactyl.png",
          front_shiny: "/MissingNoYellow.png",
          back_default: "/missingno-aerodactyl.png",
          back_shiny: "/MissingNoYellow.png"
        }
      }
    },
    types: [
      {
        type: {
          name: "???"
        }
      }
    ],
    stats: []
  });

  setLoading(false);
  setError(false);
  return;

 }
try {

const res = await axios.get( "https://pokeapi.co/api/v2/pokemon/" + (count));

setPoke(res.data);

console.log("Success:", res.data);

setLoading(false);

}

catch (e) {

console.error( "Erro ao carregar API", e );

setLoading(false);

setError(true);

}

}

getData();

}, [count]);

if(loading){

  return (<div>Carregando...</div>)

}

if(error){

  return (<div>Deu pau</div>)

}

  return (
    <>
  

      <section id="center">

       <div className="poke-info">
  <h1>{poke.forms[0].name}</h1>

  <p>
    #{String(count).padStart(3, "0")}
  </p>

  <p>
    {poke.types.map((type, index) => (
      <span key={type.type.name}>
        {index > 0 && " | "}
        {type.type.name}
      </span>
    ))}
  </p>
</div>

<div className="display">

  <div className="visuais">

    <button onClick={() => setVisual("Arte")}>
      Arte
    </button>

    <button onClick={() => setVisual("Modelo 3D")}>
      Modelo 3D
    </button>

    <button onClick={() => setVisual("Showdown")}>
      Showdown
    </button>

    <button onClick={() => setVisual("Sprite")}>
      Sprite
    </button>

    <button id="shiny" onClick={() => setShiny(!shiny)}>
      {shiny ? "Normal" : "Shiny"}
    </button>

  </div>
   
  <div className="hero">


    {visual === "Arte" && (
      <img
        src={
          shiny
            ? poke.sprites.other["official-artwork"].front_shiny
            : poke.sprites.other["official-artwork"].front_default
        }
        className="base"
        width="270"
        height="279"
        alt=""
      />
    )}

    {visual === "Modelo 3D" && (
      <img
        src={
          shiny
            ? poke.sprites.other.home.front_shiny
            : poke.sprites.other.home.front_default
        }
        className="base"
        width="270"
        height="279"
        alt=""
      />
    )}

    {visual === "Showdown" && (
      <>
        <img
          src={
            shiny
              ? poke.sprites.other.showdown.front_shiny
              : poke.sprites.other.showdown.front_default
          }
          className="sprite"
          width="270"
          height="279"
          alt=""
        />

        <img
          src={
            shiny
              ? poke.sprites.other.showdown.back_shiny
              : poke.sprites.other.showdown.back_default
          }
          className="sprite"
          width="270"
          height="279"
          alt=""
        />
      </>
    )}

    {visual === "Sprite" && (
      <>
        <img
          src={
            shiny
              ? poke.sprites.front_shiny
              : poke.sprites.front_default
          }
          className="sprite"
          width="270"
          height="279"
          alt=""
        />

        <img
          src={
            shiny
              ? poke.sprites.back_shiny
              : poke.sprites.back_default
          }
          className="sprite"
          width="270"
          height="279"
          alt=""
        />
      </>
    )}

  </div>

         <div className="stats">

    <h2>Status</h2>

    {poke.stats.map((stat) => (

      <div className="stat" key={stat.stat.name}>

        <div className="stat-name">
          <span>{stat.stat.name}</span>
          <span>{stat.base_stat}</span>
        </div>

        <div className="stat-bar">

          <div
            className="stat-fill"
            style={{
              width: `${Math.min(stat.base_stat, 150) / 150 * 100}%`
            }}
          />

        </div>

      </div>

    ))}
</div>
  </div>

       <div className="navigation">

  <button
    type="button"
    className="counter"
    onClick={() => {
      if (count > 0 && count <= 1025 || (count > 10001 && count <= 10326)) {
        setCount(count - 1)
      }
    }}
  >
    🢀 Anterior
  </button>

  <div className="search">

    <input
      type="text"
      className="counter"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <button
      className="counter"
      onClick={async () => {

        if (input.trim() === "") return;

        try {

          const busca = input.toLowerCase().trim();

          const res = await axios.get(
            "https://pokeapi.co/api/v2/pokemon/" + busca
          );

          setPoke(res.data);
          setCount(res.data.id);
          setError(false);

        } catch (e) {

          console.error("Pokémon não encontrado", e);
          alert("Pokémon não encontrado!");

        }

      }}
    >
      Ir
    </button>

  </div>

  <button
    type="button"
    className="counter"
    onClick={() => {
       if (count >= 0 && count < 1025 || (count >= 10001 && count < 10326)) {
        setCount(count + 1)
      }
    }}
  >
    Próximo 🢂
  </button>

<button
    type="button"
    className="counter"
    onClick={() => {
        setCount(count >= 10001 ? 1 : 10001)
    }}
  >
    {count >= 10001 ? "Padrão" : "Extras!"}

  </button>
</div>

      </section>

    </>

  )

}

export default App
