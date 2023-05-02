"use strict";

import './app.js'
import {pokedex} from './app.js'


const routes = {
  "/": "/pages/home.html",
  "/pokedex": "/pages/pokedex.html"
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
    pokedex()
  } else if (path == '/') {
    console.log('home');
  }

};



window.route = route;