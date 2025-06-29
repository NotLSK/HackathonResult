import { Module } from '../../core/module'

export class ClicksModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.clickCount = 0;
    this.isActive = false;
    this.timer = null;
    this.container = null;
  }

  trigger() {
    // Удаляем предыдущий контейнер если есть
    if (this.container) {
      this.container.remove();
    }

    this.createUI();
  }

  createUI() {
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 15px;
      text-align: center;
      background: #f5f5f5;
      font-family: Arial;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      z-index: 1000;
    `;

    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.textContent = 'Нажмите "Старт"';
    timerDisplay.style.cssText = 'font-size: 20px; margin: 10px;';

    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'result';
    resultDisplay.style.cssText = 'font-size: 24px; font-weight: bold; margin: 15px;';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Старт';
    startBtn.style.cssText = `
      padding: 10px 20px;
      margin: 5px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Сброс';
    resetBtn.style.cssText = `
      padding: 10px 20px;
      margin: 5px;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    this.container.appendChild(timerDisplay);
    this.container.appendChild(resultDisplay);
    this.container.appendChild(startBtn);
    this.container.appendChild(resetBtn);
    document.body.appendChild(this.container);

    // Обработчики событий
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
    resultDisplay.textContent = '';
  }

  endTest(timerDisplay, resultDisplay) {
    this.isActive = false;
    document.removeEventListener('click', this.countClick);
    timerDisplay.textContent = 'Время вышло!';
    timerDisplay.style.color = 'red';
    resultDisplay.textContent = `Итог: ${this.clickCount} кликов`;

    // Автоудаление через 5 секунд
    setTimeout(() => {
      if (this.container) {
        this.container.remove();
        this.container = null;
      }
    }, 5000);
  }
}
