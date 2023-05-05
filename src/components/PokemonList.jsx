import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from './CardPokemon';
import { Loader } from './Loader';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export const PokemonList = () => {
	const { allPokemons, loading, filteredPokemons } =
		useContext(PokemonContext);

		console.log(allPokemons)

	return (
		<>

			{loading ? (
				<Loader />
			) : (

				<Box className="container" sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>

			{filteredPokemons.length ? (
						<>
							{filteredPokemons.map(pokemon => (
								<>
								
								<Grid xs={12} sm={6} md={3}>
									<CardPokemon pokemon={pokemon} key={pokemon.id} />
								</Grid>
								</>
							))}
						</>
					) : (
						<>
							{allPokemons.map(pokemon => (
								<>
								
								<Grid xs={12} sm={6} md={3}>
									<CardPokemon pokemon={pokemon} key={pokemon.id} />
								</Grid>
								
								</>
							))}
						</>
					)}
			</Grid>
			</Box>

			)}
		</>
	);
};