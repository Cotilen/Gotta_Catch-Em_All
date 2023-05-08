"use strict";

import './app.js'
import { appPokedex, detailPokes, detailRegion, games, regions } from './app.js'


const routes = {
    "/Gotta_Catch-Em_All/": "/Gotta_Catch-Em_All/pages/home.html",
    "/Gotta_Catch-Em_All/pokedex": "/Gotta_Catch-Em_All/pages/pokedex.html",
    "/Gotta_Catch-Em_All/games": "/Gotta_Catch-Em_All/pages/games.html",
    "/Gotta_Catch-Em_All/regions": "/Gotta_Catch-Em_All/pages/regions.html",
    "/Gotta_Catch-Em_All/detailRegions": "/Gotta_Catch-Em_All/pages/detailRegions.html",
    "/Gotta_Catch-Em_All/detailPokes": "/Gotta_Catch-Em_All/pages/detailPokes.html"
}

export const route = async() => {
    window.event.preventDefault();
    window.history.pushState({}, "", window.event.target.href);
    console.log(window.event.target)
    const path = window.location.pathname;
    const route = routes[path];
    console.log(path);

    const response = await fetch(route);
    const html = await response.text();

    document.getElementById("root").innerHTML = html;

    if (path == '/Gotta_Catch-Em_All/pokedex') {
        console.log('pokedex');
        appPokedex()
    } else if (path == '/') {
        console.log('home');
    } else if (route == '/Gotta_Catch-Em_All/pages/games.html') {
        console.log('Games');
        games()
    } else if (path == '/Gotta_Catch-Em_All/regions') {
        // console.log('Regions');
        console.log(localStorage.getItem('nameRegion'))
        regions()
    } else if (path == '/Gotta_Catch-Em_All/detailRegions') {
        console.log("Detalhe Região");
        console.log(localStorage.getItem('nameRegion'));
        detailRegion()
    } else if (path == '/Gotta_Catch-Em_All/detailPokes') {
        console.log('Pokes');
        detailPokes()
    }

};



window.route = route;