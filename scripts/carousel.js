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
        this.idleArr = configObj.idle;
        this.walkArr = configObj.walk;
        this.index = 0;

        this.buildNode();
        this.animate(this.idleArr);
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



const characterSelect = new Carousel({
    sprites: spriteData
})


$('.carousel-button').on('click', e => {
    const direction = $(e.target).attr('id');
    characterSelect.handleClick(direction);
})