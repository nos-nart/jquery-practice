// https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co

function Dog(name, breed, color) {
    this.name = name
    this.breed = breed
    this.color = color
}

Dog.prototype.bark = function() {
    return 'WOOF WOOF';
}

const dog1 = new Dog('nos', 'pit-pull', 'brown');
const dog2 = new Dog('kapi', 'fox', 'yellow');

// dog1.__proto__ ~ Dog.prototype

// EXAMPLE2:
function iPhone() {}; //constructor

iPhone.prototype.faceID = function() {};
iPhone.prototype.video = function(){};

const iPhone11 = new iPhone();

console.log(iPhone11.__proto__);
console.log(iPhone.prototype);

// true difference between prototype and __proto__ is that the former is a property of a class constructor, while the latter is a property of a class instance.

// iPhone11.__proto__ is reference to iPhone.prototype
// iPhone11.__proto__  ~ iPhone.prototype

// while iPhone.prototype provides a blueprint for building an iPhone, newPhone.__proto__ affirms that the iPhone has indeed been built according to that specific blueprint.