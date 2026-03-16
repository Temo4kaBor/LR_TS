export function getRequiredElement<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) {
    throw new Error(`Required element not found: ${selector}`);
  }
  return el;
}

export function getRequiredTemplate(selector: string): HTMLTemplateElement {
  const tpl = getRequiredElement<HTMLTemplateElement>(selector);
  if (!(tpl instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a template: ${selector}`);
  }
  return tpl;
}

export function cloneTemplateContent(template: HTMLTemplateElement): DocumentFragment {
  return template.content.cloneNode(true) as DocumentFragment;
}

