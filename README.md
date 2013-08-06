# node-circlei
A node library for accessing data from the [CircleCI API](https://circleci.com/docs/api).

## Install
```npm install https://github.com/andyshinn/node-circleci/tarball/v0.0.1```

## Example
A quick example getting the latest build information from a project:

```
var circleci = require('circleci');

circleci.lastbuild('andyshinn/node-circleci', function(body) {
  console.log(body);
});
```

## Usage
You can currently only pass the `circle-token` via an environment variable. You will need to run your node application like:

```
CIRCLECI_TOKEN=60e2s02376f2446461b9e966417af0dbc1a5d396 node bin/example.js
```

## Todo
This module is very trivial at the moment. It really needs:

* Unit tests (mocha / chai?)
* Way to pass token as configuration
* The other CircleCI GET methods
* All the POST / DELETE methods
* Refactoring / prototyping methods to support multiple projects at once

* A binary script to utilize CircleCI on the CLI (commander / optimist?)

## Contributing
I'd love assistance on expanding this module to support the full CircleCI API and additional utility methods:

* Fork this project
* Commit your work to a new feature / fix branch name
* Submit a pull request
