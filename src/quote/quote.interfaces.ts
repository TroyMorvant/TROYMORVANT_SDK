export interface IQuote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
}

export interface IQuoteResponse {
  docs: Array<IQuote>;
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}
