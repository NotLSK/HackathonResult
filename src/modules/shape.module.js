import { Module } from '../core/module'
import { random, getRandomColor } from '../utils';

/**
 * Создаёт случайную фигуру на странице. Фигура имеет случайные: позицию, цвет и размер.
 * @author Egor / NotLSK
 */
export class ShapeModule extends Module {
    #shapeHTML
    #shapes
    #width
    #height

    constructor(type, text) {
        super(type, text);
        this.#shapes = ['square', 'rectangle', 'circle', 'oval', 'triangle']
    }

    trigger() {
        const shapeHTML = this.#getShapeHTML()

        document.querySelector('#app').append(shapeHTML);

        setTimeout(() => {
            this.#removeShape(shapeHTML)
        }, 5000)
    }

    #getRandomShape() {
        return this.#shapes[random(0, this.#shapes.length - 1)];
    }

    #getShapeHTML() {
        const shapeHTML = document.createElement('div');
        shapeHTML.className = this.shape;

        this.#setShapeStyle(shapeHTML);
        this.#setRandomPosition(shapeHTML);

        return shapeHTML;
    }

    #setShapeStyle(shape) {
        this.#width = random(10, window.innerWidth / 4);
        const randomColor = getRandomColor();

        shape.style.width = `${this.#width}px`;
        shape.style.backgroundColor = randomColor;
        shape.style.transform = `rotate(${random(0, 360)}deg)`

        const shapeType = this.#getRandomShape();

        switch (shapeType) {
            case 'square':
                this.#height = this.#width;
                shape.style.height = `${this.#height}px`;
                break;

            case 'rectangle':
                this.#height = this.#width / 2;
                shape.style.height = `${this.#height}px`;
                break;

            case 'circle':
                this.#height = this.#width;
                shape.style.height = `${this.#height}px`;
                shape.style.borderRadius = `${this.#width / 2}px`;
                break;

            case 'oval':
                this.#height = this.#width / 2;
                shape.style.height = `${this.#height}px`;
                shape.style.borderRadius = `${this.#width / 2}px / ${this.#width / 4}px`;
                break;

            case 'triangle':
                this.#height = this.#width;
                shape.style.width = 0;
                shape.style.height = 0;
                shape.style.backgroundColor = '';
                shape.style.borderLeft = `${this.#width / 2}px solid transparent`;
                shape.style.borderRight = `${this.#width / 2}px solid transparent`;
                shape.style.borderBottom = `${this.#width}px solid ${randomColor}`;
                break;
        }
    }

    #setRandomPosition(shape) {
        const diagonal = Math.sqrt(this.#width ** 2 + this.#height ** 2);
        const offset = diagonal / 2; // худший случай при 45 градсах 

        const maxPositionX = window.innerWidth - diagonal;
        const maxPositionY = window.innerHeight - diagonal;

        const positionX = random(offset, maxPositionX);
        const positionY = random(offset, maxPositionY);

        shape.style.position = 'absolute';
        shape.style.left = `${positionX}px`;
        shape.style.top = `${positionY}px`;
    }

    #removeShape(shape) {
        if (shape) {
            shape.remove();
        }
    }
}