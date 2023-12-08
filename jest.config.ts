// const esModules = [
//   'other_modules_based_on_your_needs',
//   // but mainly those 4 bellow
//   'query-string',
//   'decode-uri-component',
//   'split-on-first',
//   'filter-obj',
// ];

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // transformIgnorePatterns: esModules.length ? [`/node_modules/(?!${esModules.join('|')})`] : [],
//   transformIgnorePatterns: [
//     'node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)',
// ],
}