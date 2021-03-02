Developing AP Harvester
=======================

Like any open source project, AP Harvester is only as stong as the community
around it. If you're intested in diving into the code and helping to improve
the tool for everyone, great! You're in the right place and we welcome your
contribution!

## Getting set up

In order to get this project running locally you will first need to [fork and
clone][github-fork] the [Harvester repository][repo]. Having done that,
assuming you have [a relatively recent version of Node installed][node], you
can install the project's dependencies by running:

```shell
yarn install
```

Once all of the project's dependencies have installed successfully, you will
need to configure your development environment, providing Harvester with Google
service account credentials to use to access the sheets that drive it. You can
follow [Google's documentation to create your own service account for
development][create-service-account], or if you aready have one you want to use
you will need its JSON credentials. Once you have the service account
credentials (these should be in the form of a JSON file) you should place them
in a file called `.auth.json` in the root of the cloned repository.

Next, make a copy of the file `.env.template` and name the copy `.env`. If you
want to use Google OAuth for authentication you should set your client ID and
client secret in the new `.env` file. If you want to use a Harvester config
sheet to provide Custom Form URLs you can also set the
`HARVESTER_CONFIG_RESOURCE_ID` variable.

## Running the app

Once your environment is properly configured, you can run Harvester locally by
running:

```shell
yarn start
```

This will start the project in development mode, using [webpack][] to
dynamically build and serve the front-end code and [babel-watch][] to monitor
and restart the server process. When you run `yarn start` Harvester should open
in your web browser; in development you will be interacting directly with the
webpack development server that's building and serving the front-end, and it
will proxy all other requests to the server process. The webpack server will
automatically update the code in your browser as you make changes to the
front-end code, and babel-watch will restart the server process as you make
changes to the back-end code.

You can run the two parts of the project independently if you want. Running

```shell
yarn devfrontend
```

will start the webpack development server, and running

```shell
yarn devbackend
```

will run the server process.

## Code quality

This project includes some automated tests, which you can run with the following:

```shell
yarn test
```

It also includes a linting configuration, which you can run with:

```shell
yarn lint
```

## Documentation

This documentation is built using [MkDocs][]. In order to preview changes to it
locally you can [install the MkDocs command line tool][mkdocs-install] and then
serve a preview version of the documentation locally by running:

```shell
yarn docs:serve
```

[github-fork]: https://docs.github.com/en/github/getting-started-with-github/fork-a-repo
[repo]: https://github.com/associatedpress/harvester
[node]: https://nodejs.org/en/
[create-service-account]: https://cloud.google.com/iam/docs/creating-managing-service-accounts
[webpack]: https://webpack.js.org/
[babel-watch]: https://www.npmjs.com/package/babel-watch
[MkDocs]: https://www.mkdocs.org/
[mkdocs-install]: https://www.mkdocs.org/#installation
