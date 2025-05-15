import {createElement} from './render.js'

export default class AbstractComponent {

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.')
    }
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: get template')
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate())
    }
    return this.element
  }

  removeElement() {
    this.element = null
  }
}