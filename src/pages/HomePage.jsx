import React, { useContext } from "react";
import { FilterBar, PokemonList } from "../components";
import { PokemonContext } from "../context/PokemonContext";
import { Loader } from '../components/Loader';

export const HomePage = () => {

  const {onClickLoadMore, active, setActive, loading} = useContext(PokemonContext)

  return (
    <>

    <PokemonList />
    <FilterBar />
    {loading ? (
       <Loader/>
			) : (
    <div className="container-btn-load-more container">

      <button className="btn-load-more" onClick={onClickLoadMore}>
        Cargar más
      </button>

    </div>
    )}
    </>
  );
};
