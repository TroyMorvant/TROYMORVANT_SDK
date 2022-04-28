export interface ICharacter {
  _id: string;
  death: string;
  birth: string;
  hair: string;
  realm: string;
  height: string;
  spouse: string;
  gender: string;
  name: string;
  race: string;
}

export interface ICharacterResponse {
  docs: Array<ICharacter>;
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}
