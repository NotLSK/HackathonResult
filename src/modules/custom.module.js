import { Module } from '../core/module'

/**
 * Создает случайный блок с сообщением на экране, который исчезает через определенно время.
 * @author Мария / MariaPiarina
 */
export class CustomMessageModule extends Module {
  constructor(type, text) {
    super(type, text)
    this.messages = [
        "JavaScript — это как волшебство: если не знаешь, как оно работает, то кажется, что всё просто.",
        "Сначала ты учишь JavaScript, потом JavaScript учит тебя терпению.",
        "В JavaScript undefined — это не отсутствие значения, а состояние души программиста в 3 часа ночи.",
        "— Почему JavaScript-программист не может найти жену?\n— Потому что он вечно ищет this, а оно всегда не там, где он ожидает!",
        "— Почему новички путают == и ===?\n— Потому что один знак '=' — это присвоение, два — 'ну ладно, сравни', а три — 'СЕРЬЁЗНО, СРАВНИ ТОЧНО!'",
        "— Что говорит JavaScript-программист, когда у него всё работает с первого раза?\n— Что-то тут не так…",
        "— Почему null и undefined не дружат?\n— Потому что null — это сознательное 'ничего', а undefined — это 'я даже не знаю, что это'.",
        "console.log('Ты справишься!'); // Даже если Хакатон JS кажется сложным",
        "Ошибка 404: Оправдания не найдены. Код должен работать!",
        "async/await твоей жизни: сначала хаос, потом структура ⏳",
        "Не «это баг», а «неожиданная фича» 🐞",
        "Оптимизируй код, но не свою страсть к кофе ☕",
        "Пуш в main — это как прыжок с парашютом без инструктора 🪂",
        "Если код работает, НЕ ТРОГАЙ ЕГО. (Шутка. Почти.)",
        "useEffect(() => { motivation }, [depression])",
        "Git commit -m 'Пофиксил то, что пофиксил вчера'",
        "Программист и садовник: оба борются с багами 🌿🐛",
        "Помни: каждый Senior Dev когда-то искал 'как центрировать div'",
        "Жизнь — это хук, используй её эффекты правильно 🎣",
        "Лучший алгоритм: if (hungry) { eat() } else { code() }",
        "Вебпак собрался с первого раза? Это глюк. Перезапусти."
    ]
    this.colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#E91E63']
  }

  trigger() {
    const messageBox = document.createElement('div')
    messageBox.className = 'custom-message'
    
    // Выбираем случайное сообщение
    const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)]
    
    // Создаем красивый UI
    messageBox.innerHTML = `
      <div class="message-header">
        <span class="message-icon">💡</span>
        <h3 class="message-title">Сообщение от команды</h3>
      </div>
      <div class="message-content">
        ${randomMessage}
      </div>
      <div class="message-progress"></div>
    `
    
    // Стилизация через JavaScript для изоляции стилей
    const styles = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '10000',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      transform: 'translateY(20px)',
      opacity: '0',
      transition: 'all 0.3s ease-out'
    }
    
    Object.assign(messageBox.style, styles)
    
    // Случайный цвет для акцентов
    const accentColor = this.colors[Math.floor(Math.random() * this.colors.length)]
    
    // Добавляем элементы в DOM
    document.body.appendChild(messageBox)
    
    // Анимация появления
    setTimeout(() => {
      messageBox.style.transform = 'translateY(0)'
      messageBox.style.opacity = '1'
      
      // Анимация прогресс-бара
      const progressBar = messageBox.querySelector('.message-progress')
      progressBar.style.height = '4px'
      progressBar.style.backgroundColor = accentColor
      progressBar.style.width = '100%'
      progressBar.style.transition = 'width 3s linear'
      progressBar.style.borderRadius = '2px'
      
      setTimeout(() => {
        progressBar.style.width = '0%'
      }, 50)
    }, 50)
    
    // Автозакрытие через 5 секунд с анимацией
    setTimeout(() => {
      messageBox.style.transform = 'translateY(20px)'
      messageBox.style.opacity = '0'
      setTimeout(() => messageBox.remove(), 300)
    }, 5000)
    
    // Возможность закрыть кликом
    messageBox.addEventListener('click', () => {
      messageBox.style.transform = 'translateY(20px)'
      messageBox.style.opacity = '0'
      setTimeout(() => messageBox.remove(), 300)
    })
  }
}