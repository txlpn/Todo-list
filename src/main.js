import TasksBoardPresenter from './presenter/tasks-board-presenter.js'
import AddTaskFormComponent from './view/add-task-form-component.js'
import {render, RenderPosition} from './framework/render.js'
import TasksApiService from './api/tasks-api-service.js'
import HeaderComponent from './view/header-component.js'
import TasksModel from './model/task-model.js'

const END_POINT = 'https://6826672f397e48c913160069.mockapi.io/'

const bodyContainer = document.querySelector('.body-component')
const addTaskContainer = document.querySelector('.add-new-task-component')
const mainContainer = document.querySelector('.main-component')

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN)

const addTaskFormComponent = new AddTaskFormComponent({onClick: () => presenter.createTask()})
render(addTaskFormComponent, addTaskContainer)

const tasks = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT)
})
const presenter = new TasksBoardPresenter({
  boardContainer: mainContainer,
  tasksModel: tasks
})
presenter.init()