export type NewsApiStatus = 'ok' | 'error';

export interface NewsApiSource {
  id: string;
  name: string;
  description?: string;
  url?: string;
  category?: string;
  language?: string;
  country?: string;
}

export interface NewsApiArticleSourceRef {
  id: string | null;
  name: string;
}

export interface NewsApiArticle {
  source: NewsApiArticleSourceRef;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601
  content: string | null;
}

export interface NewsApiErrorResponse {
  status: 'error';
  code?: string;
  message: string;
}

export interface NewsApiSourcesResponse {
  status: 'ok';
  sources: NewsApiSource[];
}

export interface NewsApiEverythingResponse {
  status: 'ok';
  totalResults: number;
  articles: NewsApiArticle[];
}

