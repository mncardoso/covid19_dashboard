// @ts-check
/** @type {import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
  // prettier options
  arrowParens: 'avoid',
  bracketSpacing: true,
  cssDeclarationSorterKeepOverrides: false,
  embeddedSingleQuote: true,
  htmlWhitespaceSensitivity: 'css',
  indentSchema: false,
  printWidth: 100,
  semi: true,
  singleLineLinkTags: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,

  // plugins
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-css-order'],

  // plugin options -> @ianvs/prettier-plugin-sort-imports
  importOrder: [
    '<TYPES>',
    '<TYPES>^[.]',
    '',
    '<BUILT_IN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/components/(.*)$',
    '',
    '^@/layout/(.*)$',
    '^@/interface/(.*)$',
    '^@/styles/(.*)$',
    '',
    '^@/data/(.*)$',
    '',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',

  // plugin options -> prettier-plugin-css-order
};
export default config;
