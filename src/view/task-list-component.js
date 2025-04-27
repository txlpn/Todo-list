import AbstractComponent from '../framework/view/abstract-component.js';
import {StatusLabel } from "../const.js";

function createTasksListTemplate(label, status) {
    return (
        `<div class="display-tasks ${status}">
          <h3>${label}</h3>
          <ul class="task-container-component">
          </ul>
        </div>`
    );
}

export default class TasksListComponent extends AbstractComponent {
    constructor(status) {
        super();
        this.status = status;
    }

    get template() {
        const label = StatusLabel[this.status];
        return createTasksListTemplate(label, this.status);
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