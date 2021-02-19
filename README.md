Harvester
=========

A transparent and flexible data-entry tool built on Google Sheets. Harvester
uses the structure of a Google Sheets workbook to drive a data entry form that
feeds data right back into the same workbook. The Harvester form pulls its
schema from the workbook on page load, so it should immediately reflect
changes. The structure of the workbook and the internal schema syntax are
described in detail below.

## The Sheet

The main URL pattern that Harvester exposes is:

```
http://harvester.ap.org/d/<docId>
```

where `<docId>` is the the document ID that shows up in the URL of a Google
Sheet (e.g., `1V6Sq_6T4JFBHklmjpW7LpF_K9auZOFfRa2tIEt7-kqY`). For example, the
following sheet URL and harvester URL would work together:

```
https://docs.google.com/spreadsheets/d/1lPnNfJchm96Yk2qSAIVbyBz9-2K2flEHCMA3zKvABEE/edit#gid=24297097
http://harvester.ap.org/d/1lPnNfJchm96Yk2qSAIVbyBz9-2K2flEHCMA3zKvABEE
```

Harvester expects the sheet that drives it to have a few important properties:

1. First, the sheet has to be shared with the service account that Harvester
   uses to access Google APIs
   (harvester-backend@ap-harvester.iam.gserviceaccount.com). That account will
   need to be able to edit the sheet in question.

2. Second, the sheet has to have at least two tabs: one named `entry` and one
   named `schema`. The `entry` tab is where Harvester will append records when
   uses submit a form; the `schema` tab defines the structure of the form as
   described below. The sheet can certainly have other tabs in addition to
   these two.

## The Schema

The Harvester schema lives in the `schema` tab of the sheet and defines some
general information about the form as well as the details of each field the
user will asked to enter. The schema is read row-by-row, with each row
describing one attribute of the form. The first column declares the attribute
the form is describing and subsequent columns in the row describe the details
of the attribute.

Three attribute types are currently supported:

* `headline` - this defines the title of the form. The only other column in
  a `headline`-type row is the text of the column. Example:

  | headline | My Wonderful Form |
  |:---------|:------------------|

* `chatter` - this defines some (usually explanatory) text that will be
  displayed underneath the headline. The only other column in a `chatter`-type
  row is the text of the chatter that will be displayed. Example:

  | chatter | Here's what you should do with this form. |
  |:--------|:------------------------------------------|

* `index` (required) - this defines a (possibly compound) index that uniquely
  identifies an entity in the dataset. An index consists of one or more column
  keys joined by `+`. When an index is specified the user can access
  a "Current" view where they can speficy all component pieces of an index and
  get back the collapsed "current" value of all columns for the given entity.
  Note that the values referenced in the index are column keys created with the
  `key:<string>` option (see below). Example:

  | index | state+city |
  |:------|:-----------|

  This example assumes the existence of two columns, one with `key:state` and
  another with `key:city`.

* `column` - this defines the main building block of the form: a single field
  that the user will input. The details of the `column` type are below, but
  every column requires the type `column` in the first cell, the name of the
  column in the second cell, and the type of the column in the third cell.
  Example:

  | column | Age | number |
  |:-------|:----|:-------|

* `relative_column` - this defines a sub-field of a secondary model, and
  behaves like a `column` but defines the field on a secondary or "relative"
  model rather than on the primary model. A relative field corresponds to one
  sub-field of a complex `has_many` field. Note that a `relative_column`
  requires that the `relative:` option be set. Example:

  | relative_column | Name | string | relative:albums |
  |:----------------|:-----|:-------|:----------------|

  This `relative_column` would define a field on a secondary model (`albums`)
  that would be used if there is a `has_many` field defined in the schema (see
  below) with `relative:albums`. Example:

  | column | Albums | has_many | relative:albums |
  |:-------|:-------|:---------|:----------------|

### Column Definitions

The definitions of columns can get a little more complicated than the rest
because they define the meat of the form. Beyond the name of the column (which
is what shows up as the field label on the form) and the type of the column
(which is what determines how the actual input field is rendered), each column
can accept some additional options in subsequent cells in any order (specified
as `<key>:<value>`). The supported column types are listed below along with the
options that they support (note that all columns support the general options
listed at the end).

* `date` - a date input that renders as a date picker. This column type does
  not support any specific options.

  | column | Start date | date |
  |:-------|:-----------|:-----|

* `number` - a number input. This column type does not support any specific
  options.

  | column | Age | number |
  |:-------|:----|:-------|

* `string` - a short text input. This column type does not support any specific
  options.

  | column | Name | string |
  |:-------|:-----|:-------|

* `text` - a longer text input that displays as a `textarea` input. This column
  type supports the following specific option:

  - `rows:<num>` - the number of rows to render in the textarea initially. The
    area is resizeable so this isn't necessary, but it might make for a better
    user experience in some cases. The default is 2. Example:

    | column | Notes | text | rows:5 |
    |:-------|:------|:-----|:-------|

* `select` - an input that allows a user to select from a list of options. This
  column type has the ability to be rendered as a dropdown, a collection of
  checkboxes, or a group of radio buttons; a select menu is used when using the
  `options` parameter and checkboxes/radios are used when using the
  `optionlist` parameter, depending on whether multiple entries are allowed.
  The `select` input supports the following specific options:

	- `options:<sheet name>` (required if not using `optionlist`) - this option
    specifies the name of the tab in the current workbook that holds the table
    of options for this select input. The table of options must contain a
    header row and must at least contain a column named `value` that specifies
    unique identifiers for the options. The table may contain any additional
    columns you want. If it contains a column named `label` then the values
    from that column will be used as the option labels in the select menu.
    (Note that using the `options` parameter will cause the select input to
    render as a select menu. If you want checkboxes or radio buttons, use the
    `optionlist` parameter instead.) Example:

    | column | State | select | options:states |
    |:-------|:------|:-------|:---------------|

  - `optionlist:<a,b,c>` (required if not using `options`) - this option
    specifies a comma-separated list of static options to use. Using this
    option causes the select to display as either a collection of checkboxes or
    a group of radio buttons, depending on the value of `multiple`. (Note that
    if you specify a list of options with `optionlist` the user cannot create
    new options; `creatable` has no effect.) Example:

    | column | Genre | select | optionlist:drama,comedy,horror |
    |:-------|:------|:-------|:-------------------------------|

  - `creatable:<true|false>` - this determines whether or not the user is
    allowed to create additional options that are not available in the options
    table. When the user creates an option its value will be appended to the
    options table in the `value` column, making it available as a suggested
    option in the future. Note that this option can _only_ be used with
    `options`, not with `optionlist`. Example:

    | column | Category | select | options:categories | creatable:true |
    |:-------|:---------|:-------|:-------------------|:---------------|

  - `requires:<column key>` - this specifies a column that this select menu
    depends on. No options will be loaded for this select menu until the user
    specifies a value for the column with the key specified here (see the `key`
    option below). Once the user selects a value for the required column, the
    value provided there will be used to filter the options from this select's
    options table. It is expected that the options table will have a column
    with the same name as the required key. Example:

    | column | County | select | options:us_counties | requires:state |
    |:-------|:-------|:-------|:--------------------|:---------------|

    This example won't provide any option in the County select menu until the
    user provides a value for the column with the key `state` (see the `key`
    option below); at that point the `us_counties` tab will be filtered down to
    just the rows with the selected state in the `state` column and those rows
    will be used as the options menu for this select menu. If the user then
    picks a different state this select menu will be cleared and new options
    will be loaded.

  - `multiple:<true|false>` - this determines whether or not the user is
    allowed to select multiple options. When using the `options` parameter this
    results in a multi-select drop-down; with using the `optionlist` parameter
    this results in a collection of checkboxes rather than a group of radio
    buttons> The default is `false`, meaning only one option can be selected.
    Example:

    | column | States | select | options:states | multiple:true |
    |:-------|:-------|:-------|:---------------|:--------------|

  - `serialization:<json|csv>` - when `multiple` is set to true this option
    specifies how the muliple values should be serialized so as to occupy
    a single cell in the resulting sheet. Selecting `csv` will cause the
    multiple values to be serialized into a comma-separated list with fields
    quoted with (`"`) as necessary; selecting `json` (the default) will cause
    the multiple values to be serialized as a JSON array. Note that if
    `multiple` is not set to `true` then this option has no impact. Example:

    | column | States | select | options:states | multiple:true | serialization:json |
    |:-------|:-------|:-------|:---------------|:--------------|:-------------------|

* `has_many` - an input that allows a user to provide sub-fields for one or
  more "relative" or "secondary" models of a certain type. A `has_many` column
  must include the `relative:<relative_key>` opition, which specifies which
  collection of `relative_column` definitions make up the schema of the
  secondary model. All `relative_column` definitions with a matching
  `relative:<relative_key>` configuration in order will define the secondary
  model's schema.

  - `relative:<relative_key>` (required) - specifies the relative key that will
    be used to locate `relative_column` definitions for the corresponding
    secondary model that should be used for this `has_many` field. Example:

    | column | Albums | has_many | relative:albums |
    |:-------|:-------|:---------|:----------------|

    This `has_many` field then assumes that there will be one or more
    `relative_column` fields defined in the schema with `relative:albums`, like
    this:

    | relative_column | Name | string | relative:albums |
    |:----------------|:-----|:-------|:----------------|

General options that can be provided to any type of column:

* `default:<value>` - provide a default value for the column. You should pick
  something that makes sense with the type. By default date entries will
  default to the current day; you can specify `default:empty` to instead render
  them with no date selected. Example:

  | column | Number of people | number | default:0 |
  |:-------|:-----------------|:-------|:----------|

* `help:<help text>` - a string that will show up as hover text over an info
  icon next to the column label.

  | column | Number of people | number | help:The number of people that were affected. |
  |:-------|:-----------------|:-------|:----------------------------------------------|

* `key:<string>` - a unique identifier for the column that makes it available
  as a dependency for `select` columns through the `requires` option. You can
  provide any key you want, but it should be universally unique to the column.
  Also bear in mind the specific requirements of the `requires` option,
  described above.

  | column | State | select | options:states | key:state |
  |:-------|:------|:-------|:---------------|:----------|

* `required:<true|false>` - specify that a column _must_ be filled out by the
  user in order for them to submit the form.

  | column | Number of people | number | required:true |
  |:-------|:-----------------|:-------|:--------------|

## App-level Configuration

Harvester allows for some optional app-level configuration through a Harvester
configuration sheet. If you deploy the app with the environment variable
`HARVESTER_CONFIG_DOC_ID` set to the doc ID of a Google Sheet then Harvester
will use that sheet as its app configuration.

### Custom Form URLs

The app configuration sheet allows you to set up custom form URLs in order to
get a more human-readable link to share with data collectors. If the config
sheet has a tab named `forms` that contains the columns `slug` and `doc_id`
then you can access the form specified by the sheet with ID `doc_id` at the URL

```
/forms/<slug>
```

For example, if the `forms` tab looks like this:

| slug    | doc_id                             |
|:--------|:-----------------------------------|
| my-form | 1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT |

then the following paths will be equivalent:

```
/forms/my-form
/d/1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT
```

Note that the former will be treated as canonical; Harvester will redirect from
the latter with a `301` to the former.

Our instance of Harvester is configured to use [this sheet for custom
URLs][config-sheet]. If you need to be granted access, please contact
@amilligan, @jmyers, or @tthibodeaux.

## Development

In order to get this project running locally you will first need to clone this
repository. Having done that, assuming you have [a relatively recent version of
Node installed][node], you can install the project's dependencies by running:

```
yarn install
```

Once all of the project's dependencies have installed successfully, you will
need to configure your development environment, providing Harvester with Google
service account credentials to use to access the sheets that drive it. You can
[create your own service account to use for this][create-service-account] or
ask @amilligan for the production credentials. Once you have the service
account credentials (these should be in the form of a JSON file, canonically
placed in the root of the project in a file called `.auth.json`) you should set
the following environment variable:

```
GOOGLE_APPLICATION_CREDENTIALS=".auth.json"
```

changing the value `.auth.json` if you use a different filename. This project
is set up so that you can set environment variables in a `.env` file in the
root of the project, so you can create a file called `.env` and set the
environment variable there.

If you would like to use a Harvester config sheet as well, you can also set the
following environment variable (though this is optional):

```
HARVESTER_CONFIG_DOC_ID="<ID_OF_YOU_HARVESTER_CONFIG_SHEET>"
```

Once your environment is properly configured, you can run Harvester locally by
running:

```
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
```
yarn devfrontend
```
will start the webpack devlopment server, and running
```
yarn devbackend
```
will run the server process.

This project includes some tests, which you can run with the following:

```
yarn test
```

It also includes a linting configuration, which you can run with:

```
yarn lint
```

## Releasing

Once a new version of the project is ready to be released, you can build a new
Docker image of the project and publish it to our internal Artifactory by
running:

```
yarn release
```

This will prompt you for a new version number, tag the release in git, build
a new Docker image tagged with the new version number (e.g., `v2.0.1`), and
push the image to our internal repository. Once the new image is available, you
can deploy it as you see fit.

Happy harvesting! :heart:

[config-sheet]: https://docs.google.com/spreadsheets/d/1em6MB9S-rRL81Sh128xrVft9SpTCqRtL2K2zoPVx9PQ/edit#gid=0
[node]: https://nodejs.org/en/
[create-service-account]: https://cloud.google.com/iam/docs/creating-managing-service-accounts
[webpack]: https://webpack.js.org/
[babel-watch]: https://www.npmjs.com/package/babel-watch
