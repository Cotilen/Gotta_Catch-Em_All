"use strict";

import './app.js'
import { appPokedex, detailPokes, detailRegion, games, regions } from './app.js'


const routes = {
    "/": "/pages/home.html",
    "/pokedex": "/pages/pokedex.html",
    "/games": "/pages/games.html",
    "/regions": "/pages/regions.html",
    "/detailRegions": "/pages/detailRegions.html",
    "/detailPokes": "/pages/detailPokes.html"
}

export const route = async() => {
    window.event.preventDefault();
    window.history.pushState({}, "", window.event.target.href);
    console.log(window.event.target)
    const path = window.location.pathname;
    const route = routes[path];
    console.log(path);
    console.log(route);


    const response = await fetch(route);
    const html = await response.text();

    document.getElementById("root").innerHTML = html;

    if (path == '/pokedex') {
        console.log('pokedex');
        appPokedex()
    } else if (path == '/') {
        console.log('home');
    } else if (path == '/games') {
        console.log('Games');
        games()
    } else if (path == '/regions') {
        // console.log('Regions');
        console.log(localStorage.getItem('nameRegion'))
        regions()
    } else if (path == '/detailRegions') {
        console.log("Detalhe Região");
        console.log(localStorage.getItem('nameRegion'));
        detailRegion()
    } else if (path == '/detailPokes') {
        console.log('Pokes');
        detailPokes()
    }

};



window.route = route;