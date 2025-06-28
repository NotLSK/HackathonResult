import {Module} from '../core/module'

export class ClicksModule extends Module {

} 

// Создаем стили кнопок
const container = document.createElement('div');
container.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  text-align: center;
  background: #f5f5f5;
  font-family: Arial;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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

container.appendChild(timerDisplay);
container.appendChild(resultDisplay);
container.appendChild(startBtn);
container.appendChild(resetBtn);
document.body.appendChild(container);

// создаем переменные состояния 
let clickCount = 0;
let isActive = false;
let timer;

// Функция старта теста
function startTest() {
  if (isActive) return;
  
  isActive = true;
  clickCount = 0;
  resultDisplay.textContent = '0 кликов';
  timerDisplay.textContent = '5 сек';
  timerDisplay.style.color = 'black';
  
  // Обработчик кликов
  document.addEventListener('click', countClick);
  
  // Обратный отсчет
  let seconds = 5;
  timer = setInterval(() => {
    seconds--;
    timerDisplay.textContent = `${seconds} сек`;
    
    if (seconds <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

// Функция сброса
function resetTest() {
  clearInterval(timer);
  isActive = false;
  clickCount = 0;
  document.removeEventListener('click', countClick);
  timerDisplay.textContent = 'Нажмите "Старт"';
  resultDisplay.textContent = '';
}

// Подсчет кликов
function countClick() {
  if (isActive) {
    clickCount++;
    resultDisplay.textContent = `${clickCount} кликов`;
  }
}

// Завершение теста
function endTest() {
  isActive = false;
  document.removeEventListener('click', countClick);
  timerDisplay.textContent = 'Время вышло!';
  timerDisplay.style.color = 'red';
  resultDisplay.textContent = `Итог: ${clickCount} кликов`;
}

// Назначаем обработчики кнопок
startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);
