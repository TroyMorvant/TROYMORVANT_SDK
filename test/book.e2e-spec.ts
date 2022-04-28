import { SortDirection, BookFields, Book } from '../src';
import { unset } from 'lodash';

describe('Book Tests', () => {
  it('Get All Books', async () => {
    const books = new Book(process.env.LOTR_API_KEY);
    const response = await books.getBooks();
    expect(response).toMatchSnapshot('get_all_books');
  });

  it('Get Specific Book', async () => {
    const books = new Book(process.env.LOTR_API_KEY);
    const response = await books.getBook('5cf5805fb53e011a64671582');
    expect(response).toMatchSnapshot('get_specific_book');
  });

  describe('Sorting Tests', () => {
    it('ALl Books Sort Descending', async () => {
      const books = new Book(process.env.LOTR_API_KEY);
      const response = await books.getBooks({
        sortOptions: {
          property: BookFields.NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_books_sorted_descending');
    });

    it('All Books Sort Ascending', async () => {
      const books = new Book(process.env.LOTR_API_KEY);
      const response = await books.getBooks({
        sortOptions: {
          property: BookFields.NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_books_sorted_ascending');
    });
  });
  describe('Paging Tests', () => {
    let pagingOptions;

    beforeEach(() => {
      pagingOptions = {
        limit: 1,
        page: 0,
        offset: 0,
      };
    });
    it('Shows All Books', async () => {
      unset(pagingOptions, 'page');
      unset(pagingOptions, 'limit');
      unset(pagingOptions, 'offset');

      const books = new Book(process.env.LOTR_API_KEY);
      const response = await books.getBooks({
        sortOptions: {
          property: BookFields.NAME,
          direction: SortDirection.DESCENDING,
        },
        pagingOptions: pagingOptions,
      });
      expect(response).toMatchSnapshot('all_books_no_paging');
    });

    describe('When Sorting Descending', () => {
      it('Page 0 Shows Two Towers', async () => {
        const books = new Book(process.env.LOTR_API_KEY);
        const response = await books.getBooks({
          sortOptions: {
            property: BookFields.NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Two Towers');
      });

      it('Page 2 Shows The Fellowship Of The Ring', async () => {
        pagingOptions.page = 2;
        const books = new Book(process.env.LOTR_API_KEY);
        const response = await books.getBooks({
          sortOptions: {
            property: BookFields.NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Return Of The King');
      });
    });
    describe('When Sorting Ascending', () => {
      it('Page 0 Shows The Fellowship Of The Ring', async () => {
        const books = new Book(process.env.LOTR_API_KEY);
        const response = await books.getBooks({
          sortOptions: {
            property: BookFields.NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Fellowship Of The Ring');
      });

      it('Page 2 Shows The Return Of The King', async () => {
        pagingOptions.page = 2;
        const books = new Book(process.env.LOTR_API_KEY);
        const response = await books.getBooks({
          sortOptions: {
            property: BookFields.NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Return Of The King');
      });
    });
  });
});
