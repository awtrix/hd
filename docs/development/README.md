## Awtrix HD Development

The development ecosystem of Awtrix HD has improved substantially over previous
Awtrix versions, making it easier than before to write your own apps. If you've
worked with javascript based web frameworks before, chances are you'll be
developing your own Awtrix HD apps in no time.

Awtrix HD apps can be written either in [TypeScript](ts) or [JavaScript](js)
and run directly in the browser and optionally in [node.js](nodejs).

For frontend work you will make use of the [Vue framework](vue) and our
custom-built development tools that make creating and running your apps
extremely quick and fun.

::: tip
Because of the improved tooling and code editor support for TypeScript, we
strongly recommend you to write your apps in TypeScript as well, though pure
JavaScript is also supported if you prefer.
:::

### Centralized app library

Awtrix HD uses a centralized app library that is hosted on GitHub. Therefore
your app's source code will be public, which makes it easier for other users to
trust your code isn't harmful.

The App library repository is a good source for more information about the app
publishing process.

### Requirements

Awtrix HD is written for node.js 14.16. It might be able to run on older node.js
versions, but we don't guarantee it. To make your work easier we recommend to
use at least node.js 14.16 as well.

Because our own Awtrix HD image uses node.js 14.16 too, you might even want to
have this exact version installed to make sure that your app functions properly
on all other Awtrix HD devices.

::: tip
If you already have another version of Node.js installed, you can use
a version manager such as [nvm](nvm) to install multiple versions at the
same time.
:::

#### Supplemental reading material
If you are totally unfamiliar with the languages and technologies mentioned
above, or if you just want to refresh your knowledge, these links might help
you out a bit.

- [Vue Documentation](vue-guide)
- [TypeScript Handbook](ts-handbook)
- [Git Introduction](git)

[ts]: https://www.typescriptlang.org/
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[nodejs]: https://nodejs.org/en/about/
[vue]: https://vuejs.org/
[ts-handbook]: https://www.typescriptlang.org/docs/
[git]: https://git-scm.com/docs/gittutorial
[vue-guide]: https://v3.vuejs.org/guide/introduction.html
[nvm]: https://github.com/nvm-sh/nvm
