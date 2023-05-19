const myPokemon = new Pokemon("Pikachu", 5);

      const pokemons = [
        new Pokemon("Pikachu", 5),
        new Pokemon("Charmander", 3),
        new Pokemon("Bulbasaur", 4),
        new Pokemon("Squirtle", 7)
      ];

      const trainer = {
        name: "Kobe D. Estabalaya",
        age: 20,
        pokemon: pokemons.slice(0, 3),
        friends: {
          close: ["Vincent Escobar", "Zachary David", "Lance Tionson", "Ejie Ranchez", "Maam Thonie"],
        },

        talk: function() {
          console.log("Pikachu! I choose you!");
        },
      };

      const trainerInfo = `Name: ${trainer.name}<br>
                           Age: ${trainer.age}<br>
                           Pokemon: ${trainer.pokemon.map(p => p.name).join(", ")}<br>
                           Friends: Close Friends - ${trainer.friends.close.join(", ")}`;
      document.getElementById("trainer-info").innerHTML = trainerInfo;

      displayPokemonInfo(myPokemon);

      function Pokemon(name, level) {
        this.name = name;
        this.level = level;
        this.health = level * 100;
        this.attack = level * 10;
      }

      Pokemon.prototype.tackle = function(targetPokemon) {
        targetPokemon.health -= this.attack;
        console.log(`${this.name} used Tackle on ${targetPokemon.name}. ${targetPokemon.name}'s health is now ${targetPokemon.health}.`);
        if (targetPokemon.health <= 0) {
          targetPokemon.faint();
          if (this === myPokemon) {
            this.increaseLevel(targetPokemon.level);
          }
        }
      };

      Pokemon.prototype.faint = function() {
        console.log(`${this.name} has fainted. You won!`);
        this.health = this.level * 100; // Reset the enemy Pokémon's health to its default
        document.getElementById("tackle-btn").disabled = true; // Disable the Tackle button
        document.getElementById("new-battle-btn").style.display = "inline-block";
        document.getElementById("battle-btn").disabled = false; // Enable the Battle button
        document.getElementById("enemy-pokemon-select").disabled = false; // Enable the Pokémon select dropdown
        displayPokemonInfo(myPokemon); // Reset the displayed Pokémon info
      };

      Pokemon.prototype.increaseLevel = function(levelIncrease) {
        this.level += levelIncrease;
        this.attack = this.level * 10;
        this.health = this.level * 100;
        console.log(`${this.name}'s level increased to ${this.level}.`);
        console.log(`${this.name}'s attack increased to ${this.attack}.`);
        console.log(`${this.name}'s health increased to ${this.health}.`);
      };

      function displayPokemonInfo(pokemon) {
        const pokemonInfo = `Name: ${pokemon.name}<br>
                             Level: ${pokemon.level}<br>
                             Health: ${pokemon.health}<br>
                             Attack: ${pokemon.attack}`;
        document.getElementById("pokemon-info").innerHTML = pokemonInfo;
      }

      let enemyPokemon;
      let battleOccurring = 0;

      const tackleHandler = function() {
        myPokemon.tackle(enemyPokemon);
        displayPokemonInfo(enemyPokemon);

        if (enemyPokemon.health <= 0) {
          enemyPokemon.faint();
          console.log(`You defeated ${enemyPokemon.name}!`);
          document.getElementById("new-battle-btn").style.display = "inline-block";
        } else {
          console.log(`${enemyPokemon.name}'s health is now ${enemyPokemon.health}.`);
        }
      };

      const battleHandler = function() {
        if (battleOccurring === 0) {
          battleOccurring = 1;
          document.getElementById("tackle-btn").disabled = false;
          document.getElementById("battle-btn").disabled = true;

          const selectElement = document.getElementById("enemy-pokemon-select");
          const selectedPokemon = selectElement.value;
          enemyPokemon = pokemons.find(pokemon => pokemon.name === selectedPokemon);

          console.log(`${myPokemon.name} is battling ${enemyPokemon.name}.`);
          console.log(`${myPokemon.name} used Tackle on ${enemyPokemon.name}.`);
          displayPokemonInfo(enemyPokemon);
        }
      };

      const newBattleHandler = function() {
        battleOccurring = 0;
        document.getElementById("battle-btn").disabled = false;
        document.getElementById("new-battle-btn").style.display = "none";
        document.getElementById("enemy-pokemon-select").disabled = false;
        document.getElementById("tackle-btn").disabled = true;
        displayPokemonInfo(myPokemon);
      };

      document.getElementById("tackle-btn").addEventListener("click", tackleHandler);
      document.getElementById("battle-btn").addEventListener("click", battleHandler);
      document.getElementById("new-battle-btn").addEventListener("click", newBattleHandler);
      document.getElementById("talk-btn").addEventListener("click", trainer.talk);

      newBattleHandler();