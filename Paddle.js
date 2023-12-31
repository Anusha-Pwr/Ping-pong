const SPEED = 0.02;

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElem.style.setProperty("--position", value);
    }

    reset() {
        this.position = 50;
    }

    rect() {
        return this.paddleElem.getBoundingClientRect();
    }

    update(delta, ballHeight) {
        // paddle moves in the direction of the ball(upwards or downwards)
        this.position += SPEED * delta * (parseFloat(ballHeight) - parseFloat(this.position));
        //console.log(this.position);
    }
}