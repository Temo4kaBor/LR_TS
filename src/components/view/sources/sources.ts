import './sources.css';
import type { NewsApiSource } from '../../../types/newsapi';
import { cloneTemplateContent, getRequiredElement, getRequiredTemplate } from '../../../utils/dom';

export default class Sources {
  public draw(data: readonly NewsApiSource[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = getRequiredTemplate('#sourceItemTemp');

    data.forEach((item: NewsApiSource) => {
      const sourceClone: DocumentFragment = cloneTemplateContent(sourceItemTemp);

      const nameEl = sourceClone.querySelector<HTMLElement>('.source__item-name');
      if (nameEl) nameEl.textContent = item.name;

      const rootEl = sourceClone.querySelector<HTMLElement>('.source__item');
      if (rootEl) rootEl.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sourcesContainer = getRequiredElement<HTMLElement>('.sources');
    sourcesContainer.append(fragment);
  }
}

