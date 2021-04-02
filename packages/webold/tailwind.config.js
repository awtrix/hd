/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
  purge: {
    // We don't ever want to purge tailwind CSS classes because we can't know
    // ahead of time which classes are going to be used by our app developers.
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: false,
  }
}
