import AbstractComponent from '../framework/abstract-component.js'
import {Status, StatusLabel} from '../const.js'

export default class TasksListComponent extends AbstractComponent {

  constructor(status, onTaskDrop) {
    super()
    this.status = Status[status]
    this.label = StatusLabel[status]
    this.#setDropHandler(onTaskDrop)
  }

  getTemplate() {
    return (
        `<div class="status-pattern status-${this.status}">
        <h3>${this.label}</h3>
      </div>`
    )
  }

  #setDropHandler(onTaskDrop) {
    const container = this.getElement()

    container.addEventListener('dragover', event => {
      event.preventDefault()

      const closestTask = event.target.closest('.task')
      if (!closestTask) return

      this.dropTaskId = closestTask.dataset.id
    })

    container.addEventListener('drop', event => {
      event.preventDefault()

      const taskId = event.dataTransfer.getData('text/plain')
      onTaskDrop(taskId, this.status, this.dropTaskId)
    })
  }
}
