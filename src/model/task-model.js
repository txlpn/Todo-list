import {Status, UpdateTask as UpdateType, UserAction} from '../const.js'
import {generateID} from '../utils.js'
import Observable from '../framework/observable.js'

export default class TasksModel extends Observable {
  #tasksApiService = null
  #boardTasks = []

  constructor({tasksApiService}) {
    super()
    this.#tasksApiService = tasksApiService
  }

  async init() {
    try {
      this.#boardTasks = await this.#tasksApiService.tasks;
    } catch(err) {
      this.#boardTasks = []
    }
    this._notify(UpdateType.INIT)
  }

  async createTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID()
    };
    try {
      const createdTask = await this.#tasksApiService.createTask(newTask)
      this.#boardTasks.push(createdTask)
      this._notify(UserAction.ADD_TASK, createdTask)
      return createdTask
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err)
      throw err
    }
  }

  async updateTaskStatus(taskId, newStatus, dropTaskId) {

    const task = this.#boardTasks.find(task => task.id === taskId)
    const dropTask = this.#boardTasks.find(task => task.id === dropTaskId)

    const taskIndex = this.#boardTasks.findIndex(task => task.id === taskId)
    const dropTaskIndex = this.#boardTasks.findIndex(task => task.id === dropTaskId)

    const prevStatus = task.status

    if (task && dropTask && taskIndex !== -1 && dropTaskIndex !== -1) {
      task.status = newStatus

      this.#boardTasks.splice(taskIndex, 1)
      const newIndex = dropTaskIndex > taskIndex ? dropTaskIndex - 1 : dropTaskIndex
      this.#boardTasks.splice(newIndex, 0, task)
    }

    if (!dropTask) {
      task.status = newStatus
    }

    try {
      const updatedTask = await this.#tasksApiService.updateTask(task)
      Object.assign(task, updatedTask)
      this._notify(UserAction.UPDATE_TASK, task)
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи на сервере:', error)
      task.status = prevStatus
      throw error
    }
  }

  getTasksByStatus(status) {
    return this.#boardTasks
      .filter(it => Status[status] === it.status)
  }

  async clearTrash() {
    try {
      await Promise.all(
          this.#boardTasks
            .filter(it => it.status === Status.TRASH)
            .map(it => this.#tasksApiService.deleteTask(it.id))
      )
      this.#boardTasks = this.#boardTasks
        .filter(it => it.status !== Status.TRASH)
      this._notify(UserAction.DELETE_TASK, {status: 'trash'})
    } catch (error) {
      console.error('Ошибка при удалении задач из корзины на сервере:', error)
      throw error
    }
  }
}
