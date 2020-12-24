// ANCHOR global variables
const minute = 60000;
const $petSprite = $('#pet');
const $display = $('#display');

const deerPath = './images/deer'
const ghostPath = './images/ghost'
const pixiePath = './images/pixie'
const griffinPath = './images/griffin'

const spriteData = [
    {
        id: 'deer',
        idle: [
            `${deerPath}/idle/frame1.png`,
            `${deerPath}/idle/frame2.png`,
            `${deerPath}/idle/frame3.png`,
            `${deerPath}/idle/frame4.png`,
        ],
        walk: [
            `${deerPath}/walk/frame1.png`,
            `${deerPath}/walk/frame2.png`,
            `${deerPath}/walk/frame3.png`,
            `${deerPath}/walk/frame4.png`,
        ]
    },
    {
        id: 'ghost',
        idle: [
            `${ghostPath}/idle/frame1.png`,
            `${ghostPath}/idle/frame2.png`,
            `${ghostPath}/idle/frame3.png`,
            `${ghostPath}/idle/frame4.png`,
        ],
        walk: [
            `${ghostPath}/walk/frame1.png`,
            `${ghostPath}/walk/frame2.png`,
            `${ghostPath}/walk/frame3.png`,
            `${ghostPath}/walk/frame4.png`,
        ]
    },
    {
        id: 'pixie',
        idle: [
            `${pixiePath}/idle/frame1.png`,
            `${pixiePath}/idle/frame2.png`,
            `${pixiePath}/idle/frame3.png`,
            `${pixiePath}/idle/frame4.png`,
        ],
        walk: [
            `${pixiePath}/walk/frame1.png`,
            `${pixiePath}/walk/frame2.png`,
            `${pixiePath}/walk/frame3.png`,
            `${pixiePath}/walk/frame4.png`,
        ]
    },
    {
        id: 'griffin',
        idle: [
            `${griffinPath}/idle/frame1.png`,
            `${griffinPath}/idle/frame2.png`,
            `${griffinPath}/idle/frame3.png`,
            `${griffinPath}/idle/frame4.png`,
        ],
        walk: [
            `${griffinPath}/walk/frame1.png`,
            `${griffinPath}/walk/frame2.png`,
            `${griffinPath}/walk/frame3.png`,
            `${griffinPath}/walk/frame4.png`,
        ]
    }
]

let game;

// ANCHOR game classes
class Carousel {
    constructor(configObj) {
        this.spriteData = configObj.sprites;
        this.spriteObjects = [];
        this.div = $('#carousel');
        this.index = 0;

        this.buildSprites();
    }

    buildSprites() {
        this.spriteData.forEach(spriteObj => {
            const sprite = new Sprite(spriteObj);
            this.spriteObjects.push(sprite);
            this.div.append(sprite.node);
        })
        this.setActiveSlide();
    }

    handleClick(buttonId) {
        buttonId === 'forward' ? this.forward() : this.back();

        this.setActiveSlide();
    }

    forward() {
        if (this.index !== this.spriteObjects.length-1) {
            this.index++;
        } else {
            this.index = 0;
        }
    }
    
    back() {
        if (this.index !== 0) {
            this.index--;
        } else {
            this.index = this.spriteObjects.length-1;
        }
    }

    setActiveSlide() {
        $('.active').removeClass('active');
        $('.pet-option').eq(this.index).addClass('active');
    }
}

class Sprite {
    constructor(configObj) {
        this.id = configObj.id;
        this.idle = configObj.idle;
        this.walk = configObj.walk;
        this.index = 0;

        this.buildNode();
        this.animate(this.idle);
    }

    buildNode() {
        this.node = $(`<img id="${this.id}" class="pet-option" src="#" alt="${this.id} sprite"></img>`);
    }

    animate(frameArr, interval=125) {
        if (this.animation) clearInterval(this.animation);
        this.animation = setInterval(() => {
            this.node.attr('src', frameArr[this.index]);
            this.index === frameArr.length - 1 ? this.index = 0 : this.index++;
        }, interval);
    }
}

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
        this.setBaseStats();
    }

    setBaseStats() {
        this.gettingSleepy = this.setStatInterval('sleepiness', 6);
        this.gettingHungry = this.setStatInterval('hunger', 2);
        this.gettingBored = this.setStatInterval('boredom', 1);
    }

    clearBaseStats() {
        clearInterval(this.gettingHungry);
		clearInterval(this.gettingSleepy);
        clearInterval(this.gettingBored);
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
        this.clearBaseStats();
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
        $('.game-info').toggleClass('hidden');
        $('.buttons').toggleClass('hidden');
        $('.stats').toggleClass('hidden');
        this.sprite = characterSelect.spriteObjects[characterSelect.index];
        this.sprite.node.removeClass('pet-option').removeClass('active').addClass('selected-pet');
        $('#pet-container').append(this.sprite.node);
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

    turnLightsOff() {
        this.pet.clearBaseStats();
        this.pet.setStatInterval('hunger', 4);

        this.napTime = setInterval(() => {
            this.pet.decreaseStat('sleepiness');
            this.updateInfo();
        }, (3*minute));
    }

    turnLightsOn() {
        clearInterval(this.napTime);
        this.pet.clearBaseStats();
        this.pet.setBaseStats();
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

// ANCHOR carousel instantiation
const characterSelect = new Carousel({
    sprites: spriteData
})

// ANCHOR event listeners

$('.carousel-button').on('click', e => {
    const direction = $(e.target).attr('id');
    characterSelect.handleClick(direction);
})

$('#start-btn').on('click', (e) => {
    e.preventDefault();
    game = new Game({
        name: $('#name-input').val(),
        type: $('.active').attr('id')
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