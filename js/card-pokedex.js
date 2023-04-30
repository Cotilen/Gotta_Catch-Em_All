"use strict"

class card extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.nome = 'Pokemon'
        this.number = '#000'
        this.type = 'type'
        this.type_2 = 'type'
        this.img = null
    }

    static get observedAttributes() {
        return ['nome', 'number', 'type', 'type_2', 'img']

    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles() {
        const css = document.createElement('style')
        css.textContent = `

        
        .normal {
            background-color: #A8A77A;
        }
        
        .fire {
            background-color: #EE8130;
        }
        
        .water {
            background-color: #6390F0;
        }
        
        .electric {
            background-color: #F7D02C;
        }
        
        .grass {
            background-color: #7AC74C;
        }
        
        .ice {
            background-color: #96D9D6;
        }
        
        .fighting {
            background-color: #C22E28;
        }
        
        .poison {
            background-color: #A33EA1;
        }
        
        .ground {
            background-color: #E2BF65;
        }
        
        .flying {
            background-color: #A98FF3;
        }
        
        .psychic {
            background-color: #F95587;
        }
        
        .bug {
            background-color: #A6B91A;
        }
        
        .rock {
            background-color: #B6A136;
        }
        
        .ghost {
            background-color: #735797;
        }
        
        .dragon {
            background-color: #6F35FC;
        }
        
        .dark {
            background-color: #705746;
        }
        
        .steel {
            background-color: #B7B7CE;
        }
        
        .fairy {
            background-color: #D685AD;
        }
        
        .pokemon {
            display: flex;
            flex-direction: column;
            margin: .5rem;
            width: 225px;
            height: 125px;
            padding: 1rem;
            border-radius: 1rem;
            background-size: cover;
        }
        
        .pokemon .number {
            color: #000;
            opacity: .3;
            text-align: right;
            font-size: .625rem;
        }
        
        .pokemon .name {
            color: #fff;
            margin-bottom: .25rem;
            text-transform: capitalize;
        }
        
        .pokemon .detail {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        
        .pokemon .detail .types {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        
        .pokemon .detail .types .type  {
            color: #fff;
            padding: .25rem .5rem;
            margin: .25rem 0;
            font-size: .625rem;
            border-radius: 1rem;
            filter: brightness(1.1);
            text-align: center;
        }
        
        .pokemon .detail img {
            width: 100%;
            max-width: 100px;
            height: 70px;
        }

        .pokemon-pokedex{
            width:100px;
            height:70px;
        }
        `

        return css

    }
    component() {
        const card = document.createElement('li')
        card.classList.add('pokemon')
        card.classList.add('grass')

        const nome = document.createElement('span')
        nome.classList.add('name')

        nome.textContent = this.nome
        const number = document.createElement('span')
        number.classList.add('number')
        number.textContent = this.number

        const detail = document.createElement('div')
        detail.classList.add('detail')

        const types = document.createElement('ol')
        types.classList.add('types')

        const type = document.createElement('li')
        type.classList.add('type')
        type.textContent = this.type


        const type_2 = document.createElement('li')
        type_2.classList.add('type')
        type_2.textContent = this.type_2

        const img = document.createElement('img')
        img.classList.add('pokemon-pokedex')
        img.src = this.img

        types.append(type, type_2)
        detail.append(types, img)
        card.append(number, nome, detail)

        return card
    }
}

customElements.define('card-pokemon', card)