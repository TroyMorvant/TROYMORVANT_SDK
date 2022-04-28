export interface IBook {
  _id: string;
  name: string;
}

export interface IBookResponse {
  docs: Array<IBook>;
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}
