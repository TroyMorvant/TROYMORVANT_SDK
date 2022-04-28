import { IBook } from '../book';
import { SortDirection } from './common.enums';
import { MovieFields } from '../movie';
import { BookFields } from '../book';
import { IMovie } from '../movie';
import { IChapter } from '../chapter';
import { IQuote } from '../quote';
import { ICharacter } from '../character';
import { QuoteFields } from '../quote';
import { ChapterFields } from '../chapter';
import { CharacterFields } from '../character';

export interface IRequestOptions {
  sortOptions?: ISortOptions;
  pagingOptions?: IPagingOptions;
}

export interface IResponse {
  docs: Array<IBook | IMovie | IChapter | IQuote | ICharacter>;
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

export interface ISortOptions {
  direction: SortDirection;
  property:
    | BookFields
    | MovieFields
    | QuoteFields
    | ChapterFields
    | CharacterFields;
}

export interface IPagingOptions {
  limit?: number;
  page: number;
  offset: number;
}
