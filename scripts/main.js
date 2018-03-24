$(document).ready(function() { 
    const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

    const pokemonNames = ["rockruff", "lillipup", "stufful"];
    var Sasha;

    class Pokemon {
        constructor(name, types, height, weight, imgUrl, stats, abilities) {
            this.name = name;
            this.types = types;
            this.height = height;
            this.weight = weight;
            this.imgUrl = imgUrl;
            this.stats = stats;
            this.abilities = abilities;
        }

        render(){
            let characterDiv = document.createElement("div");
            $(characterDiv).append("<h2>" + this.name + "</h2>");
            $(characterDiv).append("<p>types: " + this.types + "</p>");
            $(characterDiv).append("<p>height: " + this.height + "</p>");
            $(characterDiv).append("<p>weight: " + this.weight + "</p>");
            $(characterDiv).append("<img src='" + this.imgUrl + "' alt='picture of "+ this.name +"' >");
            $(characterDiv).append("<p>stats: " + this.stats + "</p>");
            $(characterDiv).append("<p>abilities: " + this.abilities + "</p>");
            $("#container").append(characterDiv);
        }
    }

    class Pokedex {

        constructor(){
            this.pokeDirectory = {};
        }

        add(name) {
            let self = this;
            if(!this.pokeDirectory.hasOwnProperty(name)) {
                let newPokemon;
                let apiUrl = pokeApi + name + '/';
                let getData = (function(){
                    return $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: apiUrl,
                        success: function(data) {
                            return data
                        },
                        error: function(e) {
                            console.log(e);
                        } 
                    });
                });
                getData().then(function (data){
                    let pokemonName = data.name;
                    let height = data.height;
                    let weight = data.weight;
                    let imgUrl = data.sprites.front_default;
                    let statsList = {};
                    let abilitiesList = []; 
                    let typesList = []; 

                    for (let i = 0; i < data.stats.length; i++) {
                        statsList[data.stats[i].stat.name] = data.stats[i].base_stat;
                    }
                    for (let j = 0; j < data.abilities.length; j++) {
                        abilitiesList.push(data.abilities[j].ability.name);
                    }

                    for (let k = 0; k < data.types.length; k++) {
                        typesList.push(data.types[k].type.name);
                    }
                    newPokemon = new Pokemon(pokemonName, typesList, height, weight, imgUrl, statsList, abilitiesList); 
                    self.pokeDirectory[pokemonName] = newPokemon;
                    self.pokeDirectory[pokemonName].render();
                });

            }
        }

        // returns an array of all Pokemon
        all() {
            return Object.keys(this.pokeDirectory);
        }

        // returns requested Pokemon object
        get(pokemon) {
            return this.pokeDirectory[pokemon];
        }
    }
    
    function main(){
        Sasha = new Pokedex();
        for (let i = 0; i < pokemonNames.length; i++){
            Sasha.add(pokemonNames[i]);
        }
    }
    main();

});
