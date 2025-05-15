import AbstractComponent from './abstract-component.js'

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
}

function createElement(template) {
  const newElement = document.createElement('div')
  newElement.innerHTML = template

  return newElement.firstElementChild
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Container element doesn\'t exist')
  }

  container.insertAdjacentElement(place, component.getElement())
}

function destroy(component, container) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Component is not an instance of AbstractComponent')
  }

  const element = component.getElement()

  if (element && container.contains(element)) {
    container.removeChild(element)
    component.removeElement()
  } else {
    console.warn('Element is not in the container or does not exist')
  }
}

export {RenderPosition, createElement, render, destroy}
