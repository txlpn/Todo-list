import BaseComponent from "../framework/base-component.js"

function createDeskTemplate() {
    return (
        `<section class="tasks-board-component">
        </section>`
    );
}

export default class DeskComponent extends BaseComponent {
    getTemplate() {
        return createDeskTemplate();
    }
}