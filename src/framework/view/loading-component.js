import AbstractComponent from '../abstract-component.js'

export default class LoadingComponent extends AbstractComponent {

  getTemplate() {
    return (
        `<p class="loading">
          Загрузка...
        </p>`
    )
  }
}
