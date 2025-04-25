import { tasks } from "../mock/task.js";
import { Status } from "../const.js";
import { generateID } from "../utils.js";

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }
    getTasksByStatus(status) {
        return this.#boardtasks.filter(f => f.status === status)[0];
    }

    createTask(title) {
        const newTask = {
            id: generateID(),
            name: title
        };

        const backlogTask = this.getTasksByStatus(Status.BACKLOG);

        if (!backlogTask) {
            this.#boardtasks.unshift({
                status: Status.BACKLOG,
                tasks: [newTask]
            });
        }
        else
        {
            backlogTask.tasks.push(newTask);
        }

        this._notifyObservers();
    }

    removeTrashTask() {
        const trashTasks = this.getTasksByStatus(Status.TRASH);

        trashTasks.tasks.length = 0;

        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    _notifyObservers() {
        this.#observers.forEach(observer => observer());
    }
}