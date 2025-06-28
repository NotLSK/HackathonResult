import {Menu} from './core/menu.js';
import {Module} from './core/module.js';

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector);
        this.modules = [];
        this.bindEvents();
    }

    rightClickOnSite = (event) => {
        event.preventDefault();

        if (this.modules.length > 0) {
            this.open(event.clientX, event.clientY)
        }
    } 

    open (x, y) {
        this.el.classList.add('open');

        const menuWidth = this.el.offsetWidth;
        const menuHeight = this.el.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const adjustedX = x + menuWidth > windowWidth ? windowWidth - menuWidth : x;
        const adjustedY = y + menuHeight > windowHeight ? windowHeight - menuHeight : y;

        this.el.style.left = `${adjustedX}px`;
        this.el.style.top = `${adjustedY}px`;

    }

    close () {
        this.el.classList.remove('open')
    }

    add (module) {
        if (module instanceof Module) {
            this.modules.push(module);
            this.el.insertAdjacentHTML('beforeend', module.toHTML());
        }
    }

    handleMenuItemClick = (event) => {
        const menuItem = event.target.closest('.menu-item');
        if (!menuItem) return;

        const type = menuItem.dataset.type;
        const module = this.modules.find(module => module.type === type);

        if (module) {
            module.trigger();
            this.close()
        }
    }

    bindEvents() {
        document.body.addEventListener('contextmenu', this.rightClickOnSite)
        this.el.addEventListener('click', this.handleMenuItemClick)
    }
}