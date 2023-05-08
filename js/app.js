'use strict'

import { route } from './router.js'

function menu() {

    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('menu--open');
    });
}

menu()

//Função para carregar a pagina pokedex
export function appPokedex() {

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

                const link = document.createElement('a')
                link.href = "/Gotta_Catch-Em_All/detailPokes"
                link.setAttribute('onclick', 'route()')

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

                link.addEventListener('click', function() {
                    localStorage.setItem('IdPoke', pokedex.id)

                })

                link.append(pokedex)
                return link

            })).then((card) => {



                const div = document.getElementById('container-pokedex')

                div.replaceChildren(...card)
            })

    }
    pokedex()
}

//Função para carregar a pagina Games
export function games() {
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

                div.setAttribute('img', './images/pokebola.png')
                div.setAttribute('name', `${nameGame}  ${nameGame2}`)
                div.setAttribute('game', group.name)
                if (group.name2 != undefined)
                    div.setAttribute('game_2', group.name2)


                return div

            })).then((card) => {

                const div = document.getElementById('container-games')

                div.replaceChildren(...card)

            })

    }
    loadCard()
}

//Função para carregar a pagina Regions
export function regions() {
    const pokeApi = {}


    function convertPokeApiDetailToGames(pokeDetail) {
        const card = {}

        card.id = pokeDetail.id
        card.generation = pokeDetail.name
        card.region = pokeDetail.main_region.name
        card.img = `./images/regioes/${pokeDetail.main_region.name}.png`

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
                link.href = "/Gotta_Catch-Em_All/detailRegions"
                link.setAttribute('onclick', 'route()')


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


                const div = document.getElementById('container-regions')

                div.replaceChildren(...card)
            })

    }
    loadCard()
}

//Função para carregar a pagina DetailRegions
export function detailRegion() {
    const pokeApi = {}


    function convertPokeApiDetailToGames(pokeDetail) {
        const card = {}
        if (pokeDetail.main_region.name == localStorage.getItem('nameRegion')) {
            card.region = pokeDetail.main_region.name
            card.img = `./images/regioes/${pokeDetail.main_region.name}.png`
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
                const div = document.getElementById('container-detailRegions')

                div.replaceChildren(...card)

            })

    }
    loadCard()
}

export function detailPokes() {
    const createCard = function(poke) {


        const base = document.createElement('div')
        base.classList.add('bar-chart')

        const div_1 = document.createElement('div')
        div_1.textContent = poke.stat.name
        const bar_1 = document.createElement('div')
        bar_1.classList.add('bar')
        bar_1.style = `width:${poke.base_stat}%`
        if (poke.base_stat < 50) {
            bar_1.classList.add('red')
        } else if (poke.base_stat <= 100) {
            bar_1.classList.add('green')
        } else
            bar_1.classList.add('blue')

        console.log(bar_1.style.width);
        const value_1 = document.createElement('span')
        value_1.classList.add('value')
        value_1.textContent = poke.base_stat

        bar_1.append(value_1)

        base.append(div_1, bar_1)

        return base
    }
    const createCarousel = function(carousel) {

        const carrosel = document.createElement('div')
        carrosel.classList.add('carrosel')

        const container = document.createElement('div')
        container.classList.add('container-pokes')
        container.id = 'img'

        const imgFront = document.createElement('img')
        imgFront.src = carousel.front_default

        const imgFrontShiny = document.createElement('img')
        imgFrontShiny.src = carousel.front_shiny

        const imgFrontDream = document.createElement('img')
        imgFrontDream.src = carousel.other.dream_world.front_default

        const imgFrontHome = document.createElement('img')
        imgFrontHome.src = carousel.other.home.front_default

        const imgFrontHomeShiny = document.createElement('img')
        imgFrontHomeShiny.src = carousel.other.home.front_shiny

        container.append(imgFront, imgFrontDream, imgFrontHome, imgFrontHomeShiny, imgFrontShiny)

        carrosel.append(container)

        return carrosel
    }



    async function createImage(url) {
        console.log(url);

        let response = await fetch(url)
        let data = await response.json()

        return data.sprites.front_default

    }


    const loadCard = async function() {

        let id = localStorage.getItem('IdPoke')
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`

        let response = await fetch(url)
        let data = await response.json()

        let stats = data.stats.map(createCard)

        //Função para criar a linha evolutória
        const createEvolution = async function(evolucao) {

            let url = evolucao

            let response = await fetch(url)
            let data_1 = await response.json()

            let urlImage = (data_1.chain.species.url).replace('-species/', '/')


            const evolution = document.createElement('div')
            evolution.classList.add('evolution')

            const span = document.createElement('h1')
            span.textContent = "Evolution Chain"

            const divEvolucoes = document.createElement('div')
            divEvolucoes.classList.add('evolucoes')

            console.log(data.types[0].type.name);
            const div_1 = document.createElement('div')
            div_1.classList.add(`${data.types[0].type.name}`)
            const div_2 = document.createElement('div')
            div_2.classList.add(`${data.types[0].type.name}`)
            const div_3 = document.createElement('div')
            div_3.classList.add(`${data.types[0].type.name}`)


            const poke_1 = document.createElement('div')
            poke_1.classList.add('poke')


            const pokeName_1 = document.createElement('h2')
            pokeName_1.textContent = data_1.chain.species.name

            const img_1 = document.createElement('img')
            img_1.src = await createImage(urlImage)

            const nivel_1 = document.createElement('div')
            nivel_1.classList.add('seta')

            if ((data_1.chain.evolves_to).length == 0) {
                div_1.append(img_1)
                poke_1.append(pokeName_1, div_1)
                divEvolucoes.append(poke_1)

                evolution.append(span, divEvolucoes)

                return evolution
            }

            if ((data_1.chain.evolves_to[0]).length == 0) {

                const up_1 = document.createElement('span')
                up_1.textContent = `Nv:${data_1.chain.evolves_to[0].evolution_details[0].min_level}+`
                up_1.classList.add('seta')

                div_1.append(img_1)
                poke_1.append(pokeName_1, div_1)
                divEvolucoes.append(poke_1)

                evolution.append(span, divEvolucoes)

                return evolution


            } else {

                const up_1 = document.createElement('span')
                up_1.textContent = `Nv:${data_1.chain.evolves_to[0].evolution_details[0].min_level}+`
                up_1.classList.add('seta')

                const poke_2 = document.createElement('div')
                poke_2.classList.add('poke')

                const pokeName_2 = document.createElement('h2')
                pokeName_2.textContent = data_1.chain.evolves_to[0].species.name

                //Mudando a url para pegar a imagem de outro pokemon
                urlImage = (data_1.chain.evolves_to[0].species.url).replace('-species/', '/')

                const img_2 = document.createElement('img')
                img_2.src = await createImage(urlImage)


                if ((data_1.chain.evolves_to[0].evolves_to).length == 0) {
                    div_1.append(img_1)
                    div_2.append(img_2)
                    poke_1.append(pokeName_1, div_1)
                    poke_2.append(pokeName_2, div_2)
                    divEvolucoes.append(poke_1, up_1, poke_2, )

                    evolution.append(span, divEvolucoes)

                    return evolution
                } else {
                    const up_2 = document.createElement('span')
                    up_2.textContent = `Nv:${data_1.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}+`
                    up_2.classList.add('seta')

                    const poke_3 = document.createElement('div')
                    poke_3.classList.add('poke')

                    const pokeName_3 = document.createElement('h2')
                    pokeName_3.textContent = data_1.chain.evolves_to[0].evolves_to[0].species.name

                    //Mudando a url para pegar a imagem de outro pokemon
                    urlImage = (data_1.chain.evolves_to[0].evolves_to[0].species.url).replace('-species/', '/')

                    const img_3 = document.createElement('img')
                    img_3.src = await createImage(urlImage)

                    div_1.append(img_1)
                    div_2.append(img_2)
                    div_3.append(img_3)
                    poke_1.append(pokeName_1, div_1)
                    poke_2.append(pokeName_2, div_2)
                    poke_3.append(pokeName_3, div_3)
                    divEvolucoes.append(poke_1, up_1, poke_2, up_2, poke_3)

                    evolution.append(span, divEvolucoes)

                    return evolution

                }

            }

        }

        //Função para criar o card de breeding
        const createAbout = async function(infos) {

            let url = infos.species.url
            let response = await fetch(url)
            let data_2 = await response.json()

            let height = (infos.height / 10)
            let weight = (infos.weight / 100)
            let abilities = ''

            console.log(infos.abilities);
            if ((infos.abilities).length == 1) {
                abilities = `${infos.abilities[0].ability.name}`

            } else {
                abilities = `${infos.abilities[0].ability.name} , ${infos.abilities[1].ability.name}`
            }

            const card = document.createElement('div')
            card.classList.add('card')
            card.classList.add(`${data.types[0].type.name}`)


            const about = document.createElement('span')
            about.textContent = "About"
            const breeding = document.createElement('span')
            breeding.textContent = 'Breeding'

            const divAbout = document.createElement('div')
            divAbout.classList.add('about')

            const divBreeding = document.createElement('div')
            divBreeding.classList.add('breeding')

            const namesAbout = document.createElement('ol')
            namesAbout.classList.add('names')

            const infosAbout = document.createElement('ol')
            infosAbout.classList.add('infos')

            const heightName = document.createElement('li')
            heightName.textContent = 'Height:'
            heightName.classList.add('names-about')

            const weightName = document.createElement('li')
            weightName.textContent = 'Weight:'
            weightName.classList.add('names-about')

            const abilitiesName = document.createElement('li')
            abilitiesName.textContent = 'Abilities:'
            abilitiesName.classList.add('names-about')

            const heightValue = document.createElement('li')
            heightValue.textContent = `${height}m`
            heightValue.classList.add('infos-about')

            const weightValue = document.createElement('li')
            weightValue.textContent = `${weight}kg`
            weightValue.classList.add('infos-about')

            const abilitiesValue = document.createElement('li')
            abilitiesValue.textContent = abilities
            abilitiesValue.classList.add('infos-about')

            const namesBreed = document.createElement('ol')
            namesBreed.classList.add('names')

            const infosBreed = document.createElement('ol')
            infosBreed.classList.add('infos')

            const eggName = document.createElement('li')
            eggName.textContent = 'Egg Groups:'
            eggName.classList.add('names-about')

            const eggValue = document.createElement('li')
            eggValue.textContent = `${data_2.egg_groups[0].name}`
            eggValue.classList.add('infos-about')

            if ((data_2.egg_groups).length == 1) {

                namesAbout.append(heightName, weightName, abilitiesName)
                infosAbout.append(heightValue, weightValue, abilitiesValue)

                namesBreed.append(eggName)
                infosBreed.append(eggValue)

                divAbout.append(namesAbout, infosAbout)
                divBreeding.append(namesBreed, infosBreed)

                card.append(about, divAbout, breeding, divBreeding)

                return card

            } else {
                const eggCircleName = document.createElement('li')
                eggCircleName.textContent = 'Egg Circle:'
                eggCircleName.classList.add('names-about')


                const eggCircleValue = document.createElement('li')
                eggCircleValue.textContent = `${data_2.egg_groups[1].name}`
                eggCircleValue.classList.add('infos-about')

                namesAbout.append(heightName, weightName, abilitiesName)
                infosAbout.append(heightValue, weightValue, abilitiesValue)

                namesBreed.append(eggName, eggCircleName)
                infosBreed.append(eggValue, eggCircleValue)

                divAbout.append(namesAbout, infosAbout)
                divBreeding.append(namesBreed, infosBreed)

                card.append(about, divAbout, breeding, divBreeding)

                return card
            }



        }

        // Função que criar o card de status
        const cardStatus = function() {
            const card = document.createElement('div')
            card.classList.add('card')
            card.classList.add(`${data.types[0].type.name}`)


            const status = document.createElement('div')
            status.classList.add('stats')

            const title = document.createElement('span')
            title.textContent = 'Base Status'

            status.append(title, ...stats)

            card.append(status)

            return card

        }

        //Função para criar o carrosel
        function carousel_img() {
            const imgs = document.getElementById('img')
            const img = document.querySelectorAll('#img img')

            let idx = 0

            function carrosel() {
                idx++

                if (idx > img.length - 1) {
                    idx = 0
                }

                imgs.style.transform = `translateX(${-idx*375}px)`
            }
            setInterval(carrosel, 3000)
        }

        let carousel = createCarousel(data.sprites)

        let about = await createAbout(data)

        //Fetch para criar a linha evolutoria

        let url_evolution = data.species.url

        let response_evolution = await fetch(url_evolution)
        let data_evolution = await response_evolution.json()

        let evolution = await createEvolution(data_evolution.evolution_chain.url)

        const container = document.getElementById('container-detailPokes')

        container.append(cardStatus(), carousel, about, evolution)


        carousel_img()

    }
    loadCard()
}