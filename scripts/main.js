$(document).ready(function() {

    const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

    const pokemonNames = ["rockruff", "lillipup", "stufful"];

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
            $(characterDiv).appen
            dChild("<h2>" + this.name + "</h2>");
            $(characterDiv).appendChild("<p>types:" + this.types + "</p>");
            $(characterDiv).appendChild("<p>height:" + this.height + "</p>");
            $(characterDiv).appendChild("<p>weight:" + this.weight + "</p>");
            $(characterDiv).appendChild("<p>imgUrl:" + this.imgUrl + "</p>");
            $(characterDiv).appendChild("<p>stats:" + this.stats + "</p>");
            $("#container").appendChild(characterDiv);
        }
    }

    class Pokedex {

        constructor(){
            this.pokeDirectory = {};
        }

        add(name) {
            var t = this;
            if(!this.pokeDirectory.hasOwnProperty(name)) {
                let apiUrl = pokeApi + name + '/';
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: apiUrl,
                    success: function(data) {
                        
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
                    },
                    error: function(e) {
                        console.log(e);
                    } 
                }).done(t.pokeDirectory[name] = new Pokemon(name, typesList, height, weight, imgUrl, statsList, abilitiesList));
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
        let myPokedex = new Pokedex();
        for (let i = 0; i < pokemonNames.length; i++){
            myPokedex.add(pokemonNames[i]);
        }

        console.log(myPokedex.get(pokemonNames[0]));
    }
    
    main();
});
