import { Module } from '../../core/module'
import './clicks-module.css' // Импорт CSS-файла

export class ClicksModule extends Module {
  // ...остальной код без изменений...

  createUI() {
    this.container = document.createElement('div');
    this.container.className = 'clicks-module-container'; // Применяем класс

    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.className = 'clicks-module-timer'; // Применяем класс
    timerDisplay.textContent = 'Нажмите "Старт"';

    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'result';
    resultDisplay.className = 'clicks-module-result'; // Применяем класс

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Старт';
    startBtn.className = 'clicks-module-button clicks-module-button-start'; // Применяем классы

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Сброс';
    resetBtn.className = 'clicks-module-button clicks-module-button-reset'; // Применяем классы

    // ...остальной код без изменений...
  }

  startTest(timerDisplay, resultDisplay) {
    // ...код...
    timerDisplay.classList.remove('clicks-module-timer-red'); // Убираем красный цвет
  }

  endTest(timerDisplay, resultDisplay) {
    // ...код...
    timerDisplay.classList.add('clicks-module-timer-red'); // Добавляем красный цвет
  }

  resetTest(timerDisplay, resultDisplay) {
    // ...код...
    timerDisplay.classList.remove('clicks-module-timer-red'); // Убираем красный цвет
  }
}