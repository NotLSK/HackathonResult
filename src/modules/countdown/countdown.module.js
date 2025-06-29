import {Module} from '../../core/module';
import './countdown.css';

/**
 * Таймер отсчета Пользователь задает время, создается маленький таймер 
 * (например в виде небольшого блока в углу сайта). 
 * По истечении времени таймер выводит сообщение о завершении и удаляется.
 * @author Mikita Adamovich / onirinka-creator
 */

export class CountdownModule extends Module {
    #timerInterval;
    #container;

    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        const seconds = Number(prompt('Введите время в секундах:'));
        
        if (isNaN(seconds) || seconds <= 0) {
            alert('Пожалуйста, введите число больше 0');
            return;
        }

        this.#createContainer();
        this.#startTimer(seconds);
    }

    #createContainer() {
        this.#removeTimer();

        this.#container = document.createElement('div');
        this.#container.className = 'timer';
        document.body.appendChild(this.#container);
    }

    #startTimer(seconds) {
        let remaining = seconds;
        
        this.#updateTimer(remaining);
        
        this.#timerInterval = setInterval(() => {
            remaining--;
            this.#updateTimer(remaining);
            
            if (remaining <= 0) {
                this.#completeTimer();
            }
        }, 1000);
    }

    #updateTimer(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        this.#container.textContent = `${mins}:${secs >= 10 ? secs : `0${secs}`}`;
    }

    #completeTimer() {
        clearInterval(this.#timerInterval);
        this.#container.textContent = 'ВРЕМЯ ВЫШЛО!';
        setTimeout(() => {
            this.#removeTimer();
        }, 3000);
    }

    #removeTimer() {
        if (this.#timerInterval) {
            clearInterval(this.#timerInterval);
            this.#timerInterval = null;
        }
        if (this.#container) {
            this.#container.remove();
            this.#container = null;
        }
    }

}