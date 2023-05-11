let trainer = {
  name: "Ash Ketchum",
  age: 10,
  pokemon: [],
  friends: {
    brock: ["Pewter City", "Onix"],
    misty: ["Cerulean City", "Starmie"]
  },
  talk: function() {
    console.log("Pikachu! I choose you!");
  }
};

console.log(trainer.name);
console.log(trainer.friends.brock[0]);

trainer.talk();

function Pokemon(name, level) {
  this.name = name;
  this.level = level;
  this.health = level * 10;
  this.attack = level * 5;

  this.tackle = function(targetPokemon) {
    targetPokemon.health -= this.attack;
    if (targetPokemon.health <= 0) {
      this.faint(targetPokemon);
    }
  };

  this.faint = function(targetPokemon) {
    console.log(`${targetPokemon.name} has fainted!`);
  };
}

let pikachu = new Pokemon("Pikachu", 5);
let charmander = new Pokemon("Charmander", 4);
let squirtle = new Pokemon("Squirtle", 3);

pikachu.tackle(charmander);
console.log(charmander.health);
