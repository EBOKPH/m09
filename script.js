// Trainer object
var trainer = {
  name: "Ash Ketchum",
  age: 10,
  pokemon: [],
  friends: {
    Brock: ["Pikachu", "Onix"],
    Misty: ["Staryu", "Starmie"]
  },
  talk: function() {
    console.log("Pikachu! I choose you!");
  }
};

// Pokemon constructor
function Pokemon(name, level) {
  this.name = name;
  this.level = level;
  this.health = level * 10;
  this.attack = level * 2;
  this.tackle = function(target) {
    target.health -= this.attack;
    if (target.health <= 0) {
      target.faint();
    }
  };
  this.faint = function() {
    console.log(this.name + " has fainted.");
  };
}

// Instantiate Pokemon objects
var pikachu = new Pokemon("Pikachu", 5);
var charmander = new Pokemon("Charmander", 3);
var bulbasaur = new Pokemon("Bulbasaur", 4);
trainer.pokemon.push(pikachu, charmander, bulbasaur);

// Update trainer info in HTML
document.getElementById("trainer-name").textContent = trainer.name;
document.getElementById("trainer-age").textContent = trainer.age;
for (var i = 0; i < trainer.pokemon.length; i++) {
  var li = document.createElement("li");
  li.textContent = trainer.pokemon[i].name + " (Level " + trainer.pokemon[i].level + ")";
  document.getElementById("trainer-pokemon").appendChild(li);
}
for (var friend in trainer.friends) {
  var li = document.createElement("li");
  li.textContent = friend + ": " + trainer.friends[friend].join(", ");
  document.getElementById("trainer-friends").appendChild(li);
}

// Tackle function
function attack() {
  pikachu.tackle(charmander);
}
