# Medics.Academy System of Microfrontends

## Overview

This project serves as a starter for implementing a system of microfrontends for the Medics.Academy ecosystem, like the
one described [here](https://docs.google.com/document/d/1JRxdp1qYM6t3zdPlZ0TTD9krdh6Z3NrdUzXt3xO-pOo/edit?usp=sharing)

## Components of the project:


1. #### /shell - The Host Angular Application
---
   **Description**: The shell project serves as the Angular-based shell or container for orchestrating multiple
   microfrontends within the Medics.Academy system.

   **Dependencies**: Includes necessary Angular dependencies, Module Federation tools, and related libraries specified
   in package.json.

   **Webpack Configuration**: Configures Module Federation to define the remotes (microfrontends) that will be loaded
   dynamically and shares common dependencies among them.

   **Routing**: Defines routing configurations for different paths:
- '/': Home route loads the HomeComponent.
- 'ngMFE': Loads the Angular microfrontend (mf1) using lazy loading.
- 'react-js-MFE': Dynamically loads the React microfrontend (mf3) wrapped as a web component.
- 'react-ts-MFE': Dynamically loads another React microfrontend (mf2) with TypeScript, also wrapped as a web
  component.

**Lazy Loading**: Utilizes lazy loading for Angular microfrontend (ngMFE) using loadChildren. Lazy loaded Angular
microfrontends have to be declared in the remotes object of the webpack.config.js file. They can then be imported in
the routing module, just like any other angular module:

`webpack.config.js:`

   ```javascript 
   const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

   module.exports = withModuleFederationPlugin({

      remotes: {
         "mf1": "http://localhost:4201/remoteEntry.js", // mf1 is the key used in the shell's routing module to indicate the path where the microfrontend should be found. (This could be a remote address irl)
      },

      shared: {
         ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }), // setting strictVersion to true will cause webpack to throw an error if incompatible versions of a dependency are found.
      },

   });
   ```


`app.routing.module.ts:`

   ```typescript
   
    {
      path: 'ngMFE',
      loadChildren: () => import('mf1/Module').then(m => m.HeroesModule)
    }
   

   ```

>Note how "mf1", the key assigned to the url where the Angular microfronted is served from (it's localhost in this case, but would be a remote address in real life), 
> is then used in the shell's routing module to indicate the path where the microfrontend should be found - it's effectively an alias.

>Also note how it's the microfrontend's HeroesModule that will be actually rendered by the shell app.


**Dynamic Loading**: Utilizes WebComponentWrapper to dynamically load React microfrontends (react-js-MFE and
react-ts-MFE) by specifying remote entries and configurations.

&nbsp;

&nbsp;


2. #### /mf1 - An Angular Microfrontend
---

**Description**: mf1 is an Angular-based microfrontend. It's a very basic Angular project, 
which uses webpack to expose one of its modules, so that the shell app can consume it.

**Dependencies**: Uses Angular v15 for core functionalities, with specific dependencies and devDependencies listed in the package.json.

**Webpack Configuration**: Utilizes the Module Federation Plugin for module exposure and sharing.

`webpack.config.js:`

   ```javascript 
   const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

   module.exports = withModuleFederationPlugin({

      name: 'mf1',

      exposes: {
         './Module': './src/app/features/heroes/heroes.module.ts',
      },

      shared: {
         ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },

   });
   ```
>The important bit here is in the mf1/webpack.config.js file, where the heroes module is exposed.

> Notice how `./Module` is what we used in the shell app routing to define the path for the microfrontend, where we had  
>  ``loadChildren: () => import('mf1/Module').then(m => m.HeroesModule)``

**Scripts**:

`start`: Runs the development server.

`build`: Builds the microfrontend for production deployment.

`test`: Runs test cases using Jasmine and Karma.

`run:all`: Node script to run the microfrontend.

&nbsp;

&nbsp;



4. #### /mf2 A typescript React Microfrontend (.jsx)

**Description**: mf2 is a React-based microfrontend. It's a very basic React project, which uses webpack to expose one of its modules, so that the shell app can consume it.

**Dependencies**: Uses React v18+ for core functionalities, with specific dependencies and devDependencies listed in the package.json.

**Webpack Configuration**: Utilizes the Module Federation Plugin for module exposure and sharing.

`webpack.config.js:`

   ```javascript 
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = withModuleFederationPlugin({

    plugins: [
        /*
          ---------------------------------------------------
          This needs to be modified for the new remote module
          ---------------------------------------------------
        */
        new ModuleFederationPlugin({
            name: 'mf2',
            library: { type: "var", name: "mf2" },
            /*
              the remote module is held as filename
            */
            filename: 'remoteEntry.js',
            /*
              it exposes components named  here
            */
            exposes: {
                './web-components': './src/app.tsx',
            },
            /*
              this should be the same as the container one.
            */
            shared: ["react", "react-dom"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public/*.html'
                }
            ]
        })
    ]
});
   ```

> A few things are happening here: 
> The module found in `./src/app.tsx` is exposed as `./remoteEntry.js` to the shell app.
> The starting point of the microfrontend is the `app.tsx` file, which is a React module, and is exposed as a web component.


**Scripts**:

`start`: Runs the development server.
`build`: Builds the microfrontend for deployment.

5. #### /mf3 A Javascript React Microfrontend (.tsx)

**Description**: mf3 is a React-based microfrontend. It's a very basic React project, which uses webpack to expose one of its modules, so that the shell app can consume it.

**Dependencies**: Uses React v18+ for core functionalities, with specific dependencies and devDependencies listed in the package.json.

**Webpack Configuration**: Utilizes the Module Federation Plugin for module exposure and sharing.

> Similarly to mf2, mf3 is a React microfrontend, but it's written in pure JavaScript, and not TypeScript.
> The module found in `./src/app.js` is exposed as `./remoteEntry.js` to the shell app.
> The starting point of the microfrontend is the `app.js` file, which is a React module, and is exposed as a web component.
> The webpack configuration is similar to mf2's.

&nbsp;

**Scripts**:

`start`: Runs the development server.

`build`: Builds the microfrontend for deployment.
 


## Running the project

1. Clone the repository.
2. cd into each of the subdirectories (shell, mf1, mf2, mf3) and run `npm install` in each project, to install the dependencies.
3. Run `npm start` in the mf1 folder to start the dev server for the Angular microfrontend.
4. Run `npm run cb` and then `npm run serve` in the mf2 folder to start the dev server for the React TS microfrontend.
5. Run `npm start` in the mf3 folder to start the dev server for the React JS microfrontend.
4. Run `npm start` in the shell directory to start the shell app.

The shell app should be running on `http://localhost:4200/` and should be able to load the microfrontends dynamically.


## Notes
This project is intended to be used as a proof of concept for a system of microfrontends. Its purpose is to demonstrate 
how to set up a system of microfrontends using Angular and React, and how to dynamically load them in a shell app. 
It's not intended to be used in production, and it's not a complete solution for a system of microfrontends. 
It's a starting point, and it's meant to be used as a reference for setting up a system of microfrontends. 




