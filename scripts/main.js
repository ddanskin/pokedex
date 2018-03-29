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

        // creates display of character cards
        render(){
            // create new carousel card
            let newCardA = document.createElement("div");
            $(newCardA).attr("class", "carousel-item");
            $(".carousel").append(newCardA);
            let cardDiv = document.createElement("div");
            $(cardDiv).attr("id", this.name);
            $(cardDiv).attr("class", "card horizontal");
            
            // add image to card
            let imgDiv = document.createElement("div");
            $(imgDiv).attr("class", "card-image pokemonImg");
            $(imgDiv).append("<img class='activator' src='" + this.imgUrl + "' alt='picture of "+ this.name +"' >");
            $(cardDiv).append(imgDiv);
            
            // add character name and info to card
            let statsDiv = document.createElement("div");
            $(statsDiv).attr("class", "card-content pokemonStats");
            $(statsDiv).append("<span class='card-title activator'>" + this.name + "</span>");
            let statsBox = document.createElement("p");
            $(statsDiv).append(statsBox);
            $(cardDiv).append(statsDiv);
            let detailsUl = document.createElement("ul");
            $(statsBox).append(detailsUl);
            $(detailsUl).append("<li>types: " + this.types + "</li>");
            $(detailsUl).append("<li>height: " + this.height + "m</li>");
            $(detailsUl).append("<li>weight: " + this.weight + "kg</li>");
            
            // add hidden stats info card that will pop up on card click
            let statsShow = document.createElement("div");
            $(statsShow).attr("class", "card-reveal pokemonStats");
            $(statsShow).append("<span class='card-title'>" + this.name + "<i class='material-icons right'>close</i></span>");
            
            // add unordered list of character stats and abilities to pop up card
            let statsUL = document.createElement("ul");
            $(statsShow).append(statsUL);
            $.each(this.stats, function(key, value) {
                $(statsUL).append("<li>" + key + ": " + value + "</li>");
            });
            $(statsShow).append("<p>abilities: " + this.abilities + "</p>");
            $(cardDiv).append(statsShow);
            $(newCardA).append(cardDiv);
            
            // start carousel
            $('.carousel').carousel();
        }
    }

    class Trainer {

        constructor(trainerName){
            this.trainerName = trainerName;
            this.pokeDirectory = {};
            $(".brand-logo").text("Trainer: "+ trainerName);
        }

        // add new Pokemon to pokeDirectory and display them on screen
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

                // gets ajax data, then uses it to create new Pokemon
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
    
    // creates new pokedex initialized with trainer name Sasha and adds preset Pokemon 
    function main(){
        Sasha = new Trainer("Sasha");
        for (let i = 0; i < pokemonNames.length; i++){
            Sasha.add(pokemonNames[i]);
        }
    }

    // when button is pressed, main function is called
    $("#mainButton").click(function(){
        main();
        $("#mainButton").removeClass("pulse");
    });

});
