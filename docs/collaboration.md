Collaboration in AP Harvester
=============================

AP Harvester is a collaborative data collection project built to help newsrooms
carry out data collection projects. To collaborate on a project in Harvester
you first have to make sure the project is shared with the correct people.

Harvester determines who has access to a project by checking who has _read_
access to the Google Sheet that defines it. Harvester attempts to mediate
direct editing of the underlying sheet, so we use _read_ permissions to let
people enter data through Harvester without allowing them to edit the sheet
directly. Users with more access (for example, _edit_ permissions) are able to
enter data as well.

There are two ways you can grant access: share the sheet with a specific user,
or make the sheet available to anybody with the link. If a project is readable
or editable by anybody with the link then anybody who comes to your Harvester
project will be allowed to enter data whether they are signed in or not. If
a project is _not_ readable by anybody with the link then the project will only
be available to users with whom the project has been explicitly shared.

Note that this access restriction is only available if you enabled
authentication by [setting up Google OAuth][setup-google] and configuring it
when you set up your Harvester; otherwise all of your Harvester projects will
be openly available.

[setup-google]: ./setup.md#google-credentials
