import {tasks} from "../mock/task.js";
import {Status} from "../const.js";
import {generateID} from "../utils.js";

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(f => f.status === status)[0];
    }

    getTaskById(taskId) {
        for (const statusObj of this.#boardtasks) {
            const task = statusObj.tasks.find(task => task.id === taskId);
            if (task) {
                return {
                    status: statusObj,
                    task: task
                };
            }
        }
        return null;
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
        } else {
            backlogTask.tasks.push(newTask);
        }

        this._notifyObservers();
    }

    // updateTaskStatus(taskId, newStatus, dropTaskId) {
    //     const task = this.#boardtasks.find(task => task.id === taskId)
    //     const dropTask = this.#boardtasks.find(task => task.id === dropTaskId)
    //
    //     const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId)
    //     const dropTaskIndex = this.#boardtasks.findIndex(task => task.id === dropTaskId)
    //
    //     if (task && dropTask && taskIndex !== -1 && dropTaskIndex !== -1) {
    //         task.status = newStatus
    //
    //         this.#boardtasks.splice(taskIndex, 1)
    //         const newIndex = dropTaskIndex > taskIndex ? dropTaskIndex - 1 : dropTaskIndex
    //         this.#boardtasks.splice(newIndex, 0, task)
    //     }
    //
    //     this._notifyObservers()
    // }

    updateTaskStatus(taskId, newStatus, dropTaskId) {
        const {status, task} = this.getTaskById(taskId);
        if (task) {
            status.tasks = status.tasks.filter(task => task.id !== taskId);

            const newStatusObj = this.#boardtasks.find(statusObj => statusObj.status === newStatus);
            const dropTaskIndex = newStatusObj.tasks.findIndex(task => task.id === dropTaskId);

            console.log(dropTaskId)
            console.log(newStatusObj.tasks.find(task => task.id === dropTaskId))

            newStatusObj.tasks.splice(dropTaskIndex, 0, task)

            this._notifyObservers();
        }
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