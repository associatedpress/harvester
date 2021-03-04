Creating Your First Harvester Project
=====================================

So you have your very own instance of AP Harvester up and running and you want
to see what you can do with it. Let's start by setting up a basic project and
then we can add to it as we explore Harvester's potential.

## At a glance

1. [Create a new Google Sheet][new-sheet] and give it a helpful name.

2. Share the sheet with [your Google service account][setup-google]. You should
   also [make sure it's available][collaboration] to anyone who will be
   entering data.

3. Rename the first tab `entry` and leave it blank.

4. Create a new tab and name it `schema`. [Fill it with the schema][schema] for
   your project.

5. (optional) Give your project a [custom URL in your Harvester configuration
   sheet][configuration].

6. Enter data! The project will be available in your Harvester app at the path
   `/d/SPREADSHEET_ID` (where `SPREADSHEET_ID` is [the sheet's
   ID][google-spreadsheet-id]); it will also be available at `/forms/SLUG` if
   you [set up a custom URL for the project][configuration].

## Detailed Walk-through

### Creating and sharing the sheet

Harvester relies on a Google Sheet to store everything it needs to know about
an individual project, so the first step in starting a new project is [creating
a new Google Sheet][new-sheet]. (You should name the sheet something relevant
that will help you with your own record keeping, but the name of the sheet
isn't actually used by Harvester.)

Once your sheet exists you should share it with [your Harvester Google service
account's][setup-google] email address, granting _edit_ permissions to the
service account. (Remember, you might want to uncheck the "Notify people" box
when you share the sheet to avoid some annoying email bounce-backs.) This will
let your Harvester read the sheet to figure out the current state of the
project and also add rows as the actual data is collected.

### Setting up the sheet's structure

Harvester will record the data as it's collected in a tab named `entry`, so you
should make sure such a tab exists. The simplest way to do that is to rename
the automatically created tab (named `Sheet1` by default) and call it `entry`.
You can leave it blank for now; Harvester will enter the data there later.

Harvester also needs to know what data it should be collecting. You define that
in a second tab, called `schema`. The `schema` tab should contain [the schema
that describes your dataset][schema].

### Example: Pokemon

For example, you might start with the following schema to collect some basic
data on Pokemon:

| [headline][] | Pokemon             |            |               |
|:-------------|:--------------------|:-----------|:--------------|
| [chatter][]  | Gotta catch 'em all |            |               |
| [column][]   | Name                | [string][] | required:true |

That's enough to get started. You should now be able to take a look at your
newly created form in Harvester by going to the path `/d/SPREADSHEET_ID` (where
`SPREADSHEET_ID` is [the sheet's ID][google-spreadsheet-id]). If you would like
you can [configure a custom URL for the project][configuration] to make life
a little easier.

Your form should have a single field: a text input where you can specify the
Pokemon's name. We made the field required (`required:true`), so if you try to
submit the form without a name you'll get an error message.

#### Adding a select input with an option sheet

At this point we're only collecting a list of Pokemon names, and that's not
very interesting. Any investigative reporter worth their salt would surely want
to dig a bit deeper, so let's add a field for the Pokemon's type.

Now, we could do what we did for the Pokemon name and add another `string`
field, but that would allow one reporter to enter the string "fire", another to
enter "Fire", and yet another to enter "fire type". That would be a headache
when we try to analyze the data. For something like this we would be better of
with a [`select` input][select], which will allow reporters to choose from
a preset list of options:

| headline       | Pokemon             |                |                   |
|:---------------|:--------------------|:---------------|:------------------|
| chatter        | Gotta catch 'em all |                |                   |
| column         | Name                | string         | required:true     |
| **[column][]** | **Type**            | **[select][]** | **options:types** |

We added a new column at the end of our schema called "Type" and said that
reporters should be allowed to pick from a set of options defined in a tab
called `types` (that's what `options:types` means). But wait! We don't have
a tab called `types`! So we should create one by adding a new tab, naming the
tab `types` and defining a list of type options in it. The tab might look
something like this:

| **value** |
|:----------|
| Fire      |
| Water     |
| Grass     |

Note the column header `value`; this is required for option sheets. You can
also add a column with the header `label` in order to use both
a machine-readable ID (`value`) and a human-readable label (`label`). If you
omit the `label` column then the `value` is used as the label as well. It's
also worth mentioning that your options sheets can have any number of
additional columns as well, as long as you include one called `value` that
uniquely identifies each row.

Now if you look again at your Harvester form you should see another input
field that lets you choose the Pokemon's type! In the real world it would
probably make sense to make this field required as well, but we won't in this
example.

In reality [there are _a lot_ more types][pokemon-types], and some Pokemon are
even combinations of multiple types. To better capture that complexity you
might want to add the option `multiple:true` to the "Type" column in order to
allow reporters to select multiple types when identifying a Pokemon.

#### Adding a select input with an option list

In addition to a Pokemon's type we might care whether or not we've already
caught the Pokemon in question. Let's handle that with a radio button:

| headline       | Pokemon             |                |                       |                |
|:---------------|:--------------------|:---------------|:----------------------|:---------------|
| chatter        | Gotta catch 'em all |                |                       |                |
| column         | Name                | string         | required:true         |                |
| column         | Type                | select         | options:types         |                |
| **[column][]** | **Already caught**  | **[select][]** | **optionlist:Yes,No** | **default:No** |

This should give us a radio button input with two options: "Yes" and "No". The
"No" option should be checked by default.

#### Adding a complex input

Maybe we want to dig a little deeper into the capabilities of the Pokemon we're
investigating. What if we want to collect data on their attacks? Let's say that
in our simplified example each attack has a name and a percent chance from 0%
to 100% of hitting its target. Each Pokemon has anywhere from one to several
attacks, so we'll need a way to add a variable number of complex objects to our
Pokemon. This is where the [`has_many` field][has_many] shines. Setting it up
is a bit more involved than our other input types because we have to specify
not only the `has_many` field itself, but also the [`relative_column` column
definitions][relative_column] for the relative model of which our primary model
_has many_.

| headline                | Pokemon             |                  |                      |                   |             |
|:------------------------|:--------------------|:-----------------|:---------------------|:------------------|:------------|
| chatter                 | Gotta catch 'em all |                  |                      |                   |             |
| column                  | Name                | string           | required:true        |                   |             |
| column                  | Type                | select           | options:types        |                   |             |
| column                  | Already caught      | select           | optionlist:Yes,No    | default:No        |             |
| **[column][]**          | **Attacks**         | **[has_many][]** | **relative:attacks** |                   |             |
| **[relative_column][]** | **Attack Name**     | **[string][]**   | **relative:attacks** | **required:true** |             |
| **[relative_column][]** | **Hit Chance (%)**  | **[number][]**   | **relative:attacks** | **min:0**         | **max:100** |

There's a lot more going on there, but let's break it down:

* We added a new `column` to our dataset ("Attacks") which is a `has_many`
  field, the structure of which is defined by the relative model called
  `attacks`.

* We defined two fields on the relative model `attacks`: "Attack Name", which
  is a required string; and "Hit Chance (%)", which is a number that has to be
  between 0 and 100.

Note that both of the `relative_column` rows have to include the option
`relative: attacks` to specify _which_ relative model they apply to. That's
what allows Harvester to figure out that "Attack Name" and "Hit Chance (%)" go
with the "Attacks" input field.

#### Making our dataset updatable with an index

Most of the data we're collecting so far won't really change. Pikachu is and
electric-type Pokemon, and Pikachu will always be an electric-type Pokemon. You
might notice that one data point _might_ change though: whether or not we've
already caught a certain Pokemon. As data journalists by day and Pokemon
trainers by night we are (hopefully) going to be catching new Pokemon even as
we're collecting our data. So if we enter data on Goldeen never having caught
one and then proceed to catch one the next day we'll need to update our dataset
to reflect that.

With our current setup we _could_ add a new entry for Goldeen, but we would
also have to enter all the other information, like the fact that Goldeen is
a water type. That's both annoying and error-prone, and luckily Harvester lets
us do something better: we can set an `index` indicating that the _entities_
we're collecting data on are uniquely identified by the "Name" field, since no
two Pokemon will share the same name.

| headline        | Pokemon             |          |                   |               |         |
|:----------------|:--------------------|:---------|:------------------|:--------------|:--------|
| chatter         | Gotta catch 'em all |          |                   |               |         |
| **[index][]**   | **name**            |          |                   |               |         |
| column          | Name                | string   | required:true     | **key:name**  |         |
| column          | Type                | select   | options:types     |               |         |
| column          | Already caught      | select   | optionlist:Yes,No | default:No    |         |
| column          | Attacks             | has_many | relative:attacks  |               |         |
| relative_column | Attack Name         | string   | relative:attacks  | required:true |         |
| relative_column | Hit Chance (%)      | number   | relative:attacks  | min:0         | max:100 |

Notice that we've made _two_ important changes: we've specified that the our
dataset is _indexed_ by the field with the key `name` and we've added the key
`name` to the "Name" column.

Now Harvester will render this project very differently. Instead of getting the
entire form at the start you will only be prompted for a Pokemon's name; once
you enter a name, Harvester will look up the most current data on that Pokemon
and render the rest of the form with the current data pre-populated.

Now updating the caught status of Goldeen is much easier!

#### Encouraging index uniformity with a creatable select

You might see that we're still opening ourselves up to some human error here by
using a `string` input as our `index` value. What if you have a sticky keyboard
and accidentally type "Goldeeen" as your index value? Well, you'll get a blank
form because you haven't previously recorded "Goldeeen" and you might fill it
out never realizing that you _did_ have data already under the correctly
spelled name!

You can make your life a bit easier in this situation by using a _creatable
`select` field_ instead of a `string` field. It will work exactly like the
"Type" field that we created, pulling a set of options from a separate tab,
_but_ it will allow users to _create new options that aren't already included_.

| headline        | Pokemon             |                |                   |                   |                    |          |
|:----------------|:--------------------|:---------------|:------------------|:------------------|:-------------------|:---------|
| chatter         | Gotta catch 'em all |                |                   |                   |                    |          |
| index           | name                |                |                   |                   |                    |          |
| column          | Name                | **[select][]** | required:true     | **options:names** | **creatable:true** | key:name |
| column          | Type                | select         | options:types     |                   |                    |          |
| column          | Already caught      | select         | optionlist:Yes,No | default:No        |                    |          |
| column          | Attacks             | has_many       | relative:attacks  |                   |                    |          |
| relative_column | Attack Name         | string         | relative:attacks  | required:true     |                    |          |
| relative_column | Hit Chance (%)      | number         | relative:attacks  | min:0             | max:100            |          |

Now we've changed "Name" to a [`select` field][select] that pulls its options
from a tab named `names` (we'll have to create that and add the `value` column
header in `A1`), and we've specified that the select is `creatable`. If you
look back at your form you'll see that, if your `names` tab doesn't have any
names under the `value` header, you're given a drop-down with no options. If
you type a name into the drop-down though, you can _create_ and option that's
not there. When you submit the form you'll see that the new name you created
gets added to the end of the `names` sheet in the `value` column. The next time
you go to submit the form the drop-down will include that name as an already
available option.

[new-sheet]: https://sheets.new
[setup-google]: ./setup.md#google-credentials
[schema]: ./schema.md
[configuration]: ./configuration_resource.md
[collaboration]: ./collaboration.md
[google-spreadsheet-id]: https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id
[pokemon-types]: https://pokemon.fandom.com/wiki/Types
[headline]: ./schema.md#headline
[chatter]: ./schema.md#chatter
[index]: ./schema.md#index
[column]: ./schema.md#column
[relative_column]: ./schema.md#relative_column
[string]: ./schema.md#string
[select]: ./schema.md#select
[number]: ./schema.md#number
[has_many]: ./schema.md#has_many
