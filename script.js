const trainer = {
  name: "Kobe D. Estabalaya",
  age: 20,
  pokemon: [],
  friends: {
    close: ["Vincent Escobar", "Zachary David", "Lance Tionson", "Ejie Ranchez", "Maam Thonie"],
    acquaintances: ["Ash", "May", "Dawn"],
  },
  talk: function() {
    console.log("Pikachu! I choose you!");
  },
};

function Pokemon(name, level) {
  this.name = name;
  this.level = level;
  this.health = level * 100;
  this.attack = level * 10;
}

const pokemon1 = new Pokemon("Pikachu", 5);
const pokemon2 = new Pokemon("Charmander", 3);

trainer.pokemon.push(pokemon1, pokemon2);

const trainerInfo = `Name: ${trainer.name}<br>
                     Age: ${trainer.age}<br>
                     Pokemon: ${trainer.pokemon.map(p => p.name).join(", ")}<br>
                     Friends: Close - ${trainer.friends.close.join(", ")}, Acquaintances - ${trainer.friends.acquaintances.join(", ")}`;
document.getElementById("trainer-info").innerHTML = trainerInfo;

displayPokemonInfo(pokemon1);

Pokemon.prototype.tackle = function(targetPokemon) {
  targetPokemon.health -= this.attack;
  console.log(`${this.name} used Tackle on ${targetPokemon.name}. ${targetPokemon.name}'s health is now ${targetPokemon.health}.`);
  if (targetPokemon.health <= 0) {
    targetPokemon.faint();
  }
};

Pokemon.prototype.faint = function() {
  console.log(`${this.name} has fainted.`);
};

document.getElementById("talk-btn").addEventListener("click", function() {
  trainer.talk();
});

document.getElementById("tackle-btn").addEventListener("click", function() {
  pokemon1.tackle(pokemon2);
  displayPokemonInfo(pokemon2);
});

function displayPokemonInfo(pokemon) {
  const pokemonInfo = `Name: ${pokemon.name}<br>
                       Level: ${pokemon.level}<br>
                       Health: ${pokemon.health}<br>
                       Attack: ${pokemon.attack}`;
  document.getElementById("pokemon-info").innerHTML = pokemonInfo;
}
