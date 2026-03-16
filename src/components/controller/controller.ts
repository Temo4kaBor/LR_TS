import AppLoader from './appLoader';
import type { NewsApiEverythingResponse, NewsApiSourcesResponse } from '../../types/newsapi';

export default class AppController extends AppLoader {
  public getSources(callback: (data: NewsApiSourcesResponse) => void): void {
    super.getResp<NewsApiSourcesResponse>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews(e: MouseEvent, callback: (data: NewsApiEverythingResponse) => void): void {
    const newsContainer = e.currentTarget;
    if (!(newsContainer instanceof HTMLElement)) return;

    let target: Node | null = e.target as Node | null;

    while (target && target !== newsContainer) {
      if (target instanceof HTMLElement && target.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');
        if (!sourceId) return;

        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<NewsApiEverythingResponse>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode;
    }
  }
}

