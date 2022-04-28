import { BaseResource } from '../common/base.resource.class';
import { initQuery, IRequestOptions } from '../common';
import { ICharacterResponse } from './character.interfaces';

export class Character extends BaseResource {
  constructor(LOTR_API_KEY?: string) {
    super(LOTR_API_KEY);
  }

  async getCharacters(
    requestOptions?: IRequestOptions
  ): Promise<ICharacterResponse> {
    try {
      const url = '/character';
      const response = await this.http.get(
        requestOptions ? `${url}${initQuery(requestOptions)}` : url
      );

      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);

      return e.reponse;
    }
  }

  async getCharacter(id: string): Promise<ICharacterResponse> {
    try {
      const response = await this.http.get(`/character/${id}`);
      return JSON.parse(response.data);
    } catch (e) {
      this.logger.error(e.response.data);
      return e.reponse;
    }
  }
}
