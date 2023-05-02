"use strict";

import './app.js'
import {appPokedex, detailRegion, games, regions} from './app.js'


const routes = {
  "/": "/pages/home.html",
  "/pokedex": "/pages/pokedex.html",
  "/games": "/pages/games.html",
  "/regions": "/pages/regions.html",
  "/detailRegion": "/pages/detailRegions.html" 
}

const route = async () => {
  window.event.preventDefault();
  window.history.pushState({}, "", window.event.target.href);
  const path = window.location.pathname;
  const route = routes[path];

  const response = await fetch(route);
  const html = await response.text();

  document.getElementById("root").innerHTML = html;

  if (path == '/pokedex') {
    console.log('pokedex');
    appPokedex()
  } else if (path == '/') {
    console.log('home');
  } else if(path == '/games'){
    console.log('Games');
    games()
  }else if (path == '/regions'){
    console.log('Regions');
    regions()
  }else if( path == '/detailRegion'){
    console.log("Detalhe Região");
    detailRegion()
  }

};



window.route = route;