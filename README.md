# :fire: Red Ventures - React Boilerplate

- **[WHAT IT DOES](#what-it-does)** - What are the goals of this project
- **[ABOUT](#about)** - General information about the project
- **[GET STARTED](#get-started)** - Installation instructions

## What it does?
> This guide aims to facilitate the creation of projects using React/Redux and standardize how we work with this stack.
It supports the development of progressive web apps and solves the most common difficulties in React-based environments, especially for new tech team members.

## About

#### Requirements
- [NodeJS v6.10.3](https://nodejs.org/)
- [Yarn v0.22.0](https://yarnpkg.com/en/)

#### Core Technologies
- [Node](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [React Router](https://github.com/ReactTraining/react-router/tree/v3/docs)
- [Recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md)
- [Stylus](http://stylus-lang.com/)
- [Webpack](https://webpack.js.org/)

#### Debugging Tools
- [React DevTools](https://goo.gl/QnNE9j) - Chrome Extension that adds React debugging tools to the Chrome Developer Tools
- [Redux DevTools](https://goo.gl/xUyzEe) - Chrome Extension for debugging application's state changes

#### Features
- [x] [ES6](https://leanpub.com/understandinges6/read)
- [x] [Webpack 2](https://webpack.github.io/docs/roadmap.html)
- [x] [Hot Loader](https://gaearon.github.io/react-hot-loader/getstarted/)
- [x] [Code Splitting](https://webpack.js.org/guides/code-splitting/)
- [x] [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [x] [Server Side Rendering](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md)
- [x] [Critical Path CSS](https://css-tricks.com/authoring-critical-fold-css/)

## Get Started

#### Install
```sh
# Create app dir
mkdir my-app

# Clone the repo
git clone git@github.com:RedVentures/frontreact-boilerplate.git my-app/

# Installs all dependencies and starts dev server on port 8080
yarn && yarn start
```

#### Folder Structure
Basically the development files are in the app folder and compiled files go
```
└── app
    ├── components
    │   └── RootComponent.js
    ├── constants
    │   ├── actionTypes.js
    │   └── pageNames.js
    ├── ducks
    │   ├── duck-example.js
    │   └── index.js
    ├── layouts
    │   └── AppLayout
    │       ├── AppLayout.styl
    │       └── index.js
    ├── main.js
    ├── pages
    │   ├── About
    │   │   └── index.js
    │   └── Home
    │       └── index.js
    ├── routes.js
    ├── shared
    │   ├── Footer
    │   │   └── index.js
    │   └── Header
    │       └── index.js
    ├── styles
    │   ├── main.styl
    │   └── vendors
    │       └── reset.styl
    └── utils
        └── redux
            ├── configureStore.js
            └── devTools.js
├── backend.js
├── build
├── critical-path.js
├── imagemin.js
├── node_modules
├── package.json
├── server
├── static
├── webpack
├── README.md
└── yarn.lock
```
