import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
        allPokemons.sort((a, b) => a.id - b.id);
      });
    }

    createPokemonObject(data.results);
    console.log(allPokemons);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokemon evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              key={index}
              image={pokemon.sprites.other.dream_world.front_default}
              name={pokemon.name}
              id={pokemon.id}
              type={pokemon.types[0].type.name}
              weight={pokemon.weight}
              height={pokemon.height * 10}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
