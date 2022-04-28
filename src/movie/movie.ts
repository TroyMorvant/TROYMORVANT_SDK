import { BaseResource } from '../common/base.resource.class';
import { initQuery, IRequestOptions } from '../common';
import { IMovieResponse } from './movie.interfaces';

export class Movie extends BaseResource {
  constructor(LOTR_API_KEY?: string) {
    super(LOTR_API_KEY);
  }

  async getMovies(requestOptions?: IRequestOptions): Promise<IMovieResponse> {
    try {
      const url = '/movie';
      const response = await this.http.get(
        requestOptions ? `${url}${initQuery(requestOptions)}` : url
      );

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);

      return e.reponse;
    }
  }

  async getMovie(id: string): Promise<IMovieResponse> {
    try {
      const response = await this.http.get(`/movie/${id}`);
      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);
      return e.reponse;
    }
  }
}
