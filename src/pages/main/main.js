import './main.css'

/**
 * Инициализация и рендер стартовой страницы с описанием модулей приложения.
 * @author Egor Razzorenov / NotLSK
 */
export class Page {
    #content

    constructor(modules = []) {
        this.modules = modules;
        this.renderMainPage();
    }

    async #getModulesData() {
        try {
            const response = await fetch('../../data.json');
            if (!response.ok) {
                throw new Error('Error retrieving module data');
            }
            const modulesData = await response.json();

            return modulesData;
        } catch (err) {
            console.error(err);
        }
    }

    renderMainPage() {
        const app = document.querySelector('#app');

        const container = document.createElement('div');
        container.className = 'main__container';

        const title = document.createElement('h1');
        title.className = 'main__title';
        title.textContent = 'Описание модулей';

        this.#content = document.createElement('div');
        this.#content.className = 'main__content';

        container.append(title, this.#content);
        app.append(container);

        this.#renderModuleItems();
    }

    async #renderModuleItems() {
        this.descriptions = await this.#getModulesData();

        this.modules.forEach((module) => {
            const currentModule = this.descriptions.find((item) => item.type === module.type)
            const result = this.#createModuleElement(currentModule.title, currentModule.description);
            this.#content.append(result);
        })
    }

    #createModuleElement(title, description) {
        const item = document.createElement('div');
        item.className = 'main__content-item';

        const itemTitle = document.createElement('h3');
        itemTitle.className = 'main__content-title';
        itemTitle.textContent = title;

        const itemDescription = document.createElement('p');
        itemDescription.className = 'main__content-description';
        itemDescription.textContent = description;

        item.append(itemTitle, itemDescription);

        return item;
    }
}