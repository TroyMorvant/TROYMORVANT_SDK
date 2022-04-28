import {
  IPagingOptions,
  IRequestOptions,
  ISortOptions,
} from './common.interface';
import { ResponseFields, SortDirection } from './common.enums';

export function initQuery(requestOptions: IRequestOptions): string {
  let qs = '';

  if (requestOptions?.sortOptions) {
    qs = appendSortingParams(qs, requestOptions.sortOptions);
  }

  if (requestOptions?.pagingOptions) {
    qs = appendPagingParams(qs, requestOptions.pagingOptions);
  }

  return qs;
}

export function appendPagingParams(
  qs: string,
  pagingOptions: IPagingOptions
): string {
  if (pagingOptions.limit) {
    const param = `${ResponseFields.LIMIT}=${pagingOptions.limit}`;
    qs = qs.includes('?') ? `${qs}&${param}` : `?${param}`;
  }

  if (pagingOptions.offset) {
    const param = `${ResponseFields.OFFSET}=${pagingOptions.offset}`;
    qs = qs.includes('?') ? `${qs}&${param}` : `?${param}`;
  }

  if (pagingOptions.page) {
    const param = `${ResponseFields.PAGE}=${pagingOptions.page}`;
    qs = qs.includes('?') ? `${qs}&${param}` : `?${param}`;
  }

  return qs;
}

export function appendSortingParams(qs: string, sortingOptions: ISortOptions) {
  if (sortingOptions && !sortingOptions.property) {
    throw new Error('Property cannot be null');
  }

  if (!sortingOptions.direction) {
    sortingOptions.direction = SortDirection.ASCENDING;
  }

  return qs.includes('?')
    ? `${qs}&sort=${sortingOptions.property}:${sortingOptions.direction}`
    : `?sort=${sortingOptions.property}:${sortingOptions.direction}`;
}
