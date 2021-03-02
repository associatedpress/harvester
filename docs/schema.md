The Schema
==========

The Harvester schema lives in the `schema` tab of the sheet and defines some
general information about the form as well as the details of each field in the
form. Harvester reads the schema row-by-row, with each row describing one
attribute of the form. The first column declares the attribute the form is
describing and subsequent columns in the row describe the details of the
attribute.

## Attribute Types

Attribute types that are currently supported:

### `headline`

This defines the title of the form. The only other column in a `headline`-type
row is the text of the headline. Example:

| headline | My Wonderful Form |
|:---------|:------------------|

<hr />

### `chatter`

This defines some (usually explanatory) text that will be displayed underneath
the headline. The only other column in a `chatter`-type row is the text of the
chatter that will be displayed. Example:

| chatter | Here's what you should do with this form. |
|:--------|:------------------------------------------|

<hr />

### `index`

This defines a (possibly compound) index that uniquely identifies an entity in
the dataset. An index consists of one or more column keys joined by `+`. When
an index is specified the user can access a "Current" view where they can
specify all component pieces of an index and get back the collapsed "current"
value of all columns for the given entity. Note that the values referenced in
the index are column keys created with the `key:<string>` option (see below).
Example:

| index | state+city |
|:------|:-----------|

This example assumes the existence of two columns, one with `key:state` and
another with `key:city`.

<hr />

### `column`

This defines the main building block of the form: a single field that the user
will input. The details of the `column` type are below, but every column
requires the type `column` in the first cell, the name of the column in the
second cell, and the type of the column in the third cell. Example:

| column | Age | number |
|:-------|:----|:-------|

<hr />

### `relative_column`

This defines a sub-field of a secondary model, and behaves like a `column` but
defines the field on a secondary or "relative" model rather than on the primary
model. A relative field corresponds to one sub-field of a complex `has_many`
field. Note that a `relative_column` row must include the `relative:` option.
Example:

| relative_column | Name | string | relative:albums |
|:----------------|:-----|:-------|:----------------|

This `relative_column` would define a field on a secondary model (`albums`)
that would be used if there is a `has_many` field defined in the schema (see
below) with `relative:albums`. Example:

| column | Albums | has_many | relative:albums |
|:-------|:-------|:---------|:----------------|

<hr />

## Column Definitions

The definitions of columns can get a little more complicated than the rest
because they define the meat of the form. Beyond the name of the column (which
is what shows up as the field label on the form) and the type of the column
(which is what determines how the actual input field is rendered), each column
can accept some additional options in subsequent cells in any order (specified
as `<key>:<value>`). The supported column types are listed below along with the
options that they support (note that all columns support the general options
listed at the end).

### `datetime`

A date and time input that renders as a datetime picker. This column type
supports the following options:

`min:<date time string>` - The minimum date or time a user may enter. Enter
value as a date time string `DD/MM/YYYY HH:MM`

| column | Start date | datetime | min:12/5/1955 06:38 PM |
|:-------|:-----------|:---------|:-----------------------|

`max:<date time string>` - The minimum date or time a user may enter.

| column | Start date | datetime | max:10/21/2015 19:28 |
|:-------|:-----------|:---------|:---------------------|

`date:<true|false>` - Show or hide date in the rendered picker. A value of
`false` will hide the date picker and only display a time picker. The default
value is `true`.

| column | Start date | datetime | date:false |
|:-------|:-----------|:---------|:-----------|

`time:<true|false>` - Show or hide time in the rendered picker. A value of
`false` will hide the time picker and only display a date picker. The default
value is `true`.

| column | Start date | datetime | time:false |
|:-------|:-----------|:---------|:-----------|

<hr />

### `number`

A number input. This column type supports the following options:

`min:<num>` - The minimum number a user may enter.

| column | Items | number | min:-5 |
|:-------|:------|:-------|:-------|

`max:<num>` - The maximum number a user may enter.

| column | Items | number | max:100 |
|:-------|:------|:-------|:--------|

<hr />

### `string`

A short text input. This column type supports the following specific options:

`regex:<regex>` - JavaScript regular expression. The regex does not need
quotations, and requires entries that match exactly. Consider giving an example
in the name or help text of the field and specifying the necessary format of
the entry, because if entries do not match, the format error message prints the
regex, which might not be clear feedback for non-technical reporters. Example:

| column | Name | string | regex:[A-Z]{2}[0-9]{2,5} |
|:-------|:-----|:-------|:-------------------------|

`maxLength:<maxLength>` - Maximum number of characters a string input should
expect. If none is specified the default is 80 characters. Example:

| column | Name | string | maxLength:6 |
|:-------|:-----|:-------|:------------|

<hr />

### `text`

A longer text input that displays as a `textarea` input. This column type
supports the following specific option:

`rows:<num>` - the number of rows to render in the textarea initially. The area
is resizeable so this isn't necessary, but it might make for a better user
experience in some cases. The default is 2. Example:

| column | Notes | text | rows:5 |
|:-------|:------|:-----|:-------|

<hr />

### `select`

An input that allows a user to select from a list of options. This column type
has the ability to be rendered as a dropdown, a collection of checkboxes, or
a group of radio buttons; a select menu is used when using the `options`
parameter and checkboxes/radios are used when using the `optionlist` parameter,
depending on whether multiple entries are allowed. The `select` input supports
the following specific options:

`options:<sheet name>` (required if not using `optionlist`) - this option
specifies the name of the tab in the current workbook that holds the table of
options for this select input. The table of options must contain a header row
and must at least contain a column named `value` that specifies unique
identifiers for the options. The table may contain any additional columns you
want. If it contains a column named `label` then the values from that column
will be used as the option labels in the select menu. (Note that using the
`options` parameter will cause the select input to render as a select menu. If
you want checkboxes or radio buttons, use the `optionlist` parameter instead.)
Example:

| column | State | select | options:states |
|:-------|:------|:-------|:---------------|

`optionlist:<a,b,c>` (required if not using `options`) - this option specifies
a comma-separated list of static options to use. Using this option causes the
select to display as either a collection of checkboxes or a group of radio
buttons, depending on the value of `multiple`. (Note that if you specify a list
of options with `optionlist` the user cannot create new options; `creatable`
has no effect.) Example:

| column | Genre | select | optionlist:drama,comedy,horror |
|:-------|:------|:-------|:-------------------------------|

`creatable:<true|false>` - this determines whether or not the user is allowed
to create additional options that are not available in the options table. When
the user creates an option its value will be appended to the options table in
the `value` column, making it available as a suggested option in the future.
Note that this option can _only_ be used with `options`, not with `optionlist`.
Example:

| column | Category | select | options:categories | creatable:true |
|:-------|:---------|:-------|:-------------------|:---------------|

`requires:<column key>` - this specifies a column that this select menu depends
on. No options will be loaded for this select menu until the user specifies
a value for the column with the key specified here (see the `key` option
below). Once the user selects a value for the required column, the value
provided there will be used to filter the options from this select's options
table. It is expected that the options table will have a column with the same
name as the required key. Example:

| column | County | select | options:us_counties | requires:state |
|:-------|:-------|:-------|:--------------------|:---------------|

This example won't provide any option in the County select menu until the user
provides a value for the column with the key `state` (see the `key` option
below); at that point the `us_counties` tab will be filtered down to the rows
with the selected state in the `state` column and those rows will be used as
the options menu for this select menu. If the user then picks a different state
this select menu will be cleared and new options will be loaded.

`multiple:<true|false>` - this determines whether or not the user is allowed to
select multiple options. When using the `options` parameter this results in
a multi-select drop-down; with using the `optionlist` parameter this results in
a collection of checkboxes rather than a group of radio buttons> The default is
`false`, meaning only one option can be selected. Example:

| column | States | select | options:states | multiple:true |
|:-------|:-------|:-------|:---------------|:--------------|

`min:<num>` - this specifies the minimum number of options a user must select
(requires `multiple:true`). Example:

| column | States | select | options:states | multiple:true | min:1 |
|:-------|:-------|:-------|:---------------|:--------------|:------|

`max:<num>` - this specifies the maximum number of options a user may select
(requires `multiple:true`). Example:

| column | States | select | options:states | multiple:true | max:10 |
|:-------|:-------|:-------|:---------------|:--------------|:------|

`serialization:<json|csv>` - specifies how multiple values should be serialized
so as to occupy a single cell in the resulting sheet (requires
`multiple:true`). Selecting `csv` will cause the multiple values to be
serialized into a comma-separated list with fields quoted with (`"`) as
necessary; selecting `json` (the default) will cause the multiple values to be
serialized as a JSON array. Note that if `multiple` is not set to `true` then
this option has no impact. Example:

| column | States | select | options:states | multiple:true | serialization:json |
|:-------|:-------|:-------|:---------------|:--------------|:-------------------|

<hr />

### `has_many`

An input that allows a user to provide sub-fields for one or more "relative" or
"secondary" models of a certain type. A `has_many` column must include the
`relative:<relative_key>` option, which specifies which collection of
`relative_column` definitions make up the schema of the secondary model. All
`relative_column` definitions with a matching `relative:<relative_key>`
configuration in order will define the secondary model's schema.

`relative:<relative_key>` (required) - specifies the relative key that will be
used to locate `relative_column` definitions for the corresponding secondary
model that should be used for this `has_many` field. Example:

| column | Albums | has_many | relative:albums |
|:-------|:-------|:---------|:----------------|

This `has_many` field then assumes that there will be one or more
`relative_column` fields defined in the schema with `relative:albums`, like
this:

| relative_column | Name | string | relative:albums |
|:----------------|:-----|:-------|:----------------|

<hr />

### General Options

General options that can be provided to any type of column:

`default:<value>` - provide a default value for the column. You should pick
something that makes sense with the type. By default, date entries will default
to the current day; you can specify `default:empty` to instead render them with
no date selected. Example:

| column | Number of people | number | default:0 |
|:-------|:-----------------|:-------|:----------|

`help:<help text>` - a string that will show up as hover text over an info icon
next to the column label.

| column | Number of people | number | help:The number of people that were affected. |
|:-------|:-----------------|:-------|:----------------------------------------------|

`key:<string>` - a unique identifier for the column that makes it available as
a dependency for `select` columns through the `requires` option. You can
provide any key you want, but it should be universally unique to the column.
Bear in mind the specific requirements of the `requires` option, described
above; also note that keys are a requirement for setting an `index` attribute
in your schema (see above).

| column | State | select | options:states | key:state |
|:-------|:------|:-------|:---------------|:----------|

`required:<true|false>` - specify that a column _must_ be filled out by the
user in order for them to submit the form.

| column | Number of people | number | required:true |
|:-------|:-----------------|:-------|:--------------|
