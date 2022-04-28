import { BaseResource } from '../common/base.resource.class';
import { initQuery, IRequestOptions } from '../common';
import { IQuoteResponse } from './quote.interfaces';

export class Quote extends BaseResource {
  constructor(LOTR_API_KEY?: string) {
    super(LOTR_API_KEY);
  }

  async getQuotes(requestOptions?: IRequestOptions): Promise<IQuoteResponse> {
    try {
      const url = '/quote';
      const response = await this.http.get(
        requestOptions ? `${url}${initQuery(requestOptions)}` : url
      );

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);

      return e.reponse;
    }
  }

  async getQuote(id: string): Promise<IQuoteResponse> {
    try {
      const response = await this.http.get(`/quote/${id}`);
      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);
      return e.reponse;
    }
  }
}
