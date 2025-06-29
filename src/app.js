import './styles.css'
import { ShapeModule } from './modules/shape.module'
import { ContextMenu } from './menu';
import { Page } from './pages/main/main';
import { BackgroundModule } from './modules/background.module';
import { ClicksModule } from './modules/clicks.module';

document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = new ContextMenu('#menu')
    const backgorund = new BackgroundModule('brackground', 'Сменить цвет');
    const shape = new ShapeModule('shape', 'Создать фигуру');
    const click = new ClicksModule('click', 'Аналитика кликов');
    const mainPage = new Page(contextMenu.modules);

    contextMenu.add(backgorund);
    contextMenu.add(shape);
    contextMenu.add(click);
})
