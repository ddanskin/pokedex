const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
//const pokeApi = "https://pokeapi.salestock.net/api/v2/pokemon/";
const pokemonNames = ["rockruff", "lillipup", "stufful"];
let pokedexOn = false;
let newTrainer = "";
let trainer;
$(document).ready(function() { 
    $('.modal').modal();    
    // create new Pokemon object
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
            $(cardDiv).attr("class", "card");
            
            // add image to card
            let imgDiv = document.createElement("div");
            $(imgDiv).attr("class", "card-image");
            $(imgDiv).append("<img class='activator' src='" + this.imgUrl + "' alt='picture of "+ this.name +"' title='click to see fighting stats' >");
            $(cardDiv).append(imgDiv);
            
            // add character name and info to card
            let detailsDiv = document.createElement("div");
            $(detailsDiv).attr("class", "card-content");
            $(detailsDiv).append("<span class='card-title activator'>" + this.name + "</span>");
            $(cardDiv).append(detailsDiv);
            let detailsUl = document.createElement("ul");
            $(detailsDiv).append(detailsUl);
            $(detailsUl).append("<li>types: " + this.types + "</li>");
            $(detailsUl).append("<li>height: " + this.height + "m</li>");
            $(detailsUl).append("<li>weight: " + this.weight + "kg</li>");
            $(detailsUl).append("<li><p>abilities: " + this.abilities + "</p></li>");
            
            // add hidden stats info card that will pop up on card click
            let statsShow = document.createElement("div");
            $(statsShow).attr("class", "card-reveal flow-text");
            $(statsShow).append("<span class='card-title'>" + this.name + "<i class='material-icons right'>x</i></span>");
            
            // add unordered list of character stats to pop up card
            let statsUL = document.createElement("table");
            $(statsShow).append(statsUL);
            $.each(this.stats, function(key, value) {
                $(statsUL).append("<tr><td>" + key + "</td><td><meter min='0' max='100' low='25' high='75' optimum='50' value='" + value + "'></meter></td></tr>");
            });
            $(cardDiv).append(statsShow);
            $(newCardA).append(cardDiv);
            
            // start carousel
            $('.carousel').carousel();
        }
    }

    // create trainer object with name given and initialize with empty pokeDirectory
    class Trainer {

        constructor(trainerName){
            this.trainerName = trainerName;
            this.pokeDirectory = {};
            $("#trainerName").text(trainerName);
        }
        
        // returns an array of all Pokemon
        all() {
            console.log(Object.values(this.pokeDirectory));
        }

        // returns requested Pokemon object
        get(pokemon) {
            return this.pokeDirectory[pokemon];
        }

        // add new Pokemon to pokeDirectory and display them on screen
        add(name) {
            let self = this;
            if(!this.pokeDirectory.hasOwnProperty(name)) {
                $(".preloader-wrapper").addClass("active");
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
                    $(".preloader-wrapper").removeClass("active");
                    return self.pokeDirectory;
                }). then(function () {
                    $("#pokemonCount").text("You've caught: " + Object.keys(self.pokeDirectory).length + " Pokemon!");
                });
            }
        }

    }



    // creates new pokedex initialized with trainer name Sasha and adds preset Pokemon 
    function main(){
        trainer = new Trainer(newTrainer);
        for (let i = 0; i < pokemonNames.length; i++){
            trainer.add(pokemonNames[i]);
        }
    }

    // when button is pressed, main function is called
    $("#submitName").click(function(){
        if (!pokedexOn) {
            newTrainer = $("#userName").val();
            main();
            $("#startButton").removeClass("pulse");
            pokedexOn = true;
        }
    });

});

