import { render, RenderPosition } from './framework/render.js'
import HeaderComponent from './view/header-component.js'
import AddTaskComponent from './view/add-task-component.js'
import DeskComponent from './view/task-board-component.js'
import TasksListComponent from './view/task-list-component.js'
import TaskComponent from './view/task-component.js'

const bodyContainer = document.querySelector('.body-component');
const addTaskContainer = document.querySelector('.add-task-component');
const deskContainer = document.querySelector('.main-component');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), addTaskContainer);
render(new DeskComponent(), deskContainer);

const taskListContainer = document.querySelector('.tasks-board-component');

for (let i = 0; i < 4; i++) {
    const list = new TasksListComponent();

    render(list, taskListContainer);

    const taskContainer = list.getElement().querySelector(".task-container-component");

    for (let j = 0; j < 3; j++) {
        render(new TaskComponent(), taskContainer);
    }
}