class Carousel {
    constructor(configObj) {
        this.spriteArr = configObj.sprites;
        this.div = $('#carousel');
        this.index = 0;

        this.buildSlides();
    }

    buildSlides() {
        this.spriteArr.forEach(sprite => {
            const $sprite = $(`<span id="${sprite}" class="pet-option ${sprite}"></span>`)
            this.div.append($sprite);
        })
        this.setActiveSlide();
    }

    handleClick(buttonId) {
        buttonId === forward ? this.forward() : this.back();

        this.setActiveSlide();
    }

    forward() {
        if (this.index !== this.spriteArr.length-1) {
            this.index++;
        } else {
            this.index = 0;
        }
    }
    
    back() {
        if (this.index !== 0) {
            this.index--;
        } else {
            this.index = this.spriteArr.length-1;
        }
    }

    setActiveSlide() {
        $('.active').removeClass('active');
        $('.pet-option').eq(this.index).addClass('active');
    }
}

const characterSelect = new Carousel({
    sprites: ['deer', 'ghost']
})


$('.carousel-button').on('click', e => {
    const direction = $(e.target).attr('id');
    characterSelect.handleClick(direction);
})