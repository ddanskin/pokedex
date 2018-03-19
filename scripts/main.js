const pokeApi = "http://pokeapi.co/api/v2/";
const mainInfo = "pokemon/";
const imageInfo = "pokemon-form/";

const pokemonNames = ["rockruff", "lillipup", "stufful"];

class Pokemon {
    constructor(name, type, height, weight, hp, attack, defense, abilities) {
        this.name = name;
        this.type = type;
        this.height = height;
        this.weight = weight;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
    }
}

class Pokedex {
    constructor(){
    }

    // returns an array of all Pokemon
    all() {
        return;
    }

    // returns requested Pokemon object
    get(pokemon) {
        return pokemon;
    }
}
