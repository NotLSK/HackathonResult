import { Module } from '../../core/module';
import './clicks-module.css';

/**
 * Считает количество двойных и одинарных кликов за определенное количество секунд.
 * @author Maxim / TrueMax
 */
export class ClicksModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.singleClicks = 0;       // Счетчик одиночных кликов
    this.doubleClicks = 0;       // Счетчик двойных кликов
    this.isActive = false;
    this.timer = null;
    this.container = null;
    this.clickTimeout = null;    // Таймер для двойного клика
    this.clickCount = 0;         // Временный счетчик кликов
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
    this.singleClicks = 0;
    this.doubleClicks = 0;
    resultDisplay.textContent = '0 одиночных, 0 двойных';
    timerDisplay.textContent = '5 сек';
    timerDisplay.style.color = 'black';

    document.addEventListener('click', this.handleClick);

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

  handleClick = (event) => {
    if (!this.isActive) return;

    // Игнорируем клики внутри интерфейса модуля
    if (this.container.contains(event.target)) {
      return;
    }

    this.clickCount++;

    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        // Одиночный клик
        this.singleClicks++;
        this.updateResults();
        this.clickCount = 0;
      }, 300);
    } else if (this.clickCount === 2) {
      // Двойной клик
      clearTimeout(this.clickTimeout);
      this.doubleClicks++;
      this.updateResults();
      this.clickCount = 0;
    }
  }

  updateResults() {
    const resultDisplay = document.getElementById('result');
    if (resultDisplay) {
      resultDisplay.textContent = `${this.singleClicks} одиночных, ${this.doubleClicks} двойных`;
    }
  }

  resetTest(timerDisplay, resultDisplay) {
    // Очищаем таймер двойного клика
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }

    clearInterval(this.timer);
    this.isActive = false;
    this.singleClicks = 0;
    this.doubleClicks = 0;
    this.clickCount = 0;
    document.removeEventListener('click', this.handleClick);
    timerDisplay.textContent = 'Нажмите "Старт"';
    timerDisplay.classList.remove('clicks-module-timer-red');
    resultDisplay.textContent = '';
  }

  endTest(timerDisplay, resultDisplay) {
    this.isActive = false;
    document.removeEventListener('click', this.handleClick);

    // Очищаем таймер двойного клика
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }

    timerDisplay.textContent = 'Время вышло!';
    timerDisplay.classList.add('clicks-module-timer-red');
    resultDisplay.textContent = `Итог: ${this.singleClicks} одиночных, ${this.doubleClicks} двойных`;

    setTimeout(() => {
      if (this.container) {
        this.container.remove();
        this.container = null;
      }
    }, 10000);
  }
}