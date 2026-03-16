import Loader, { QueryParams } from './loader';

export default class AppLoader extends Loader {
  public constructor() {
    const baseUrl: string = process.env.API_URL ?? 'https://newsapi.org/v2/';
    const apiKey: string = process.env.API_KEY ?? '';
    const defaultOptions: QueryParams = { apiKey };
    super(baseUrl, defaultOptions);
  }
}

