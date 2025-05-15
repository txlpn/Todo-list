import AbstractComponent from '../framework/abstract-component.js'

export default class ClearButtonComponent extends AbstractComponent {

  #handleClick = null

  constructor({onClick}) {
    super()
    this.#handleClick = onClick
    this.getElement().addEventListener("click", this.#clickHandler)
  }

  #clickHandler = event => {
    event.preventDefault()
    this.#handleClick()
  }

  getTemplate() {
    return (
        `<button class="clear-button" type="submit">
        <img class="icon" src="./assets/clear.svg" alt="x"/>
        Очистить
      </button>`
    )
  }
}
