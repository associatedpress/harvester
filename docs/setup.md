Setting up your own Harvester
=============================

There are several different ways you can deploy your very own Harvester.
Because the project is open source, you can take the code and run it directly
on a server; you can also run our freely available Docker container or build
your own Docker container using the Dockerfile included in the project; or you
can deploy Harvester directly to [Heroku][] at the click of a button.

Before you dive into deploying the code, you first need to set up some Google
credentials for the tool to use, no matter how you deploy it.

## Google Credentials

Since AP Harvester relies on Google Sheets for data storage, the first step in
setting up your own Harvester is [creating a Google service account for the
tool to use][create-service-account]. This is the account that Harvester will
use to read and write Google Sheets, so each sheet you create to start a new
Harvester project will need to be shared with this account as an editor. (When
sharing a Google Sheet with a service account it's a good idea to uncheck the
"Notify people" box, because if you don't then you might get an email
bounce-back telling you the notification couldn't be delivered; that's not
a problem, but it can be annoying.) Once you've created the service account you
will get a set of credentials in a JSON file. You should keep those credentials
safe in your records for future use, but we'll be using them when we deploy the
app shortly.

The next step is to [create a Google OAuth client][create-oauth] to allow users
to sign into Harvester using their Google accounts. This is technically
optional, but it is strongly recommended unless you want every Harvester
project to be available to everyone who has access to the app. Still, there are
advantages to enabling authentication, like automatically tracking which users
have entered data. While you are setting up your Google OAuth consent screen
for the application you will need to include the following scopes:

* `auth/userinfo.email`

* `auth/userinfo.profile`

We'll use the OAuth client ID and client secret shortly when we deploy the app.

## Deploying to Heroku

[Heroku][] is an app deployment platform that will host and run your deployment
of AP Harvester for free, provided you don't exceed certain usage limits. It
can be a convenient way to escape the hassle of managing server infrastructure
yourself, especially if you want to spin up your own version of Harvester to
see if it's right for you. You will need to [create a Heroku
account][heroku-create-account] if you don't already have one.

Once you've created and signed in to your Heroku account and you're ready to
deploy your very own Harvester, click on the button below. (It might be helpful
to open the link in a new tab so you can still reference these instructions.)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/associatedpress/harvester)

The link will take you to a page to configure your new app in Heroku’s
dashboard. First, you need to give your app a name. This name will be included
in the URL of your Harvester, so try to pick something informative. An
abbreviation of your newsroom along with the word "harvester" might be a good
choice, like `tmp-harvester` or `khn-harvester`; you'll end up with a URL like
[https://khn-harvester.herokuapp.com](https://khn-harvester.herokuapp.com).

Next, scroll down to the "Config vars" section, where you should see entry
fields where you can set values for things like
`GOOGLE_APPLICATION_CREDENTIALS`, `GOOGLE_OAUTH_CLIENT_ID` and more. If you
created a Google OAuth client then go ahead and paste in your client ID and
client secret in the fields marked `GOOGLE_OAUTH_CLIENT_ID` and
`GOOGLE_OAUTH_CLIENT_SECRET`, respectively; if you don't want to use
authentication you can leave those two fields blank, but again, we recommend
taking the time to set it up. Paste you Google service account credentials
(that JSON you downloaded when setting up your service account) into the field
marked `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`.

If you want to [set up your Harvester instance with a configuration
sheet][configuration-sheet], you can paste [the spreadsheet's
ID][google-spreadsheet-id] into the field marked
`HARVESTER_CONFIG_RESOURCE_ID`. This is optional, but setting up a Harvester
configuration sheet will allow you to create custom URLs for your Harvester
projects, so it can be nice to have.

Once you've entered all your configuration information you can hit the "Deploy
app" button at the bottom of the page and Heroku should start building and
deploying your app. This will take a few minutes, but Heroku should tell you
what it's doing as it goes through the process. If all goes well, you should
see a message like "Your app was successfully deployed" and you should see two
links: "Manage app", which will take you to the Heroku dashboard for your newly
created Harvester app; and "View", which will take you to Harvester itself!
When you click the "View" button it should take you to the URL of your
Harvester instance (e.g.,
[https://ap-harvester.herokuapp.com](https://ap-harvester.herokuapp.com)) and
you should see the Harvester landing page.

At this point it would be a good idea to [set up a simple Harvester
project][first-project] to
make sure that all your credentials are working as expected.

## Deploying directly or with Docker

Heroku is great, but it's not for everyone. Maybe your newsroom already has
a preferred environment for running apps and you would prefer to run Harvester
there. In that case you have two choices: you can use our pre-built Docker
contianer or you can deploy and run the code directly. No matter how you run
your Harvester you will still need [the same set of credentials mentioned
above][setup-google-credentials], so you should start there.

### Pre-built Docker Container

In order to run our pre-built Docker contianer you will have to first pull the
Docker container and then run it with all your credentials and a few other
parameters set through environment variables. Once you have the Harvester
container your `docker run` command should look something like this:

```shell
docker run -it \
  --publish 8000:80 \
  --env JWT_SECRET="$( date | sha256sum | base64 )" \
  --env GOOGLE_OAUTH_CLIENT_ID=<YOUR_GOOGLE_OAUTH_ID> \
  --env GOOGLE_OAUTH_CLIENT_SECRET=<YOUR_GOOGLE_OAUTH_SECRET> \
  --env GOOGLE_SERVICE_ACCOUNT_CREDENTIALS="$( cat .auth.json )" \
  --env HARVESTER_CONFIG_RESOURCE_ID=<YOUR_CONFIG_SHEET_ID> \
  docker.artifactory.ap.org/interact/harvester:v2.0.4
```

That might look like a lot, but let's step through it. First, the base command
is `docker run` and we're passing the flags `-it` to make our container
interactive and connect it to our terminal output. (If you're running the
container on a server you might want to omit the `-it` flags.)

Next, we're forwarding (or "publishing") port 8000 on the host that is running
the container to port 80 in the container. If you ran the command at the
command line that would mean you could go to
[http://localhost:8000](http://localhost:8000) and get to Harvester.

After that we're setting a number of environment variables. First is your
`JWT_SECRET`; this should just be some random string that Harvester can use to
sign JSON web tokens. You can put in your own value or generate a secret using
some other method if you want.

Next, we're setting your Google OAuth credentials. [Like we said
earlier][setup-google-credentials], setting up Google OAuth is recommended, but
you can leave out `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` if
you want to disable authentication.

After that comes your Google service account credentials. There are two
different ways you can set these: through an environment variable or by
mounting a file. In the command above we're setting the credentials with the
environment variable `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`, which we're setting
to be the contents of a file called `.auth.json`. (This assumes that you have
a file `.auth.json` in the directory where you're running this command that
contains your service account JSON credentials; it's not required that you
`cat` the file to get the value inline like that.)

You can also set your service account credentials by mounting your `.auth.json`
file in the container. Replace this

```shell
--env GOOGLE_SERVICE_ACCOUNT_CREDENTIALS="$( cat .auth.json )"
```

with this

```shell
--volume=/absolute/path/to/local/.auth.json:/app/.auth.json
```

using the appropriate absolute path to your `.auth.json` file.

Finally, we're setting a [Harvester configuration resource ID to use as our
Harvester config][configuration-sheet]. That's optional and you can choose
whether using a configuration is right for you.

### Running Directly

If you want to run Harvester's source code directly (or build your own Docker
container) you should probably start by [checking out the development
documentation][development] to see how to run the app, build a Docker
container, and get the app running on your own. From there you can use any
means you like to get the code deployed on a server and run it.

[create-service-account]: https://cloud.google.com/iam/docs/creating-managing-service-accounts
[create-oauth]: https://support.google.com/cloud/answer/6158849?hl=en
[Heroku]: https://www.heroku.com/
[heroku-create-account]: https://signup.heroku.com/
[google-spreadsheet-id]: https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id
[first-project]: ./first_project.md
[configuration-sheet]: ./configuration_resource.md
[setup-google-credentials]: ./setup.md#google-credentials
[development]: ./development.md
