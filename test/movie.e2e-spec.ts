import { SortDirection, Movie, MovieFields } from '../src';
import { unset } from 'lodash';

describe('Movie Tests', () => {
  it('Get All Movies', async () => {
    const movie = new Movie(process.env.LOTR_API_KEY);
    const response = await movie.getMovies();
    expect(response).toMatchSnapshot('get_all_movies');
  });

  it('Get Specific Movie', async () => {
    const movies = new Movie(process.env.LOTR_API_KEY);
    const response = await movies.getMovie('5cd95395de30eff6ebccde56');
    expect(response).toMatchSnapshot('get_specific_movie');
  });

  describe('Sorting Tests', () => {
    it('ALl Movies Sort Descending', async () => {
      const movie = new Movie(process.env.LOTR_API_KEY);
      const response = await movie.getMovies({
        sortOptions: {
          property: MovieFields.NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_movies_sorted_descending');
    });

    it('All Movies Sort By Budget Ascending', async () => {
      const movie = new Movie(process.env.LOTR_API_KEY);
      const response = await movie.getMovies({
        sortOptions: {
          property: MovieFields.BUDGET_MILLIONS,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_movies_sorted_ascending');
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
    it('Shows All Movies', async () => {
      unset(pagingOptions, 'page');
      unset(pagingOptions, 'limit');
      unset(pagingOptions, 'offset');

      const movies = new Movie(process.env.LOTR_API_KEY);
      const response = await movies.getMovies({
        sortOptions: {
          property: MovieFields.NAME,
          direction: SortDirection.DESCENDING,
        },
        pagingOptions: pagingOptions,
      });
      expect(response).toMatchSnapshot('all_movies_no_paging');
    });

    describe('When Sorting Descending', () => {
      it('Page 0 Shows The Unexpected Journey', async () => {
        const movies = new Movie(process.env.LOTR_API_KEY);
        const response = await movies.getMovies({
          sortOptions: {
            property: MovieFields.NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Unexpected Journey');
      });

      it('Page 5 Shows The Hobbit Series', async () => {
        pagingOptions.page = 5;
        const movies = new Movie(process.env.LOTR_API_KEY);
        const response = await movies.getMovies({
          sortOptions: {
            property: MovieFields.NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Hobbit Series');
      });
    });
    describe('When Sorting Ascending', () => {
      it('Page 0 Shows The Battle of the Five Armies', async () => {
        const movies = new Movie(process.env.LOTR_API_KEY);
        const response = await movies.getMovies({
          sortOptions: {
            property: MovieFields.NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Battle of the Five Armies');
      });

      it('Page 5 Shows The Lord of the Rings Series', async () => {
        pagingOptions.page = 5;
        const movies = new Movie(process.env.LOTR_API_KEY);
        const response = await movies.getMovies({
          sortOptions: {
            property: MovieFields.NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('The Lord of the Rings Series');
      });
    });
  });
});
