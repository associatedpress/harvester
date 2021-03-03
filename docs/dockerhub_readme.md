AP Harvester
============

AP Harvester is an open source, collaborative data collection platform designed
to help newsrooms gather structured data at the speed of news. We built it to
lower the barriers in spinning up a new data collection project so that you can
get to the story faster.

AP Harvester is schema-driven, meaning you define the structure of the dataset
you want to collect and Harvester automatically renders a user-friendly form
through which a team of reporters can enter data as they collect it. It's built
to be flexible and transparent, allowing you to adapt as your data collection
needs change.

The current iteration of AP Harvester uses Google Sheets as a data storage
mechanism, meaning you can view and work with your data in a tool used by many
newsrooms already. Starting a new data collection project with AP Harvester is
as easy [creating a new spreadsheet][sheet-new].

[sheet-new]: https://sheets.new

Before you dive into deploying the docker container, you need to set up some Google
credentials for the tool to use.

## Google Credentials

Since AP Harvester relies on Google Sheets for data storage, the first step in
setting up your own Harvester is [creating a Google service account for the
tool to use][create-service-account]. 

This is the account that Harvester uses to read and write Google Sheets, so each time you start a new Harvester project, the sheet you create will need to be shared as an editor with this account. 

(When sharing a Google Sheet with a service account it's a good practice to uncheck the "Notify people" box, otherwise, you'll get an email bounce-back telling you the notification couldn't be delivered; that's not a problem, but it can be annoying.) 

Once you've created the service account you will get a set of credentials in a JSON file. You should keep these credentials safe for future use, but we'll also be using them when we deploy the app.

The next step is to [create a Google OAuth client][create-oauth] allowing users 
to sign into Harvester with their Google accounts. This is optional, but it is strongly recommended unless you want every Harvester project to be available to all your users. There are other advantages to enabling authentication, like automatically tracking which users have entered data. You'll need to include the following scopes when setting up your Harvester's Google OAuth consent screen:

* `auth/userinfo.email`

* `auth/userinfo.profile`

The OAuth client ID and client secret will be used when we deploy the container.

### Pre-built Docker Container

In order to run our pre-built Docker container you will have to first [pull the
Docker container][docker-harvester]. The container is available on Docker Hub and you can pull it with:

```shell
docker pull associatedpress/harvester
```

Then run it with all your credentials and a few other parameters set
using environment variables. The `docker run` command should look something like this:

We will go over the details below.

```shell
docker run -it \
  --publish 8000:80 \
  --env JWT_SECRET="$( date | sha256sum | base64 )" \
  --env GOOGLE_OAUTH_CLIENT_ID=<YOUR_GOOGLE_OAUTH_ID> \
  --env GOOGLE_OAUTH_CLIENT_SECRET=<YOUR_GOOGLE_OAUTH_SECRET> \
  --env GOOGLE_SERVICE_ACCOUNT_CREDENTIALS="$( cat .auth.json )" \
  --env HARVESTER_CONFIG_RESOURCE_ID=<YOUR_CONFIG_SHEET_ID> \
  associatedpess/harvester
```

That might look like a lot, but let's step through it. 

First, the base command is `docker run` and we're passing the flags `-it` to make our container interactive and connect it to our terminal output. (If you're running the container on a server you might want to omit the `-it` flags.)

Next, we're forwarding (or "publishing") port 8000 on the machine that is
running the container to port 80 in the container. 

If you ran the command at the command line that would mean you could go to
[http://localhost:8000](http://localhost:8000) and get to Harvester.

After that we're setting a number of environment variables. First is your `JWT_SECRET`; this should be a random string that Harvester can use to sign JSON web tokens. You can put in your own value or generate a secret using some other method if you want.

Next, we're setting your Google OAuth credentials. [Like we said earlier][setup-google-credentials], setting up Google OAuth is recommended, but you can leave out `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` if you want to disable authentication.

After that comes your Google service account credentials. There are two different ways you can set these: through an environment variable or by mounting a file. In the command above we're setting the credentials with the environment variable `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`, which we're setting to be the contents of a file called `.auth.json`. 

(This assumes you have a file ) `.auth.json` in the directory where you are running this command. The file should contain your service account JSON credentials. You can edit the file directly with a text editor, if you prefer not running the `cat` command to write to write the content of that .auth.json file.)

You can also set your service account credentials by mounting your `.auth.json` file inthe container. Replace this

```shell
--env GOOGLE_SERVICE_ACCOUNT_CREDENTIALS="$( cat .auth.json )"
```

with this

```shell
--volume=/absolute/path/to/local/.auth.json:/app/.auth.json
```

using the appropriate absolute path to your `.auth.json` file.

Finally, we're setting a [Harvester configuration resource ID to use as our Harvester config][configuration-sheet]. That's optional and you can choose whether using a configuration sheet is right for you.

When all this is complete, you can access AP Harvester by going to http://localhost:8000 in your web browser.


