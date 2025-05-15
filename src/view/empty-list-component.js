import AbstractComponent from '../framework/abstract-component.js'

export default class EmptyListComponent extends AbstractComponent {

  constructor() {
    super()
  }

  getTemplate() {
    return (
        `<li class="empty-list">Перетащите задачу</li>`
    )
  }
}
