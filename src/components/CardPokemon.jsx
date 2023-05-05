import React from "react";
import { Link } from "react-router-dom";

export const CardPokemon = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
      <div className={`card-img ${pokemon.types[0].type["name"]}`}>
        <b className="pokemon-id">#{pokemon.id}</b>
        <img
          src={`src/assets/BW/${pokemon.id}.png`}
          alt={`Pokemon ${pokemon.name}`}
        />
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <div className="card-types">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className={`${type.type.name}-icon`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
