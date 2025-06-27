import {Menu} from './core/menu'

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
        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;

        this.el.classList.add('open')
    }

    close () {
        this.el.classList.remove('open')
    }

    add (module) {
        this.modules.push(module);

        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';
        menuItem.dataset.type = module.type;
        menuItem.textContent = module.text;

        this.el.appendChild(menuItem);

        menuItem.addEventListener('click', () => {
            module.trigger();
            this.close();
        })
    }

    bindEvents() {
        document.body.addEventListener('contextmenu', this.rightClickOnSite)
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.menu')) {
                this.close()
            }
        })
    }
}