import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import TasksListComponent from '../view/task-list-component.js';
import ClearButtonComonent from "../view/clear-button-component.js";

import {render} from '../framework/render.js';

export default class TasksBoardPresenter {
    #tasksBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #boardTasks = [];

    #tasksModel = null;

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
        render(this.#tasksBoardComponent, this.#boardContainer);

        for (const taskList of this.#boardTasks) {
            const status = taskList.status;

            const list = new TasksListComponent(status);

            render(list, this.#tasksBoardComponent.getElement());

            for (const task of taskList.tasks) {
                render(new TaskComponent(task), list.getElement().querySelector('.task-container-component'));
            }
        }

        const trashContainer = document.querySelector('.trash');

        if (trashContainer) {
            render(new ClearButtonComonent(), trashContainer);
        }
    }
}
