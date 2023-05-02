'use strict'

import './router.js'

//Função para carregar a pagina pokedex
export function appPokedex(){

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

const pokedex = function(offset = 0, limit = 1282) {

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
pokedex()
}

//Função para carregar a pagina Games
export function games(){
    const pokeApi = {}

let i = 0


function convertPokeApiDetailToGames(pokeDetail) {
    const card = {}


    if (pokeDetail.versions.length > 1)
        card.name2 = pokeDetail.versions[1].name
    card.name = pokeDetail.versions[0].name

    return card
}
//Pega a url que esta dentro do link da api e converte em elementos manipulaveis
pokeApi.getGames = (games) => {
    return fetch(games.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGames)
}

//Faz o fetch da api
pokeApi.getGroupGames = async() => {

    const url = `https://pokeapi.co/api/v2/version-group/?offset=0&limit=27`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        //Transforma o link em json e envia para a função que obtém a url
        //de dentro de cada index
        .then((jogos) => jogos.map(pokeApi.getGames))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((gamesDetails) => gamesDetails)
}
Promise.all([
    fetch('https://pokeapi.co/api/v2/version-group/1/'),
    fetch('https://pokeapi.co/api/v2/version-group/2/'),
    fetch('https://pokeapi.co/api/v2/version-group/3/'),
    fetch('https://pokeapi.co/api/v2/version-group/4/'),
    fetch('https://pokeapi.co/api/v2/version-group/5/'),

]).then((results) => {})

//Carrega o card no HTML
const loadCard = function() {

    pokeApi.getGroupGames()
        .then((groups = []) => groups.map((group) => {

            let primeiraLetraGame = group.name.charAt(0).toUpperCase();
            let restoDaPalavraGame = group.name.substring(1);

            let nameGame = primeiraLetraGame + restoDaPalavraGame;

            let primeiraLetraGame2 = group.name2 != null ? group.name2[0].toUpperCase() + group.name2.substring(1).toLowerCase() : ''

            let nameGame2 = primeiraLetraGame2

            const div = document.createElement('div-games')

            div.setAttribute('img', '../images/pokebola.png')
            div.setAttribute('name', `${nameGame}  ${nameGame2}`)
            div.setAttribute('game', group.name)
            if (group.name2 != undefined)
                div.setAttribute('game_2', group.name2)


            return div

        })).then((card) => {

            const div = document.getElementById('container')

            div.replaceChildren(...card)

        })

}
loadCard()
}

//Função para carregar a pagina Regions
export function regions(){
    const pokeApi = {}


function convertPokeApiDetailToGames(pokeDetail) {
    const card = {}

    card.id = pokeDetail.id
    card.generation = pokeDetail.name
    card.region = pokeDetail.main_region.name
    card.img = `../images/regioes/${pokeDetail.main_region.name}.png`

    return card
}
pokeApi.getGames = (region) => {
    return fetch(region.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGames)
}

pokeApi.getGroupGames = async() => {

    const url = `https://pokeapi.co/api/v2/generation/`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((generations) => generations.map(pokeApi.getGames))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
Promise.all([
    fetch('https://pokeapi.co/api/v2/generation/1/'),
    fetch('https://pokeapi.co/api/v2/generation/2/'),
    fetch('https://pokeapi.co/api/v2/generation/3/'),
    fetch('https://pokeapi.co/api/v2/generation/4/'),
    fetch('https://pokeapi.co/api/v2/generation/5/')

]).then((results) => {})

const loadCard = function() {

    pokeApi.getGroupGames()
        .then((regioes = []) => regioes.map((regiao) => {



            //Deixar os números romanos em maiúsculo

            let ultimasLetras = regiao.generation.slice(-2).toUpperCase();
            let resultado = regiao.generation.slice(0, -2) + ultimasLetras;

            if (regiao.generation.length == 14) {
                ultimasLetras = regiao.generation.slice(-4).toUpperCase();
                resultado = regiao.generation.slice(0, -4) + ultimasLetras;
            } else if (regiao.generation.length == 15) {
                ultimasLetras = regiao.generation.slice(-5).toUpperCase();
                resultado = regiao.generation.slice(0, -5) + ultimasLetras;
            }

            const link = document.createElement('a')
            link.id = regiao.region
            link.href = "/detailRegion" 
            link.setAttribute('onclick','route()')

            const card = document.createElement('card-regions')

            card.setAttribute('generation', resultado)
            card.setAttribute('region', regiao.region)
            card.setAttribute('img', regiao.img)

            link.append(card)

            link.addEventListener('click', function() {
                localStorage.setItem('nameRegion', link.id)
            })
            return link

        })).then((card) => {


            const div = document.getElementById('container')

            div.replaceChildren(...card)
        })

}
loadCard()
}

//Função para carregar a pagina DetailRegions
export function detailRegion(){
    const pokeApi = {}


function convertPokeApiDetailToGames(pokeDetail) {
    const card = {}
    if (pokeDetail.main_region.name == localStorage.getItem('nameRegion')) {
        card.region = pokeDetail.main_region.name
        card.img = `../images/regioes/${pokeDetail.main_region.name}.png`
        if (pokeDetail.version_groups.length != 1) {
            card.games = `Game: ${pokeDetail.version_groups[0].name}`
        }
        card.games = `Games: ${pokeDetail.version_groups[0].name} , ${pokeDetail.version_groups[1].name}`

        card.pokes = pokeDetail.pokemon_species.map(element => {
            return element.name
        })

        return card
    } else
        return ''

}
pokeApi.getGames = (region) => {

    return fetch(region.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGames)


}

pokeApi.getGroupGames = async() => {

    const url = `https://pokeapi.co/api/v2/generation/`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((generations) => generations.map(pokeApi.getGames))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}



const loadCard = function() {

    pokeApi.getGroupGames()
        .then((regioes = []) => regioes.map((regiao) => {
            if (regiao != false) {

                const container = document.createElement('div')
                container.classList.add('container')

                const detail = document.createElement('div')
                detail.classList.add('detail')

                const region = document.createElement('div')
                region.classList.add('region')

                const title = document.createElement('h1')
                title.textContent = regiao.region

                const description = document.createElement('span')
                description.classList.add('description')
                description.textContent = regiao.games.toUpperCase()

                const img = document.createElement('img')
                img.src = regiao.img
                img.classList.add('region-image')

                region.append(title)
                detail.append(region, description, img)

                const divPokes = document.createElement('div')
                divPokes.classList.add('pokes')

                const titlePokes = document.createElement('span')
                titlePokes.classList.add('title')
                titlePokes.textContent = 'Pokes'

                const pokedexRegions = document.createElement('div')
                pokedexRegions.classList.add('pokedex-regions')

                const pokes = regiao.pokes.map(element => {
                    console.log(element);

                    const button = document.createElement('button-pokemon')
                    button.setAttribute('nome', element)
                    return button
                })

                pokedexRegions.replaceChildren(...pokes)
                divPokes.append(titlePokes, pokedexRegions)

                container.append(detail, divPokes)

                console.log(pokedexRegions);

                return container
            } else
                return ''

        })).then((card) => {
            const div = document.getElementById('container')

            div.replaceChildren(...card)

        })

}
loadCard()
}
