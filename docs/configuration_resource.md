App-level Configuration
=======================

Harvester allows for some optional app-level configuration through a Harvester
configuration sheet. If you deploy the app with the environment variable
`HARVESTER_CONFIG_RESOURCE_ID` set to [the spreadsheet ID of a Google
Sheet][google-spreadsheet-id] then Harvester will use that sheet as its app
configuration.

To set up a Harvester configuration sheet you can [create a new Google
Sheet](https://sheets.new), name it something you'll remember (like "Harvester
Config"), rename the first tab from "Sheet1" to "forms", and put the strings
`slug` and `form_id` in cells `A1` and `B1`, respectively; finally, you'll have
to share the sheet with your Harvester service account (remember you might want
to uncheck "Notify people").

## Custom Form URLs

The app configuration sheet allows you to set up custom form URLs in order to
get a more human-readable link to share with data collectors. If the config
sheet has a tab named `forms` that contains the columns `slug` and `doc_id`
then you can access the form specified by the sheet with ID `doc_id` at the URL

```shell
/forms/<slug>
```

For example, if the `forms` tab looks like this:

| slug    | form_id                            |
|:--------|:-----------------------------------|
| my-form | 1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT |

then the following paths will be equivalent:

```shell
/forms/my-form
/d/1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT
```

The former (`/forms/my-form`) will be treated as canonical, meaning Harvester
will redirect users from the latter with a `301` to the former.

[google-spreadsheet-id]: https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id
