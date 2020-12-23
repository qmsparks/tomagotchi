const minute = 60000;

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
        // Tomagotchi ages one 'year' every ten minutes
        this.aging = setInterval(() => {
            this.age++;
        }, (10*minute));

        // Tomagotchi gets hungrier every two minutes
		this.gettingHungry = setInterval(()=> {
			this.hunger++;
		}, 2*minute);

		// Tomagotchi gets sleepier every 6 minutes
		this.gettingSleepy = setInterval(()=> {
			this.sleepiness++;
		}, 6*minute);

		// Tomagotchi gets more bored every minute
		this.gettingBored = setInterval(()=> {
			this.boredom++;
		}, minute);
    }

    eat() {
        this.hunger--;
    }

    sleep() {
        this.sleepiness--;
    }

    play() {
        this.boredom--;
    }

    die() {
        this.isAlive = false;
        clearInterval(this.aging);
		clearInterval(this.gettingHungry);
		clearInterval(this.gettingSleepy);
		clearInterval(this.gettingBored);
    }
}

let pet;
let statInterval;
const $petSprite = $('#pet');


// ANCHOR dom manipulation

// ANCHOR helper functions

const renderGame = function() {
    $('#name').text(pet.name);
    $('#game-info').toggleClass('hidden');
    $('#buttons').toggleClass('hidden');
    $('#stats').toggleClass('hidden');
    pet.beginLife();
    updateInfo();
}

const updateInfo = function() {
    console.log('Updating stats');
    $('#age').text(pet.age);
	$('#hunger').text(pet.hunger);
	$('#sleepiness').text(pet.sleepiness);
	$('#boredom').text(pet.boredom);
}


// ANCHOR event listeners

$('#start-btn').on('click', (e) => {
    e.preventDefault();

    pet = new Tomagotchi({
        name: $('#name-input').val(),
        type: 'ghost'
    })
    
    $petSprite.addClass(pet.type);
    renderGame();
    statInterval = setInterval(updateInfo, minute);
})