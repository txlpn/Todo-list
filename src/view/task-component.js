import BaseComponent from "../framework/base-component.js";

function createTaskTemplate(task) {
    // const {title, status} = task;
    return (
        //`<li>${title}</li>`
        `<li>${task}</li>`
    );
}

export default class TaskComponent extends BaseComponent {
    constructor(task) {
        super();
        this.task = task;
    }
    getTemplate() {
        return createTaskTemplate(this.task);
    }
}
