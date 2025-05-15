import AbstractComponent from '../framework/abstract-component.js'

export default class HeaderComponent extends AbstractComponent {

  getTemplate() {
    return (
        `<header class="header">
          <h1>Список задач</h1>
       </header>`
    )
  }
}
