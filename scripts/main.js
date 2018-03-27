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
            let newRow = document.createElement("div");
            $(newRow).attr("class", "row");
            let newCol = document.createElement("div");
            $(newCol).attr("class", "col s12");
            $(newRow).append(newCol);
            let cardDiv = document.createElement("div");
            $(cardDiv).attr("id", this.name);
            $(cardDiv).attr("class", "card pokemonCard");
            let imgDiv = document.createElement("div");
            $(imgDiv).attr("class", "card-image pokemonImg");
            $(imgDiv).append("<img src='" + this.imgUrl + "' alt='picture of "+ this.name +"' >");
            $(cardDiv).append(imgDiv);
            let statsDiv = document.createElement("div");
            $(statsDiv).attr("class", "card-content pokemonStats");
            $(statsDiv).append("<span class='card-title'>" + this.name + "</span>");
            let statsBox = document.createElement("p");
            $(statsDiv).append(statsBox);
            $(cardDiv).append(statsDiv);
            let statsUL = document.createElement("ul");
            $(statsBox).append(statsUL);
            $(statsUL).append("<li>types: " + this.types + "</li>");
            $(statsUL).append("<li>height: " + this.height + "m</li>");
            $(statsUL).append("<li>weight: " + this.weight + "kg</li>");
            $(statsUL).append("<li>stats: " + this.stats + "</li>");
            $(statsUL).append("<li>abilities: " + this.abilities + "</li>");
            $(newCol).append(cardDiv);
            $(".main").prepend(newRow);
        }
    }

    class Trainer {

        constructor(trainerName){
            this.trainerName = trainerName;
            this.pokeDirectory = {};
            $(".brand-logo").text(trainerName);
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
        Sasha = new Trainer("Sasha");
        for (let i = 0; i < pokemonNames.length; i++){
            Sasha.add(pokemonNames[i]);
        }
    }
    main();

});
