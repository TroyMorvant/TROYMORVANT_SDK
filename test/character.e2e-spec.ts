import { Character, CharacterFields, SortDirection } from '../src';
import { unset } from 'lodash';

describe('Character Tests', () => {
  it('Get All Characters', async () => {
    const characters = new Character();
    const response = await characters.getCharacters();
    expect(response).toMatchSnapshot('get_all_characters');
  });

  it('Get Specific Character', async () => {
    const characters = new Character();
    const response = await characters.getCharacter('5cd99d4bde30eff6ebccfbbe');
    expect(response).toMatchSnapshot('get_specific_character');
  });

  describe('Sorting Tests', () => {
    it('ALl Characters Sort Descending', async () => {
      const characters = new Character();
      const response = await characters.getCharacters({
        sortOptions: {
          property: CharacterFields.NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_characters_sorted_descending');
    });

    it('All Characters Sort Ascending', async () => {
      const characters = new Character();
      const response = await characters.getCharacters({
        sortOptions: {
          property: CharacterFields.NAME,
          direction: SortDirection.DESCENDING,
        },
      });
      expect(response).toMatchSnapshot('all_characters_sorted_ascending');
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
    it('Shows All Characters', async () => {
      unset(pagingOptions, 'page');
      unset(pagingOptions, 'limit');
      unset(pagingOptions, 'offset');

      const characters = new Character(process.env.LOTR_API_KEY);
      const response = await characters.getCharacters({
        sortOptions: {
          property: CharacterFields.NAME,
          direction: SortDirection.DESCENDING,
        },
        pagingOptions: pagingOptions,
      });
      expect(response).toMatchSnapshot('all_characters_no_paging');
    });

    describe('When Sorting Descending', () => {
      it("Page 0 Shows Óin (King of Durin's Folk)", async () => {
        const characters = new Character(process.env.LOTR_API_KEY);
        const response = await characters.getCharacters({
          sortOptions: {
            property: CharacterFields.NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual("Óin (King of Durin's Folk)");
      });

      it('Page 5 Shows Írimë', async () => {
        pagingOptions.page = 5;
        const characters = new Character(process.env.LOTR_API_KEY);
        const response = await characters.getCharacters({
          sortOptions: {
            property: CharacterFields.NAME,
            direction: SortDirection.DESCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('Írimë');
      });
    });
    describe('When Sorting Ascending', () => {
      it('Page 0 Shows Adaldrida (Bolger) Brandybuck', async () => {
        const characters = new Character(process.env.LOTR_API_KEY);
        const response = await characters.getCharacters({
          sortOptions: {
            property: CharacterFields.NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('Adaldrida (Bolger) Brandybuck');
      });

      it('Page 5 Shows Adanel', async () => {
        pagingOptions.page = 5;
        const characters = new Character(process.env.LOTR_API_KEY);
        const response = await characters.getCharacters({
          sortOptions: {
            property: CharacterFields.NAME,
            direction: SortDirection.ASCENDING,
          },
          pagingOptions: pagingOptions,
        });
        expect(response.docs[0].name).toEqual('Adanel');
      });
    });
  });
});
