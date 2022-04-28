export interface IChapter {
  _id: string;
  chapterName: string;
  book: string;
}

export interface IChapterResponse {
  docs: Array<IChapter>;
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}
