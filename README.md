# Dentest VSCode plugin

## Dentest

Dentest is a behavior-driven development platform that makes your Gherkin features live online so that they can be created and read by non-developers.
This plugin allows developers using Jetbrains IDEs to pull them

See the [Dentest documentation](https://docs.dentest.tech) for more details

## Usage

This plugin adds a button in the status bar, in order to pull your Gherkin features from your Dentest project.

The first time you click on it, it will ask for configuration information.

| Property             | Expected value                                                                                        | Default                  |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------ |
| API                  | The API of your Dentest installation. If you are using dentest.tech directly, keep the default value. | https://api.dentest.tech |
| Pull token           | Your personal token for this project, that you can copy from Dentest (if your user has pull rights)   |                          |
| Features destination | In which folder your Gherkin features will be created                                                 |                          |
| Inline param wrapper | The string that will surround the parameters from step sentences                                      | "                        |

Once this is filled and you're able to pull features from Dentest, they will show up in a "Features" section of the explorer. From there, you can click them and the corresponding Gherkin file will be instantly created or updated. 
