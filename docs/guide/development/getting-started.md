## Getting Started

Your main tool in developing Awtrix HD apps is going to be our development
package with its command line utility. In order to install it globally, run
`npm install -g @awtrix/dev`. After that you can run the command `awtrix-dev`
anywhere.

If you would rather not install the CLI globally, see the hint in step 1.

### 1. Clone the app library repository
Create a fork of the awtrix-hd-apps repository on GitHub and clone it locally:  
`git clone git@github.com:githubusername/awtrix-hd-apps.git`.

::: warning
Make sure to also run `npm install` if you didn't want to install the 
development CLI globally. When doing so, make sure to always run the development
commands with `npx awtrix-dev`.
:::

### 2. Create a new app directory
Create a new directory for your app in the `/apps` directory of the app library.
The directory name must match the name of your app and may not be changed once
your app was approved for the first time.

### 3. Initialize a new app
Run `awtrix-dev init` (or `npx awtrix-dev init`) in order to create the
bootstrap source code and configuration for your new app. Just follow the
instructions of the interactive setup tool 

::: tip
If you don't want to use the interactive tool, you can run the command with
`awtrix-dev init --no-interaction`. This will only use the defaults.
:::

::: tip
You can run the init command in any directory of your choosing. It does not
have to be in a cloned app library, although you will need to publish your app
via the repository if you want it to be in the official library.
:::