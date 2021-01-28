Migrating from v1 to v2
=======================

The migration from v1 to v2 can, in most cases, be done pretty painlessly. The
new version slims down a few things and provides a more stable foundation to
build on going forward. Below are the things you'll have to change if you used
them in your v1 schema.

## No more boolean

The new version removes the `bool` column type to eliminate some ambiguities
about its empty state. You can set up your own boolean input using a `select`
column with the `optionlist` configuration. A strong boolean with a default
value can be implemented like so:

| column | Completed | select | optionlist:TRUE,FALSE | default:FALSE |
|:-------|:----------|:-------|:----------------------|:--------------|

If you want to allow for a non-ambiguous "empty" state you can include a third
option:

| column | Completed | select | optionlist:TRUE,FALSE,EMPTY | default:EMPTY |
|:-------|:----------|:-------|:----------------------------|:--------------|

Or you can simply omit the default:

| column | Completed | select | optionlist:TRUE,FALSE |
|:-------|:----------|:-------|:----------------------|

Note that the use of `TRUE` and `FALSE` as options here is only to allow for
easy conversion from an existing `bool` field that already has data, as those
entries will be in the form of `TRUE` and `FALSE`.

## No more search

The new version removes the confusing `search` functionality for now.
A better-thought-out implementation of that may be added back in the future.
For now, you will have to remove the `search` configuration option from all of
your columns.

## Default serialization is now JSON

Multiple select fields and `has_many` fields (see below) are serialized as JSON
by default, rather than as embedded CSV. If you want to use the old behavior of
CSV serialization, you can specify `serialization:csv` on any relevant field.

## Relative `has_many` instead of `global`

The new version dispenses with the fraught concept of `global` fields. Now each
column is a field on the primary model, and each submission of the form will
only create a single row in the `entry` sheet. If your form leverages `global`
fields to construct an ad-hoc one-to-many relationship, you can now specify
explicit `has_many` fields. See the [`README`](../README.md) for details on
that.
