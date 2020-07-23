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
http://harvester.inside.ap.org/d/<docId>
```

where `<docId>` is the the document ID that shows up in the URL of a Google
Sheet (e.g., `1V6Sq_6T4JFBHklmjpW7LpF_K9auZOFfRa2tIEt7-kqY`). For example, the
following sheet URL and harvester URL would work together:

```
https://docs.google.com/spreadsheets/d/1V6Sq_6T4JFBHklmjpW7LpF_K9auZOFfRa2tIEt7-kqY/edit#gid=1046478843
http://harvester.inside.ap.org/d/1V6Sq_6T4JFBHklmjpW7LpF_K9auZOFfRa2tIEt7-kqY
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

* `column` - this defines the main building block of the form: a single field
  that the user will input. The details of the `column` type are below, but
  every column requires the type `column` in the first cell, the name of the
  column in the second cell, and the type of the column in the third cell.
  Example:

  | column | Age | number |
  |:-------|:----|:-------|

### Column Definitions

The definitions of columns can get a little more complicated than the rest
because they define the meat of the form. Beyond the name of the column (which
is what shows up as the field label on the form) and they type of the column
(which is what determines how the actual input field is rendered), each column
can accept some additional options in subsequent cells in any order (specified
as `<key>:<value>`). The supported column types are listed below along with the
options that they support (note that all columns support the general options
listed at the end).

* `bool` - a boolean flag that renders as a checkbox. This column type does not
  support any specific options. Example:

  | column | Retiring | bool |
  |:-------|:---------|:-----|

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

* `select` - an input that allows a user to select from a list of options. The
  `select` input supports the following specific options:

  - `options:<sheet name>` (required) - this option specifies the name of the
    tab in the current workbook that holds the table of options for this select
    input. The table of options must contain a header row and must at least
    contain a column named `value` that specifies unique identifiers for the
    options.  The table may contain any additional columns you want. If it
    contains a column named `label` then the values from that column will be
    used as the option labels in the select menu. Example:

    | column | State | select | options:states |
    |:-------|:------|:-------|:---------------|

  - `creatable:<true|false>` - this determines whether or not the user is
    allowed to create additional options that are not available in the options
    table. When the user creates an option its value will be appended to the
    options table in the `value` column, making it available as a suggested
    option in the future. Example:

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

General options that can be provided to any type of column:

* `default:<value>` - provide a default value for the column. You should pick
  something that makes sense with the type. By default date entries will
  default to the current day; you can specify `default:empty` to instead render
  them with no date selected. Example:

  | column | Number of people | number | default:0 |
  |:-------|:-----------------|:-------|:----------|

* `global:<true|false>` - global fields are included at the top of the form and
  apply to all pages. (Default is `false`.) Example:

  | column | Number of people | number | global:true |
  |:-------|:-----------------|:-------|:------------|

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
