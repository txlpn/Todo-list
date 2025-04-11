import HeaderComponent from './view/header-component.js'
import AddTaskComponent from './view/add-task-component.js'
import TasksBoardPresenter from './presenter/tasks-board-presenter.js'
import TasksModel from './model/task-model.js';

import { render, RenderPosition } from './framework/render.js'


const bodyContainer = document.querySelector('.body-component');
const addTaskContainer = document.querySelector('.add-task-component');
const taskBoardContainer = document.querySelector('.main-component');

const tasksModel = new TasksModel()

const tasksBoardPresenter = new TasksBoardPresenter(
    {boardContainer: taskBoardContainer,
        tasksModel: tasksModel,
    });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), addTaskContainer);

tasksBoardPresenter.init();