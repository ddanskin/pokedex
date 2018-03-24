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
            /*
            let characterDiv = document.createElement("div");
            $(characterDiv).appendChild("<h2>" + this.name + "</h2>");
            $(characterDiv).appendChild("<p>types:" + this.types + "</p>");
            $(characterDiv).appendChild("<p>height:" + this.height + "</p>");
            $(characterDiv).appendChild("<p>weight:" + this.weight + "</p>");
            $(characterDiv).appendChild("<p>imgUrl:" + this.imgUrl + "</p>");
            $(characterDiv).appendChild("<p>stats:" + this.stats + "</p>");
            $("#container").appendChild(characterDiv);*/

            console.log(this.name);
            console.log(this.types);
            console.log(this.height);
            console.log(this.weight);
            console.log(this.imgUrl);
            console.log(this.stats);
            console.log(this.abilities);
        }
    }

    class Pokedex {

        constructor(){
            this.pokeDirectory = {};
        }

        add(name) {
            let t = this;
            if(!this.pokeDirectory.hasOwnProperty(name)) {
            console.log("going to add Pokemon: " + name);
                let apiUrl = pokeApi + name + '/';
                let getData = (function(){
                    return $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: apiUrl,
                        success: function(data) {
                            console.log("current info on Pokemon: " + name, data);
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
                            return new Pokemon(name, typesList, height, weight, imgUrl, statsList, abilitiesList) 
                        },
                        error: function(e) {
                            console.log(e);
                        } 
                    });
                });
                getData();
                // $.when(function (data){
                //     t.pokeDirectory[name] = data;
                // });
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
            console.log("current Pokemon is: " + pokemonNames[i]);
            Sasha.add(pokemonNames[i]);
        }

    }
    
    main();

});
