import { Module } from '../core/module';
import { random } from '../utils.js';

/**
 * Изменяет фон сайта на случайный цвет.
 * @author Mikita / Onirinka
 */
export class BackgroundModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        document.body.style.backgroundColor = this.getRandomColor();
    }

    getRandomColor() {
        const hexRange = '1234567890ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += hexRange[random(0, hexRange.length - 1)];
        }
        return color;
    }

}