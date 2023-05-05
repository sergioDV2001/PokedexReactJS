import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../components";
import { PokemonContext } from "../context/PokemonContext";





import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';





export const PokemonPage = () => {
  const { getPokemonID, getSpecieID, getEvolution } =
    useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [specie, setSpecie] = useState({});
  const [evolution, setEvolution] = useState({});
  const [primeraEv, setPrimeraEv] = useState();
  const [segundaEv, setSegundaEv] = useState();
  const [terceraEv, setTerceraEv] = useState();
  const [statPS, setStatPS] = useState();
  const [statAtaque, setStatAtaque] = useState();
  const [statDefensa, setStatDefensa] = useState();
  const [statAtaqueEspecial, setStatAtaqueEspecial] = useState();
  const [statDefensaEspecial, setStatDefensaEspecial] = useState();
  const [statVelocidad, setStatVelocidad] = useState();

  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonID(id);

    console.log("");
    console.log("Data Pokemon");
    console.log(data);

    setStatPS((data.stats[0].base_stat * 100) / 200);
    setStatAtaque((data.stats[1].base_stat * 100) / 200);
    setStatDefensa((data.stats[2].base_stat * 100) / 200);
    setStatAtaqueEspecial((data.stats[3].base_stat * 100) / 200);
    setStatDefensaEspecial((data.stats[4].base_stat * 100) / 200);
    setStatVelocidad((data.stats[5].base_stat * 100) / 200);
    setPokemon(data);
  };

  const fetchEvolution = async (ruta) => {
    const data = await getEvolution(ruta);

    setEvolution(data);

    const res1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${data.chain.species.name}`
    );
    const data1 = await res1.json();

    setPrimeraEv(data1.id);

    if (data.chain.evolves_to.length > 0) { // si hay segunda evolucion 
      const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.chain.evolves_to[0].species.name}`);
      const data2 = await res2.json();

      setSegundaEv(data2.id);

      if (data.chain.evolves_to[0].evolves_to.length > 0) { // si hay tercera evolucion
        const res3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.chain.evolves_to[0].evolves_to[0].species.name}`);
        const data3 = await res3.json();

        setTerceraEv(data3.id);
      }else{
        
        setTerceraEv("");

      }

    } else { //si no hay segunda evolucion no hay ninguna
      setSegundaEv("");
      setTerceraEv("");
    }

    console.log("");
    console.log("Data Evolucion");
    console.log(data);

    setLoading(false);
  };

  const fetchPokemonSpecie = async (id) => {
    const data = await getSpecieID(id);

    setSpecie(data);
    console.log("");
    console.log("Data Especie");
    console.log(data);
    fetchEvolution(data.evolution_chain.url);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  useEffect(() => {
    fetchPokemonSpecie(id);
  }, []);






  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));











  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>

         <Box className="container-pokemon " sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid xs={12}
                md={4}
                className={
                  pokemon.types[0].type.name + " container-img-pokemon"
                }>
                  
                
                  <img
                  src={`/src/assets/BW/${pokemon.id}.png`}
                  alt={`Pokemon ${pokemon?.name}`}
                />
                </Grid>


                <Grid item xs={12} md={8}>

                <Box className="container-pokemon  " sx={{ flexGrow: 1 }}>
                  <Grid  container spacing={2}>
                    <Grid marginBottom={"5%"} xs={12}
                    
                    >

                    <h1 className="pokemon-name">{specie.names[6].name}</h1>
                    
                    <h3>{specie.flavor_text_entries[2].flavor_text.replace("", " ")}</h3>

                    </Grid>

                    <Grid marginBottom={"2%"} paddingTop={"2%"} xs={6}
                    
                    >

                    <h3 className="pokemon-data-title">Altura</h3>
                    <p>{pokemon.height/10} metros</p>

                    </Grid>

                    <Grid marginBottom={"2%"} paddingTop={"2%"} xs={6}
                    
                    >

                    <h3 className="pokemon-data-title">Ratio captura</h3>
                    <p>{specie.capture_rate}</p>

                    </Grid>

                    <Grid marginBottom={"2%"} paddingTop={"2%"} xs={6}
                    
                    >

                    <h3 className="pokemon-data-title">Peso</h3>
                    <p>{pokemon.weight/10} Kilos</p>

                    </Grid>

                    <Grid marginBottom={"2%"} paddingTop={"2%"} xs={6}
                    
                    >

                    <h3 className="pokemon-data-title">Felicidad base</h3>
                    <p>{specie.base_happiness}</p>

                    </Grid>

                    <Grid marginBottom={"2%"} paddingTop={"2%"} xs={6}
                    
                    >

                    <h3 className="pokemon-data-title">Habitat</h3>

                    { specie.habitat == null ? (

                      <p>Desconocido</p>
                      
                    ) : (
                    
                    <p>{specie.habitat.name}</p>)
                    
                    }


                    </Grid>

                    <Grid marginBottom={"2%"} paddingTop={"2%"} xs={6}
                    
                    >

                    <h3 className="pokemon-data-title">Xp base</h3>
                    <p>{pokemon.base_experience} XP</p>

                    </Grid>


              </Grid>
              </Box>  
              </Grid>
              </Grid>
            </Box>

          <Box className="container-pokemon  " sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12} className="container-stats ">
              <h1>Estadísticas</h1>
            </Grid>
          </Grid>

            <Grid container spacing={2}>
              <Grid xs={3} className="container-stats ">
                <b className="stat">PS</b>
              </Grid>

              <Grid xs={3} className="container-stats ">
                <div className="stat">{pokemon.stats[0].base_stat}</div>
              </Grid>

              <Grid xs={6} className="container-stats ">
                <div className="progress-bar stat">
                  <div
                    style={{ backgroundColor: "#E62829", width: `${statPS}%` }}
                    className="bar"
                  ></div>
                </div>
              </Grid>

              <Grid xs={3} className="container-stats ">
                <b className="stat">Ataque</b>
              </Grid>
              <Grid xs={3} className="container-stats ">
                <div className="stat">{pokemon.stats[1].base_stat}</div>
              </Grid>
              <Grid xs={6} className="container-stats ">
                <div className="progress-bar stat">
                  <div
                    style={{
                      backgroundColor: "#FF8000",
                      width: `${statAtaque}%`,
                    }}
                    className="bar"
                  ></div>
                </div>
              </Grid>

              <Grid xs={3} className="container-stats ">
                <b className="stat">Defensa</b>
              </Grid>
              <Grid xs={3} className="container-stats ">
                <div className="stat">{pokemon.stats[2].base_stat}</div>
              </Grid>
              <Grid xs={6} className="container-stats ">
                <div className="progress-bar stat">
                  <div
                    style={{
                      backgroundColor: "#FAC000",
                      width: `${statDefensa}%`,
                    }}
                    className="bar"
                  ></div>
                </div>
              </Grid>

              <Grid xs={3} className="container-stats ">
                <b className="stat">At. Esp.</b>
              </Grid>
              <Grid xs={3} className="container-stats ">
                <div className="stat">{pokemon.stats[3].base_stat}</div>
              </Grid>
              <Grid xs={6} className="container-stats ">
                <div className="progress-bar stat">
                  <div
                    style={{
                      backgroundColor: "#3FA129",
                      width: `${statAtaqueEspecial}%`,
                    }}
                    className="bar"
                  ></div>
                </div>
              </Grid>

              <Grid xs={3} className="container-stats ">
                <b className="stat">Def. Esp.</b>
              </Grid>
              <Grid xs={3} className="container-stats ">
                <div className="stat">{pokemon.stats[4].base_stat}</div>
              </Grid>
              <Grid xs={6} className="container-stats ">
                <div className="progress-bar stat">
                  <div
                    style={{
                      backgroundColor: "#2980EF",
                      width: `${statDefensaEspecial}%`,
                    }}
                    className="bar"
                  ></div>
                </div>
              </Grid>

              <Grid xs={3} className="container-stats ">
                <b className="stat">Velocidad</b>
              </Grid>
              <Grid xs={3} className="container-stats ">
                <div className="stat">{pokemon.stats[5].base_stat}</div>
              </Grid>
              <Grid xs={6} className="container-stats ">
                <div className="progress-bar stat">
                  <div
                    style={{
                      backgroundColor: "#EF70EF",
                      width: `${statVelocidad}%`,
                    }}
                    className="bar"
                  ></div>
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box className="container-evoluciones" sx={{ flexGrow: 1 }}>

          <Grid  container spacing={2}>

            <Grid xs={12} className="container-stats ">
                <h1>Evoluciones</h1>
            </Grid>

          </Grid>


            {terceraEv == "" && segundaEv == "" ? ( 
              
              /* pokemon legendario o pokemon sin evolucion */
              
              <Grid  container spacing={2}>
                <Grid xs={12} md={12} className="evolucion-container ">
                  <img
                    src={`./src/assets/BW/${primeraEv}.png`}
                    alt={`Pokemon ${pokemon?.name}`}
                    className="pokemon-img"
                  />
                </Grid>
              </Grid>
            ) : terceraEv == "" && segundaEv !== "" ? (

              /* pokemon con una evolucion */

              <Grid  container spacing={2}>
                <Grid xs={6} md={6} className="evolucion-container ">
                    <img
                      src={`/src/assets/BW/${primeraEv}.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="pokemon-img"
                    />
                    <img
                      src={`/public/flecha.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="flecha-img"
                    />
                </Grid>

                <Grid xs={6} md={6} className="evolucion-container ">
                    <img
                      src={`/src/assets/BW/${segundaEv}.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="pokemon-img"
                    />
                </Grid>

              </Grid>
            ):(

               /* pokemon con dos evoluciones */

              <Grid  container spacing={2}>

                <Grid xs={4} className="evolucion-container ">
                    <img
                      src={`/src/assets/BW/${primeraEv}.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="pokemon-img"
                    />
                    <img
                      src={'/public/flecha.png'}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="flecha-img"
                    />


                  </Grid>

                <Grid xs={4} className="evolucion-container ">
                    <img
                      src={`/src/assets/BW/${segundaEv}.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="pokemon-img"
                    />
                    <img
                      src={`/public/flecha.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="flecha-img"
                    />
                  </Grid>

                <Grid xs={4} className="evolucion-container ">
                    <img
                      src={`/src/assets/BW/${terceraEv}.png`}
                      alt={`Pokemon ${pokemon?.name}`}
                      className="pokemon-img"
                    />
                  </Grid>
              </Grid>

            )}
          </Box>
        </>
      )}
    </>
  );
};







/* <Box className="container-pokemon borde" sx={{ flexGrow: 1 }}>
            <Grid className="borde" spacing={2}  container>
              <Grid
                xs={12}
                sm={6}
                md={4}
                width={"100%"} display={"flex"}
                className={
                  pokemon.types[0].type.name + " container-img-pokemon borde"
                }
              >
                <img
                  src={`/src/assets/BW/${pokemon.id}.png`}
                  alt={`Pokemon ${pokemon?.name}`}
                />
                <div className="card-types info-pokemon-type">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`${type.type.name}-icon`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </Grid>

              <Grid display={"flex"} justifyContent={"center"} xs={12} sm={6} md={8} className="borde">
                <Grid container spacing={2} className="borde">

                  <Grid xs={12} className="borde">

                    <h1 className="pokemon-name">{specie.names[6].name}</h1>
                    <p>{specie.flavor_text_entries[0].flavor_text}</p>


                  </Grid>

                  <Grid xs={12} className="borde">
                    
                  </Grid>



                </Grid>
              </Grid>
            </Grid>
          </Box> */