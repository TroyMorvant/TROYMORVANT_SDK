## Summary
So I decided to just mimic the functionality of the API as closely as possible and rather than add a bunch of abstractions with different data aggregation, I focused my attention on developer experience.

### Organizational Structure

Given the small size of this API I could have dropped all the code in `./src` however given the nature of the task, I decided to pretend as if this API would grow and in order to make it easy and intuitive to navigate to the correct file, I grouped the code by domains; matching the design of the API:

- Book
- Movie
- Character
- Chapter
- Quote

### Developer Experience

To improve design time experience and to fully leverage the power of TypeScript in helping to prevent bugs, I leaned into creating a number of `interfaces` and `enums` so the engineer doesn't need to constantly refer back to the code to remember how to reference properties.

For example; consider the Character class.  It has a number of fields.

```typescript
export enum CharacterFields {
  ID = '_id',
  DEATH = 'death',
  BIRTH = 'birth',
  HAIR = 'hair',
  REALM = 'realm',
  HEIGHT = 'height',
  SPOUSE = 'spouse',
  GENDER = 'gender',
  NAME = 'name',
  RACE = 'race',
}
```

This way when defining the sort options, the developer doesn't have to remember precisely how that field is labaled, and the interface insures that  

```typescript
const sortingOptions: ISortingOptions = { 
    property: CharacterFields.BIRTH, 
    direction: SortDirection.ASCENDING 
}
```