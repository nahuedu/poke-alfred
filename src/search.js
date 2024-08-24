fetch("https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0")
.then((response) => response.json())
.then((response) => response.results.map((pokemon) => 
	{ return {title: pokemon.name, arg: JSON.stringify({name: pokemon.name, url: pokemon.url})}
	}))
.then((pokemons) => {
	console.log(JSON.stringify({items: pokemons}))
});