import './styles.css'
import { ShapeModule } from './modules/shape.module'
import { ContextMenu } from './menu';
import { Page } from './pages/main/main';
import { BackgroundModule } from './modules/background/background.module';
import { ClicksModule } from './modules/clicks.module/clicks.module';
import { CustomMessageModule } from './modules/custom.module';
import { CountdownModule } from './modules/countdown/countdown.module';

document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = new ContextMenu('#menu')
    const backgorund = new BackgroundModule('brackground', 'Сменить цвет');
    const shape = new ShapeModule('shape', 'Создать фигуру');
    const click = new ClicksModule('click', 'Аналитика кликов');
    const custom = new CustomMessageModule('message', 'Вывести сообщение')
    const countdown = new CountdownModule('timer', 'Таймер отсчета')

    contextMenu.add(backgorund);
    contextMenu.add(shape);
    contextMenu.add(click);
    contextMenu.add(custom);
    contextMenu.add(countdown);

    new Page(contextMenu.modules);
})
