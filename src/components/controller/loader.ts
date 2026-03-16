export type QueryParamPrimitive = string | number | boolean;
export type QueryParams = Record<string, QueryParamPrimitive | undefined>;

export interface RequestConfig {
  endpoint: string;
  options?: QueryParams;
}

export type ResponseCallback<T> = (data: T) => void;

export default class Loader {
  private readonly baseLink: string;
  private readonly defaultOptions: QueryParams;

  public constructor(baseLink: string, options: QueryParams) {
    this.baseLink = baseLink;
    this.defaultOptions = options;
  }

  public getResp<TResponse>(
    { endpoint, options = {} }: RequestConfig,
    callback: ResponseCallback<TResponse> = () => {
      // eslint-disable-next-line no-console
      console.error('No callback for GET response');
    }
  ): void {
    this.load<TResponse>('GET', endpoint, callback, options);
  }

  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        // eslint-disable-next-line no-console
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw new Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: QueryParams, endpoint: string): string {
    const merged: QueryParams = { ...this.defaultOptions, ...options };
    const url = new URL(endpoint, this.baseLink);

    Object.entries(merged).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });

    return url.toString();
  }

  private load<TResponse>(
    method: 'GET',
    endpoint: string,
    callback: ResponseCallback<TResponse>,
    options: QueryParams = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(Loader.errorHandler)
      .then((res: Response) => res.json() as Promise<unknown>)
      .then((data: unknown) => callback(data as TResponse))
      .catch((err: unknown) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }
}

