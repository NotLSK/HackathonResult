import { Module } from '../../core/module';
import './clicks-module.css'; // Импорт стилей

/**
 * Считает количество двойных и одинарных кликов за определенное количество секунд.
 * @author Maxim / TrueMax
 */
export class ClicksModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.clickCount = 0;
    this.isActive = false;
    this.timer = null;
    this.container = null;
  }

  trigger() {
    if (this.container) {
      this.container.remove();
    }
    this.createUI();
  }

  createUI() {
    this.container = document.createElement('div');
    this.container.className = 'clicks-module-container';

    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.className = 'clicks-module-timer';
    timerDisplay.textContent = 'Нажмите "Старт"';

    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'result';
    resultDisplay.className = 'clicks-module-result';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Старт';
    startBtn.className = 'clicks-module-button clicks-module-button-start';

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Сброс';
    resetBtn.className = 'clicks-module-button clicks-module-button-reset';

    this.container.appendChild(timerDisplay);
    this.container.appendChild(resultDisplay);
    this.container.appendChild(startBtn);
    this.container.appendChild(resetBtn);
    document.body.appendChild(this.container);

    startBtn.addEventListener('click', () => this.startTest(timerDisplay, resultDisplay));
    resetBtn.addEventListener('click', () => this.resetTest(timerDisplay, resultDisplay));
  }

  startTest(timerDisplay, resultDisplay) {
    if (this.isActive) return;

    this.isActive = true;
    this.clickCount = 0;
    resultDisplay.textContent = '0 кликов';
    timerDisplay.textContent = '5 сек';
    timerDisplay.style.color = 'black';

    document.addEventListener('click', this.countClick);

    let seconds = 5;
    this.timer = setInterval(() => {
      seconds--;
      timerDisplay.textContent = `${seconds} сек`;

      if (seconds <= 0) {
        clearInterval(this.timer);
        this.endTest(timerDisplay, resultDisplay);
      }
    }, 1000);
  }

  countClick = () => {
    if (this.isActive) {
      this.clickCount++;
      document.getElementById('result').textContent = `${this.clickCount} кликов`;
    }
  }

  resetTest(timerDisplay, resultDisplay) {
    clearInterval(this.timer);
    this.isActive = false;
    this.clickCount = 0;
    document.removeEventListener('click', this.countClick);
    timerDisplay.textContent = 'Нажмите "Старт"';
    timerDisplay.classList.remove('clicks-module-timer-red');
    resultDisplay.textContent = '';
  }

  endTest(timerDisplay, resultDisplay) {
    this.isActive = false;
    document.removeEventListener('click', this.countClick);
    timerDisplay.textContent = 'Время вышло!';
    timerDisplay.classList.add('clicks-module-timer-red');
    resultDisplay.textContent = `Итог: ${this.clickCount} кликов`;

    setTimeout(() => {
      if (this.container) {
        this.container.remove();
        this.container = null;
      }
    }, 10000);
  }
}