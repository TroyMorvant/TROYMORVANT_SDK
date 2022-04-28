import { ChapterFields, Chapter, SortDirection, IResponse } from '../src';
import { unset } from 'lodash';

describe('Chapter Tests', () => {
  it('Get All Chapters', async () => {
    const chapter = new Chapter(process.env.LOTR_API_KEY);
    const response = await chapter.getChapters();
    expect(response).toMatchSnapshot('get_all_chapters');
  });

  it('Get Specific Chapter', async () => {
    const chapter = new Chapter(process.env.LOTR_API_KEY);
    const response = await chapter.getChapter('6091b6d6d58360f988133b8b');
    expect(response).toMatchSnapshot('get_specific_chapter');
  });

  describe('Sorting Tests', () => {
    it('ALl Chapters Sort Descending', async () => {
      const chapter = new Chapter(process.env.LOTR_API_KEY);
      const response: IResponse = await chapter.getChapters({
        sortOptions: {
          property: ChapterFields.CHAPTER_NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_chapters_sorted_descending');
    });

    it('All Movies Sort Ascending', async () => {
      const chapter = new Chapter(process.env.LOTR_API_KEY);
      const response = await chapter.getChapters({
        sortOptions: {
          property: ChapterFields.CHAPTER_NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_chapters_sorted_ascending');
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
    it('Shows All Chapters', async () => {
      unset(pagingOptions, 'page');
      unset(pagingOptions, 'limit');
      unset(pagingOptions, 'offset');

      const chapters = new Chapter(process.env.LOTR_API_KEY);
      const response = await chapters.getChapters({
        sortOptions: {
          property: ChapterFields.CHAPTER_NAME,
          direction: SortDirection.DESCENDING,
        },
        pagingOptions: pagingOptions,
      });
      expect(response).toMatchSnapshot('all_chapters_no_paging');
    });

    describe('When Sorting Descending', () => {
      it('Page 0 Shows A Long-expected Party', async () => {
        const chapters = new Chapter(process.env.LOTR_API_KEY);
        const response = await chapters.getChapters({
          sortOptions: {
            property: ChapterFields.CHAPTER_NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].chapterName).toEqual('A Long-expected Party');
      });

      it('Page 2 Shows The Shadow of the Past', async () => {
        pagingOptions.page = 2;
        const chapters = new Chapter(process.env.LOTR_API_KEY);
        const response = await chapters.getChapters({
          sortOptions: {
            property: ChapterFields.CHAPTER_NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].chapterName).toEqual('The Shadow of the Past');
      });
    });
    describe('When Sorting Ascending', () => {
      it('Page 0 Shows A Long-expected Party', async () => {
        const chapters = new Chapter(process.env.LOTR_API_KEY);
        const response = await chapters.getChapters({
          sortOptions: {
            property: ChapterFields.CHAPTER_NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].chapterName).toEqual('A Long-expected Party');
      });

      it('Page 2 Shows The Shadow of the Past', async () => {
        pagingOptions.page = 2;
        const chapters = new Chapter(process.env.LOTR_API_KEY);
        const response = await chapters.getChapters({
          sortOptions: {
            property: ChapterFields.CHAPTER_NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].chapterName).toEqual('The Shadow of the Past');
      });
    });
  });
});
