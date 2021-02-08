module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,

    'no-console': 1,
    'no-use-before-define': 1,
    'object-curly-spacing': [1, 'always'],
    'no-unused-expressions': [
      2,
      { allowTernary: true, allowShortCircuit: true },
    ],
    'arrow-spacing': ['error', { before: true, after: true }],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'key-spacing': [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        // multiLine: {
        //   beforeColon: true,
        //   afterColon: true,
        //   align: 'colon',
        // },
      },
    ],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'space-before-blocks': 'error',
    'prettier/prettier': [
      1,
      {
        arrowParens: 'avoid',
        semi: false,
        trailingComma: 'es5',
        endOfLine: 'lf',
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80,
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      flowVersion: '0.53', // Flow version
    },
    'import/resolver': {
      alias: [
        ['@', './src'],
        ['@@', './'],
        ['assets/*', ['src/_assets/*']],
        ['Templates', './src/_components'],
      ],
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object',
      },
      {
        property: 'myFavoriteWrapper',
      },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to',
      },
    ],
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
      blockBindings: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      forOf: true,
      generators: false,
      modules: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      objectLiteralComputedProperties: true,
      objectLiteralDuplicateProperties: false,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  globals: {
    arguments: true,
  },
}
