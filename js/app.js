'use strict'

import './router.js'

const pokeApi = {}

function convertPokeApiDetailToGeneration(pokeDetail) {
    const pokemon = {}

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = (pokeDetail.sprites.front_default) == null ? '../images/sem-imagem.webp' : pokeDetail.sprites.front_default


    return pokemon
}
pokeApi.getRegions = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGeneration)
}

pokeApi.getGenerations = (offset = 0, limit = 5) => {

    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getRegions))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4'),
    fetch('https://pokeapi.co/api/v2/pokemon/5')
]).then((results) => {})

export const pokedex = function(offset = 0, limit = 1282) {

    pokeApi.getGenerations(offset, limit)
        .then((pokemons = []) => pokemons.map((pokes) => {
            console.log();

            const pokedex = document.createElement('card-pokemon')
            pokedex.classList.add(`${pokes.type}`)
            pokedex.setAttribute('nome', pokes.name)
            pokedex.setAttribute('number', `#${ pokes.number}`)
            pokedex.setAttribute('img', pokes.photo)
                //Se o pokemon tiver mais de um tipo, entra no if e adiciona,
                //senão adiciona so o primeiro
            if (pokes.types.length > 1)
                pokedex.setAttribute('type_2', pokes.types[1])
            pokedex.setAttribute('type', pokes.type)
            pokedex.id = pokes.number

            return pokedex

        })).then((card) => {


            const div = document.getElementById('container')

            div.replaceChildren(...card)
        })

}
