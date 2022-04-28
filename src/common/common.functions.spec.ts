import {
  SortDirection,
  IPagingOptions,
  IRequestOptions,
  ISortOptions,
  appendPagingParams,
  appendSortingParams,
  initQuery,
} from './';
import { BookFields } from '../book';
import { unset } from 'lodash';

describe('Common Functions Test', () => {
  describe('Testing InitQuery()', () => {
    describe('When Specifying Sorting Options', () => {
      describe('And Paging Options Are Null', () => {
        it('Sort Ascending Correctly Defined', () => {
          const requestOptions: IRequestOptions = {
            sortOptions: {
              property: BookFields.NAME,
              direction: SortDirection.ASCENDING,
            },
          };

          const qs = initQuery(requestOptions);
          expect(qs).toEqual('?sort=name:asc');
        });

        it('Sort Descending Correctly Defined', () => {
          const requestOptions: IRequestOptions = {
            sortOptions: {
              property: BookFields.ID,
              direction: SortDirection.DESCENDING,
            },
          };

          const qs = initQuery(requestOptions);
          expect(qs).toEqual('?sort=_id:desc');
        });
      });

      describe('With Paging Options', () => {
        it('Sort Ascending Correctly Defined', () => {
          const requestOptions: IRequestOptions = {
            sortOptions: {
              property: BookFields.NAME,
              direction: SortDirection.ASCENDING,
            },
            pagingOptions: {
              limit: 2,
              page: 1,
              offset: 3,
            },
          };

          const qs = initQuery(requestOptions);
          expect(qs).toEqual('?sort=name:asc&limit=2&offset=3&page=1');
        });

        it('Sort Descending Correctly Defined', () => {
          const requestOptions: IRequestOptions = {
            sortOptions: {
              property: BookFields.NAME,
              direction: SortDirection.ASCENDING,
            },
            pagingOptions: {
              limit: 2,
              page: 2,
              offset: 0,
            },
          };

          const qs = initQuery(requestOptions);
          expect(qs).toEqual('?sort=name:asc&limit=2&page=2');
        });
      });
    });
  });

  describe('Testing AppendPagingParams()', () => {
    let qs = '';
    let pagingOptions: IPagingOptions;

    beforeEach(() => {
      pagingOptions = {
        limit: 2,
        page: 2,
        offset: 1,
      };
    });

    describe('When Paging Options Are Null', () => {
      it('Returns Empty String', () => {
        unset(pagingOptions, 'page');
        unset(pagingOptions, 'offset');
        unset(pagingOptions, 'limit');

        expect(appendPagingParams(qs, pagingOptions)).toEqual('');
      });
    });

    describe('When Limit Is Missing', () => {
      it('String Is Formatted Correctly', () => {
        unset(pagingOptions, 'limit');

        expect(appendPagingParams(qs, pagingOptions)).toEqual(
          '?offset=1&page=2'
        );
      });
    });
    describe('When Offset Is Missing', () => {
      it('String Is Formatted Correctly', () => {
        unset(pagingOptions, 'offset');

        expect(appendPagingParams(qs, pagingOptions)).toEqual(
          '?limit=2&page=2'
        );
      });
    });
    describe('When Page Is Missing', () => {
      it('String Is Formatted Correctly', () => {
        unset(pagingOptions, 'page');

        expect(appendPagingParams(qs, pagingOptions)).toEqual(
          '?limit=2&offset=1'
        );
      });
    });
  });
  describe('Testing AppendSortingParams()', () => {
    let qs = '';
    let sortingOptions: ISortOptions;
    beforeEach(() => {
      sortingOptions = {
        property: BookFields.ID,
        direction: SortDirection.DESCENDING,
      };
    });
    describe('When Sorting Options Are Null', () => {
      it('Exception is thrown', () => {
        unset(sortingOptions, 'property');
        unset(sortingOptions, 'direction');

        expect(() => appendSortingParams(qs, sortingOptions)).toThrow();
      });
    });
    describe('When Property Is Missing', () => {
      it('Exception is thrown', () => {
        unset(sortingOptions, 'property');

        expect(() => appendSortingParams(qs, sortingOptions)).toThrow();
      });
    });
    describe('When Direction Is Missing', () => {
      it('String Is Formatted Ascending', () => {
        unset(sortingOptions, 'direction');

        expect(appendSortingParams(qs, sortingOptions)).toEqual(
          '?sort=_id:asc'
        );
      });
    });
  });
});
