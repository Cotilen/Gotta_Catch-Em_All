import { fetchData } from "../js/fetch.js";

const pokes = await fetchData()
export function page(pokemon) {

    let name = pokemon.name
    console.log(name);

    const card = document.createElement('card-pokemon')

    card.setAttribute('nome', name)
    card.setAttribute('type', 'fyre')
    card.setAttribute('number', '#005')

    return card
}

const loadCards = async() => {
    const container = document.createElement('div')

    const pokemons = pokes.results.map(page)

    container.append(...pokemons)
}

loadCards()