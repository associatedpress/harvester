AP Harvester
============

[AP Harvester][docs] is an [open source][repo], collaborative data collection
platform designed to help newsrooms gather structured data at the speed of
news. We built it to lower the barriers in spinning up a new data collection
project so that you can get to the story faster.

Harvester is schema-driven, meaning you define the structure of the dataset
you want to collect and Harvester automatically renders a user-friendly form
through which a team of reporters can enter data as they collect it. It's built
to be flexible and transparent, allowing you to adapt as your data collection
needs change.

The current iteration of Harvester uses Google Sheets as a data storage
mechanism, meaning you can view and work with your data in a tool used by many
newsrooms already. Starting a new data collection project with AP Harvester is
as easy [creating a new spreadsheet][sheet-new].

Before you dive into deploying the docker container, you need to set up some Google
credentials for the tool to use.

## Google Credentials

Since Harvester relies on Google Sheets for data storage, the first step in
setting up your own Harvester is [creating a Google service account for the
tool to use][create-service-account] and setting up [a GoogleOAuth
client][create-oauth]. You can find [a more detailed guide
here][setup-google-credentials].

### Running the Docker Container

In order to run this container you will have to first pull the
Docker container:

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

Next, we're setting your Google OAuth credentials. Like we said earlier, setting up Google OAuth is recommended, but you can leave out `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` if you want to disable authentication.

After that comes your Google service account credentials. There are two different ways you can set these: through an environment variable or by mounting a file. In the command above we're setting the credentials with the environment variable `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`, which we're setting to be the contents of a file called `.auth.json`. 

(This assumes you have a file called `.auth.json` in the directory where you are running this command. The file should contain your service account JSON credentials. You can edit the file directly with a text editor, if you prefer not running the `cat` command to write to write the content of that .auth.json file.)

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

When all this is complete, you can access AP Harvester by going to [http://localhost:8000](http://localhost:8000) in your web browser and [get started setting up a project][first-project]!

[docs]: https://harvester.readthedocs.io/
[repo]: https://github.com/associatedpress/harvester
[sheet-new]: https://sheets.new
[create-service-account]: https://cloud.google.com/iam/docs/creating-managing-service-accounts
[create-oauth]: https://support.google.com/cloud/answer/6158849?hl=en
[first-project]: https://harvester.readthedocs.io/en/latest/first_project
[configuration-sheet]: https://harvester.readthedocs.io/en/latest/configuration_resource
[setup-google-credentials]: https://harvester.readthedocs.io/en/latest/setup#google-credentials
