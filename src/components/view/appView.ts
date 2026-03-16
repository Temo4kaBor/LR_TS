import News from './news/news';
import Sources from './sources/sources';
import type { NewsApiEverythingResponse, NewsApiSourcesResponse } from '../../types/newsapi';

export class AppView {
  private readonly news: News;
  private readonly sources: Sources;

  public constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: NewsApiEverythingResponse): void {
    const values = data.articles ?? [];
    this.news.draw(values);
  }

  public drawSources(data: NewsApiSourcesResponse): void {
    const values = data.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;

