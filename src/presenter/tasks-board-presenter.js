import LoadingComponent from '../framework/view/loading-component.js'
import ClearButtonComponent from '../view/clear-button-component.js'
import TasksBoardComponent from '../view/tasks-board-component.js'
import EmptyListComponent from '../view/empty-list-component.js'
import TasksListComponent from '../view/tasks-list-component.js'
import TaskComponent from '../view/task-component.js'
import {render, destroy} from '../framework/render.js'
import {Status, UserAction} from '../const.js'

export default class TasksBoardPresenter {

  #tasksBoardComponent = null
  #loadingComponent = null
  #boardContainer = null
  #tasksModel = null

  constructor({boardContainer, tasksModel}) {
    this.#tasksBoardComponent = new TasksBoardComponent()
    this.#boardContainer = boardContainer
    this.#tasksModel = tasksModel

    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this))
  }

  async init() {
    await this.#loading(() => this.#tasksModel.init())
    this.#renderBoard()
  }

  #handleModelEvent(event, payload) {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard()
        this.#renderBoard()
    }
  }

  async #handleTaskDrop(taskId, newStatus, dropTaskId) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus, dropTaskId)
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error)
    }
  }

  async createTask() {
    const titleElement = document.querySelector('#new-task-title')
    const title = titleElement.value.trim()
    titleElement.value = ''
    if (!title) return
    try {
      await this.#tasksModel.createTask(title)
    } catch (error) {
      console.error('Ошибка при создании задачи:', error)
    }
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = ''
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer)

    for (const status in Status) {
      const tasksListComponent = new TasksListComponent(status, this.#handleTaskDrop.bind(this))
      render(tasksListComponent, this.#tasksBoardComponent.element)

      const tasksByStatus = this.#tasksModel.getTasksByStatus(status)
      this.#renderTasksList(tasksByStatus, status, tasksListComponent)
    }
  }

  #renderTasksList(tasks, status, container) {
    if (tasks.length > 0) {
      for (const task of tasks) {
        this.#renderTask(task, container.element)
      }
      if (Status[status] === Status.TRASH) {
        this.#renderClearButton(container)
      }
    } else {
      this.#renderEmptyList(container)
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task)
    render(taskComponent, container)
  }

  #renderEmptyList(container) {
    const emptyListComponent = new EmptyListComponent()
    render(emptyListComponent, container.element)
  }

  #renderClearButton(container) {
    const clearButtonComponent = new ClearButtonComponent({onClick: () => this.#tasksModel.clearTrash()})
    render(clearButtonComponent, container.element)
  }

  async #loading(promise) {
    this.#loadingComponent = new LoadingComponent()
    render(this.#loadingComponent, this.#boardContainer)
    try {
      await promise()
    } finally {
      destroy(this.#loadingComponent, this.#boardContainer)
    }
  }
}

