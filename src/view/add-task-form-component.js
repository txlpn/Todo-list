import AbstractComponent from '../framework/abstract-component.js'

export default class AddTaskFormComponent extends AbstractComponent {

  #handleClick = null

  constructor({onClick}) {
    super()
    this.#handleClick = onClick
    this.getElement().addEventListener("submit", this.#clickHandler)
  }

  #clickHandler = event => {
    event.preventDefault()
    this.#handleClick()
  }

  getTemplate() {
    return (
        `<div class="create-task-section">
            <h1>Новая задача</h1>
            <form class="flex-fields">
                <input placeholder="Название задачи..." type="text" id="new-task-title" required>
                <button type="submit">
                    <img class="icon" src="./assets/add.svg" alt="+"/>
                    <span>Добавить</span>
                </button>
            </form>
        </div>`
    )
  }
}
