import HeaderComponent from './view/header-component.js'
import AddTaskComponent from './view/add-task-component.js'
import TasksBoardPresenter from './presenter/tasks-board-presenter.js'
import TasksModel from './model/task-model.js'
import ClearButtonComponent from './view/clear-button-component.js'

import { render, RenderPosition } from './framework/render.js'

const bodyContainer = document.querySelector('.body-component');
const addTaskContainer = document.querySelector('.add-task-component');
const taskBoardContainer = document.querySelector('.main-component');

const tasksModel = new TasksModel()
const clearButtonComponent = new ClearButtonComponent({
    onClick: handleClearTrashButtonClick
});

const tasksBoardPresenter = new TasksBoardPresenter(
    {
        boardContainer: taskBoardContainer,
        tasksModel: tasksModel,
        clearButtonComponent: clearButtonComponent
    });

const formAddTaskComponent = new AddTaskComponent({
    onClick: handleAddNewTaskButtonClick
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, addTaskContainer);

tasksBoardPresenter.init();

function handleAddNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}

function handleClearTrashButtonClick() {
    tasksBoardPresenter.clearTrash();
}