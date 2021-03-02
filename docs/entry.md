Working with the Data
=====================

AP Harvester collects an ever-growing data entry log of form submissions. Every
time a user submits a Harvester form, a new row is created in the form's
`entry` sheet. This provides transparency and a clear log of your data
collection process, but with certain schemas (particularly schemas with an
`index`) it can make the `entry` sheet a bit more difficult to work with.

If you've [set up a Harvester project][docs-first-project] and entered some
data you'll see that your `entry` sheet contains two more colums than you may
have expected. Harvester automatically injects a timestamp for the entry and
a record of the user who entered the data (the latter is `0` if the user was
not authenticated). After those first two columns, each column corresponds to
the `column` entries in your schema in the same order that they appear in the
`schema` tab.

If your dataset does not use an `index` then that's all great; you're keeping
track of form entries and you will have one row for each entry. _However_, if
your dataset _does_ use an `index` then your `entry` sheet gets a little more
complicated. If you enter data for the same index value twice then you'll see
that you still end up with two rows: one for each form submission, just like
always. But we know those two rows correspond to the same entity; that's what
the `index` means after all!

This is where it can be helpful to _export_ the data from Harvester rather than
working with the `entry` sheet directly. You can export a dataset by clicking
the "Download" button next to the dataset headline in the form. When Harvester
exports a dataset it will only include the most recent entry for each index
value, so you'll be left with the most up-to-date representation of your
dataset.

[docs-first-project]: ./first_project.md
