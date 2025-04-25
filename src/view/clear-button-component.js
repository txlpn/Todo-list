import AbstractComponent from '../framework/view/abstract-component.js';

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clearHandler);
    }

    get template() {
        return (
            `<button class="clear-button" type='submit'>Очистить</button>`
        )
    }

    #clearHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}