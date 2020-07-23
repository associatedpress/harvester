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

  |:-------|:----|:-------|
  | column | Age | number |

### Column Definitions

The definitions of columns can get a little more complicated than the rest
because they define the meat of the form. Beyond the name of the column (which
is what shows up as the field label on the form) and they type of the column
(which is what determines how the actual input field is rendered), each column
can accept some additional options in subsequent cells in any order.
