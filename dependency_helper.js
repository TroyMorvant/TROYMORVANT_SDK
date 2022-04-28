// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readdirSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const madge = require('madge');

// Base Module
madge('src/index.ts').then((res) => {
  res.image('dependency_graph.svg').then((writtenImagePath) => {
    console.log('Image written to ' + writtenImagePath);
  });
});

// Sub Modules
readdirSync('src', { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => {
    madge(`src/${dir.name}/index.ts`)
      .then((res) => res.image(`src/${dir.name}/dependency_graph.svg`))
      .then((writtenImagePath) => {
        console.log('Image written to ' + writtenImagePath);
      });
  });
