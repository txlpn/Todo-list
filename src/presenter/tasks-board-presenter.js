import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import TasksListComponent from '../view/task-list-component.js';
import StubComponent from "../view/stub-component.js";

import {render} from '../framework/render.js';

export default class TasksBoardPresenter {
    #tasksBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #boardTasks = [];
    #tasksModel = null;
    #clearButtonComponent = null;

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

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #handleTaskDrop(taskId, newStatus, dropTaskId) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus, dropTaskId)
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
        //const taskTitle = document.querySelector('.add-task__input').value.trim();

        const titleElement = document.querySelector('.add-task__input')
        const taskTitle = titleElement.value.trim()
        titleElement.value = ''

        if (!taskTitle) return
            this.#tasksModel.createTask(taskTitle)
    }

    clearTrash() {
        this.#tasksModel.removeTrashTask();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent(task);
        render(taskComponent, container.element.querySelector('.task-container-component'));

        taskComponent.element.setAttribute('draggable', 'true');
        taskComponent.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', task.id);
        });
        taskComponent.element.addEventListener('dragend', (event) => {
            const x = event.clientX;
            const y = event.clientY;
            const elementBelow = document.elementFromPoint(x, y);
            const newStatus = elementBelow.closest('.display-tasks')?.classList[1];
            if (newStatus) {
                const closestTask = elementBelow.closest('.task')
                this.#handleTaskDrop(task.id, newStatus, closestTask?.dataset.id);
            }
        });
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status);

        render(list, this.#tasksBoardComponent.element);

        tasks.length === 0 ? this.#renderStubComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task, list);
        });

        // Добавляем обработчик для drop
        list.element.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        // list.element.addEventListener('drop', (event) => {
        //     event.preventDefault();
        //     const taskId = event.dataTransfer.getData('text/plain');
        //     const newStatus = status;
        //     const dropTaskId = taskId;
        //     this.#handleTaskDrop(taskId, newStatus, dropTaskId);
        // });
    }

    #renderClearButton() {
        const trashContainer = document.querySelector('.trash');

        const trashTasks = trashContainer?.querySelector('li');

        if (trashContainer && trashTasks) {
            render(this.#clearButtonComponent, trashContainer);
        }
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #renderStubComponent(container) {
        render(new StubComponent(), container.element);
    }
}
