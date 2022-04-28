import { QuoteFields, Quote, SortDirection } from '../src';
import { unset } from 'lodash';

describe('Quote Tests', () => {
  it('Get All Quotes', async () => {
    const quotes = new Quote(process.env.LOTR_API_KEY);
    const response = await quotes.getQuotes();
    expect(response).toMatchSnapshot('get_all_quotes');
  });

  it('Get Specific Quote', async () => {
    const quotes = new Quote(process.env.LOTR_API_KEY);
    const response = await quotes.getQuote('5cd96e05de30eff6ebcce7ec');
    expect(response).toMatchSnapshot('get_specific_quote');
  });

  describe('Sorting Tests', () => {
    it('ALl Quotes Sort Descending', async () => {
      const quotes = new Quote(process.env.LOTR_API_KEY);
      const response = await quotes.getQuotes({
        sortOptions: {
          property: QuoteFields.DIALOG,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_quotes_sorted_descending');
    });

    it('All Quotes Sort Ascending', async () => {
      const quotes = new Quote(process.env.LOTR_API_KEY);
      const response = await quotes.getQuotes({
        sortOptions: {
          property: QuoteFields.DIALOG,
          direction: SortDirection.ASCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_quotes_sorted_ascending');
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
    it('Shows All Quotes', async () => {
      unset(pagingOptions, 'page');
      unset(pagingOptions, 'limit');
      unset(pagingOptions, 'offset');

      const quotes = new Quote(process.env.LOTR_API_KEY);
      const response = await quotes.getQuotes({
        sortOptions: {
          property: QuoteFields.DIALOG,
          direction: SortDirection.DESCENDING,
        },
        pagingOptions: pagingOptions,
      });
      expect(response).toMatchSnapshot('all_quotes_no_paging');
    });

    describe('When Sorting Descending', () => {
      it('Page 0 Shows well, yes. At least well enough for my own people. But we have no songs for great halls and evil times.', async () => {
        const quotes = new Quote(process.env.LOTR_API_KEY);
        const response = await quotes.getQuotes({
          sortOptions: {
            property: QuoteFields.DIALOG,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].dialog).toEqual(
          'well, yes. At least well enough for my own people. But we have no songs for great halls and evil times.'
        );
      });

      it('Page 5 Shows lt is!', async () => {
        pagingOptions.page = 5;
        const quotes = new Quote(process.env.LOTR_API_KEY);
        const response = await quotes.getQuotes({
          sortOptions: {
            property: QuoteFields.DIALOG,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].dialog).toEqual('lt is!');
      });
    });
    describe('When Sorting Ascending', () => {
      it('Page 0 Shows ""', async () => {
        const quotes = new Quote(process.env.LOTR_API_KEY);
        const response = await quotes.getQuotes({
          sortOptions: {
            property: QuoteFields.DIALOG,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].dialog).toEqual('');
      });

      it('Page 5 Shows -bedin o gurth ne dagor.s', async () => {
        pagingOptions.page = 10;
        const quotes = new Quote(process.env.LOTR_API_KEY);
        const response = await quotes.getQuotes({
          sortOptions: {
            property: QuoteFields.DIALOG,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].dialog).toEqual("'-bedin o gurth ne dagor.");
      });
    });
  });
});
