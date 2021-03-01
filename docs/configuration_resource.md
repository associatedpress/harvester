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

## Limiting Allowed Resources

By default AP Harvester is not picky about the resources it uses to render
forms. Anyone can create a Google Sheet, set it up correctly, share it with
your service account, and be off to the races. Depending on how you deploy it,
you may want to lock down your Harvester a little more tightly.

You can add an tab called `allowlist` to your configuration sheet; this will
let you specify resources that you don't want to grace with custom URLs
but that you do want Harvester to be allowed to use. (Anything that has been
given a custom URL is assumed to be allowed.) A basic `allowlist` might allow
use of a resource with the ID `1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT` like so:

| form_id                            |
|:-----------------------------------|
| 1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT |

With that configuration, Harvester will allow access to anything with a custom
URL at the correct `/forms` endpoint _and_ it this particular resource at
`/d/1em6MB9S_tL2K2zoPVx9PQ128xrVft9SpT`. Note that if this resource is _also_
given a custom URL then including it in the `allowlist` will have no effect;
users will still be forwarded to `/forms/<slug>` like normal.

A typical use case for the `allowlist` configuration is to create the
`allowlist` tab and simply leave it blank. This will cause Harvester to _only_
render forms that have been given a custom URL in the `forms` tab.

The advantange of using an `allowlist` is that it lets you restrict who can
create new Harvester projects by restricting access to the configuration sheet
itself. No new Harvester projects can be started without first adding them to
the configuration sheet, either as a custom URL or as an entry in the
`allowlist`.

[google-spreadsheet-id]: https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id
