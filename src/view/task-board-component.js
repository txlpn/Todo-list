import AbstractComponent from '../framework/view/abstract-component.js';

export default class DeskComponent extends AbstractComponent {
    get template() {
        return (`<section class="desk-tasks"></section>`);
    }
}