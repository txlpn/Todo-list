import AbstractComponent from '../framework/abstract-component.js'

export default class BoardComponent extends AbstractComponent {

  getTemplate() {
    return (
        `<section class="display-tasks-section">
        </section>`
    )
  }
}
