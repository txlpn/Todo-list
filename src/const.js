const Status = {
  BACKLOG: `backlog`,
  PROCESSING: `processing`,
  DONE: `done`,
  TRASH: `trash`
}

const StatusLabel = {
  BACKLOG: `🖇️ Бэклог`,
  PROCESSING: `⬆️ В процессе`,
  DONE: `✅ Готово`,
  TRASH: `🗑️ Корзина`
}

const UserAction = {
  ADD_TASK: `ADD_TASK`,
  UPDATE_TASK: `UPDATE_TASK`,
  DELETE_TASK: `DELETE_TASK`
}

const UpdateTask = {
  MAJOR: `MAJOR`,
  MINOR: `MINOR`,
  PATCH: `PATCH`,
  INIT: `INIT`
}

export {Status, StatusLabel, UserAction, UpdateTask}