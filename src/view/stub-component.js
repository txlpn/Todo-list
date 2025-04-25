import AbstractComponent from "../framework/view/abstract-component.js";

export default class StubComponent extends AbstractComponent {
    get template() {
        return `<div class=stub>Перетащите карточку</div>`;
    }
}