import './news.css';
import type { NewsApiArticle } from '../../../types/newsapi';
import { cloneTemplateContent, getRequiredTemplate, getRequiredElement } from '../../../utils/dom';

export default class News {
  public draw(data: readonly NewsApiArticle[]): void {
    const news: readonly NewsApiArticle[] = data.length >= 10 ? data.slice(0, 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = getRequiredTemplate('#newsItemTemp');

    news.forEach((item: NewsApiArticle, idx: number) => {
      const newsClone: DocumentFragment = cloneTemplateContent(newsItemTemp);

      const cloneRoot = newsClone.querySelector<HTMLElement>('.news__item');
      if (!cloneRoot) return;
      if (idx % 2) cloneRoot.classList.add('alt');

      const photoEl = newsClone.querySelector<HTMLElement>('.news__meta-photo');
      if (photoEl) {
        photoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      }

      const authorEl = newsClone.querySelector<HTMLElement>('.news__meta-author');
      if (authorEl) {
        authorEl.textContent = item.author || item.source.name;
      }

      const dateEl = newsClone.querySelector<HTMLElement>('.news__meta-date');
      if (dateEl) {
        dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }

      const titleEl = newsClone.querySelector<HTMLElement>('.news__description-title');
      if (titleEl) titleEl.textContent = item.title;

      const sourceEl = newsClone.querySelector<HTMLElement>('.news__description-source');
      if (sourceEl) sourceEl.textContent = item.source.name;

      const contentEl = newsClone.querySelector<HTMLElement>('.news__description-content');
      if (contentEl) contentEl.textContent = item.description ?? '';

      const linkEl = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
      if (linkEl) linkEl.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsContainer = getRequiredElement<HTMLElement>('.news');
    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);
  }
}

