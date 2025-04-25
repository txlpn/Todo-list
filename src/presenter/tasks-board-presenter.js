import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import TasksListComponent from '../view/task-list-component.js';
import StubComponent from "../view/stub-component.js";

import {render} from '../framework/render.js';

export default class TasksBoardPresenter {
    #tasksBoardComponent = new TaskBoardComponent();
    #clearButtonComponent = null;
    #boardContainer = null;
    #boardTasks = [];
    #tasksModel = null;

    constructor({boardContainer, tasksModel, clearButtonComponent}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#clearButtonComponent = clearButtonComponent;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    #renderBoard() {
        if (this.#tasksModel.tasks.length != this.#boardTasks.length) {
            this.#boardTasks = [...this.#tasksModel.tasks];
        }
        render(this.#tasksBoardComponent, this.#boardContainer);

        this.#boardTasks.forEach((taskGroup) => {
            this.#renderTaskList(taskGroup.status, taskGroup.tasks);
        });

        this.#renderClearButton();
    }
    createTask() {
        const taskTitle = document.querySelector('.add-task__input').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.add-task__input').value = '';
    }

    clearTrash() {
        this.#tasksModel.removeTrashTask();
    }
    #renderTask(task, container) {
        render(new TaskComponent(task.name), container.element.querySelector('.task-container-component'));
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status);

        render(list, this.#tasksBoardComponent.element);

        tasks.length === 0 ? this.#renderStubComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task, list);
        });
    }

    #renderClearButton() {
        const trashContainer = document.querySelector('.trash');

        const trashTasks = trashContainer?.querySelector('li');

        if (trashContainer && trashTasks) {
            render(this.#clearButtonComponent, trashContainer);
        }
    }

    #renderStubComponent(container) {
        render(new StubComponent(), container.element);
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
}
