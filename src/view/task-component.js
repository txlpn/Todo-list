import AbstractComponent from '../framework/abstract-component.js'

export default class TaskComponent extends AbstractComponent {

  constructor(task) {
    super()
    this.task = task
    this.#afterCreateElement()
  }

  getTemplate() {
    return (
        `<li class="task" data-id="${this.task.id}">${this.task.title}</li>`
    )
  }

  #afterCreateElement() {
    this.#makeTaskDraggable()
  }

  #makeTaskDraggable() {
    const element = this.getElement()

    element.setAttribute('draggable', true)

    element.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.task.id)
    })
  }
}
