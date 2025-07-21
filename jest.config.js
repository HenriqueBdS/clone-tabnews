const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: '.',
});
const jestConfig = createJestConfig({
  setupFiles: ["./jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;