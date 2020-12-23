const minute = 60000;

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

const pet = new Tomagotchi({
    name: 'Brick',
    type: 'ghost'
})

$('#pet').addClass(pet.type);

