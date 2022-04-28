import { IBookResponse } from './book.interfaces';
import { BaseResource } from '../common/base.resource.class';
import { IRequestOptions, initQuery } from '../common';

export class Book extends BaseResource {
  constructor(LOTR_API_KEY?: string) {
    super(LOTR_API_KEY);
  }

  async getBooks(requestOptions?: IRequestOptions): Promise<IBookResponse> {
    try {
      const url = '/book';
      const response = await this.http.get(
        requestOptions ? `${url}${initQuery(requestOptions)}` : url
      );

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data, e.stack);

      return e.reponse.data;
    }
  }

  async getBook(id: string) {
    try {
      const response = await this.http.get(`/book/${id}`);

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data, e.stack);

      return e.reponse;
    }
  }
}
