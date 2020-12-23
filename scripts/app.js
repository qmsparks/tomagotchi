// ANCHOR global variables
const minute = 60000;
let game;
let statInterval;
const $petSprite = $('#pet');
const $display = $('#display');

// ANCHOR game classes
class Tomagotchi {
    constructor(configObj) {
        // ANCHOR base tomagotchi stats
        this.name = configObj.name;
        this.type = configObj.type;

        this.age = 0;
        this.hunger = 1;
        this.sleepiness = 1;
        this.boredom = 1;
        this.isAlive = true;
    }

    beginLife() {
        this.aging = this.increaseStat('age', 10);
        this.gettingSleepy = this.increaseStat('sleepiness', 6);
        this.gettingHungry = this.increaseStat('hunger', 2);
        this.gettingBored = this.increaseStat('boredom', 1);
    }


    increaseStat(statName, numberOfMinutes){
        return setInterval(() => {
            this[statName]++;
        }, (numberOfMinutes*minute))
    }

    decreaseStat(statName) {
        // TODO handle logic to keep this number from going negative
        this[statName]--;
    }

    die() {
        this.isAlive = false;
        clearInterval(this.aging);
		clearInterval(this.gettingHungry);
		clearInterval(this.gettingSleepy);
		clearInterval(this.gettingBored);
    }
}

class Game {
    constructor(configObj) {
        this.pet = new Tomagotchi(configObj);
        this.lightsOn = true;
    }

    handleLights() {
        this.lightsOn = !this.lightsOn;
        $display.toggleClass('dark');
        $petSprite.toggleClass('sleeping');
        this.lightsOn ? this.turnLightsOn() : this.turnLightsOff();
    }

    turnLightsOff() {
        clearInterval(this.pet.gettingSleepy);
        this.napTime = setInterval(() => {
            this.pet.decreaseStat('sleepiness');
        }, (3*minute));
    }

    turnLightsOn() {
        clearInterval(this.napTime);
        this.pet.gettingSleepy = this.pet.increaseStat('sleepiness', 6);
    }

}



// ANCHOR dom manipulation

// ANCHOR helper functions

const renderGame = function() {
    $('#name').text(game.pet.name);
    $('#game-info').toggleClass('hidden');
    $('#buttons').toggleClass('hidden');
    $('#stats').toggleClass('hidden');
    game.pet.beginLife();
    updateInfo();
}

const updateInfo = function() {
    console.log('Updating stats');
    $('#age').text(game.pet.age);
	$('#hunger').text(game.pet.hunger);
	$('#sleepiness').text(game.pet.sleepiness);
	$('#boredom').text(game.pet.boredom);
}


// ANCHOR event listeners

$('#start-btn').on('click', (e) => {
    e.preventDefault();
    game = new Game({
        name: $('#name-input').val(),
        type: 'deer'
    })
    
    $petSprite.addClass(game.pet.type);
    renderGame();
    statInterval = setInterval(updateInfo, minute);
})

// TODO actually handle these


$('#light-btn').on('click', () => {
    game.handleLights();
});

$('#feed-btn').on('click', () => {
	console.log('Yummy yummy');
});

$('#play-btn').on('click', () => {
	console.log('Be! Less! Bored!');
});