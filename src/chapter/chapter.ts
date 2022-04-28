import { initQuery, IRequestOptions } from '../common';
import { BaseResource } from '../common/base.resource.class';
import { IChapterResponse } from '../chapter';

export class Chapter extends BaseResource {
  constructor(LOTR_API_KEY?: string) {
    super(LOTR_API_KEY);
  }

  async getChapters(
    requestOptions?: IRequestOptions
  ): Promise<IChapterResponse> {
    try {
      const url = '/chapter';
      const response = await this.http.get(
        requestOptions ? `${url}${initQuery(requestOptions)}` : url
      );

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);

      return e.reponse;
    }
  }

  async getChapter(id: string): Promise<IChapterResponse> {
    try {
      const response = await this.http.get(`/chapter/${id}`);

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);

      return e.reponse;
    }
  }
}
