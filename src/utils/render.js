export const ElementPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const render = (container, component, place) => {
  switch (place) {
    case ElementPosition.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case ElementPosition.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};
