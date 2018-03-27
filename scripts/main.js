$(document).ready(function() { 
    const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

    const pokemonNames = ["rockruff", "lillipup", "stufful"];
    var Sasha;

    class Pokemon {
        constructor(name, types, height, weight, imgUrl, stats, abilities) {
            this.name = name;
            this.types = types;
            this.height = height/10;
            this.weight = weight/10;
            this.imgUrl = imgUrl;
            this.stats = stats;
            this.abilities = abilities;
        }

        render(){
            let characterDiv = document.createElement("div");
            $(characterDiv).attr("id", this.name);
            $(characterDiv).attr("class", "card pokemonCard");
            let imgDiv = document.createElement("div");
            $(imgDiv).attr("class", "card-image pokemonImg");
            $(imgDiv).append("<img src='" + this.imgUrl + "' alt='picture of "+ this.name +"' >");
            $(characterDiv).append(imgDiv);
            let statsDiv = document.createElement("div");
            $(statsDiv).attr("class", "card-content pokemonStats");
            $(statsDiv).append("<span class='card-title'>" + this.name + "</span>");
            let statsBox = document.createElement("p");
            $(statsDiv).append(statsBox);
            $(characterDiv).append(statsDiv);
            let statsUL = document.createElement("ul");
            $(statsBox).append(statsUL);
            $(statsUL).append("<li>types: " + this.types + "</li>");
            $(statsUL).append("<li>height: " + this.height + "m</li>");
            $(statsUL).append("<li>weight: " + this.weight + "kg</li>");
            $(statsUL).append("<li>stats: " + this.stats + "</li>");
            $(statsUL).append("<li>abilities: " + this.abilities + "</li>");
            $(".container").append(characterDiv);
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
