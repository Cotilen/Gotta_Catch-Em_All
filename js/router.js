'use strict'

const routes = {
    '/home': '/pages/home.js',
    '/pokedex': '/pages/pokedex.js',
    '/games': '/pages/games.html',
    '/regions': '/pages/regions.html'
}

const route = () => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)
    handleLocation()
}

const handleLocation = async() => {

    const path = window.location.pathname
    const route = await routes[path]
    const { page } = await
    import (route);

    console.log(page())

    document.getElementById('root').replaceChildren(page())
}

window.onpopstate = handleLocation
window.route = route

handleLocation()