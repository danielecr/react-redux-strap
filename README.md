> :warning: this repo is not maintained

# React redux and redux-observable boilerplate

A minimal package to start to develop a React application with redux
and redux-observable support.

## Epic Patterns (redux-observable)

Epic Patterns concept needs some comments.
The idea was developend starting from this:

https://redux-observable.js.org/docs/recipes/InjectingDependenciesIntoEpics.html

An Epic Pattern is a higher order function accepting the actionType and some
other function to use in a rxjs stream.

Still, the dependencies injection is a second level of function parameter (an epic-pattern returns a function X that returns a function Y, and that function Y accepts `(action$, ...args)` and attach `.pipe()` to action$)
See:

[epic definition](src/redux/epic-patterns/index.js)

[epic usage](src/redux/reducers/userdata/index.js)

The idea was to simplify unit testing by testing each epic parameter, see:

[unit test userdata epic](src/redux/reducers/userdata/userdata-handler.spec.js)

**Missing staff**: this code is pure js, no type checking support.

Note: :warning: the code is (probably) broken and not fully tested, also this idea is 3 years old (2020) and based on libraries/tools available then. (and yes, typescript was available but was too busy on backend at that time)

## Quickstart

> npm i

To install, then run with:

> npm run start

**warning**: :warning: it could be not working

## Produce a single target bundle `.js` file

There is no support for manifest, and neither for webworker.

The only built file is a `index.bundle.js` in `dist/` folder

### Command to build:

> npm run build
