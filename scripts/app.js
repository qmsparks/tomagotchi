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
        this.aging = this.setStatInterval('age', 10);
        this.gettingSleepy = this.setStatInterval('sleepiness', 6);
        this.gettingHungry = this.setStatInterval('hunger', 2);
        this.gettingBored = this.setStatInterval('boredom', 1);
    }


    setStatInterval(statName, numberOfMinutes){
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

    begin() {
        this.pet.beginLife();
        this.updateInfo();
        this.statInterval = setInterval(() => {
            this.updateInfo();
            this.deathCheck();
        }, minute)
        this.render();
    }

    render() {
        $('#name').text(game.pet.name);
        $('#game-info').toggleClass('hidden');
        $('#buttons').toggleClass('hidden');
        $('#stats').toggleClass('hidden');
        $petSprite.addClass(this.pet.type);
    }

    updateInfo() {
        console.log('Updating stats');
        $('#age').text(this.pet.age);
        $('#hunger').text(this.pet.hunger);
        $('#sleepiness').text(this.pet.sleepiness);
        $('#boredom').text(this.pet.boredom);
    }

    handleLights() {
        this.lightsOn = !this.lightsOn;
        $display.toggleClass('dark');
        $petSprite.toggleClass('sleeping');
        this.lightsOn ? this.turnLightsOn() : this.turnLightsOff();
    }
    // TODO going to sleep should halt the boredom clock, as well as slowing down the hunger
    turnLightsOff() {
        clearInterval(this.pet.gettingSleepy);
        this.napTime = setInterval(() => {
            this.pet.decreaseStat('sleepiness');
            this.updateInfo();
        }, (3*minute));
    }

    turnLightsOn() {
        clearInterval(this.napTime);
        this.pet.gettingSleepy = this.pet.setStatInterval('sleepiness', 6);
    }

    deathCheck() {
        if (this.pet.hunger >= 10 || this.pet.sleepiness >=10 || this.pet.boredom >=10) {
            return this.end();
        }
    }

    end() {
        console.log('Ah nuts, dead pet');
        clearInterval(this.statInterval);
        this.pet.die();
    }

}


// ANCHOR event listeners

$('#start-btn').on('click', (e) => {
    e.preventDefault();
    game = new Game({
        name: $('#name-input').val(),
        type: 'deer'
    })
    game.begin();
})


$('#light-btn').on('click', () => {
    game.handleLights();
});

$('#feed-btn').on('click', () => {
    game.pet.decreaseStat('hunger');
    game.updateInfo();
});

$('#play-btn').on('click', () => {
    game.pet.decreaseStat('boredom');
    game.updateInfo();
});