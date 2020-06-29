module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }
}
