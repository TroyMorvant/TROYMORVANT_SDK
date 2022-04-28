// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readdirSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const madge = require('madge');

// Base Module
madge('src/index.ts').then((res) => {
  res.image('dependency_graph.svg').then((writtenImagePath) => {
    console.log('Image written to ' + writtenImagePath);
  });
  res.image('libs/dependency_graph.svg').then((writtenImagePath) => {
    console.log('Image written to ' + writtenImagePath);
  });
});

// Sub Modules
readdirSync('libs', { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => {
    madge(`libs/${dir.name}/index.ts`)
      .then((res) => res.image(`libs/${dir.name}/dependency_graph.svg`))
      .then((writtenImagePath) => {
        console.log('Image written to ' + writtenImagePath);
      });
  });
