import * as vscode from 'vscode';
import { CONFIGURATION_KEY } from "../constants";

export const clearCommandDefinition = async () => {
    vscode.workspace.getConfiguration().update(CONFIGURATION_KEY, {
        api: 'https://api.dentest.tech',
        pullToken: '',
        featuresDestination: '',
        inlineParamWrapper: '"'
    }, vscode.ConfigurationTarget.Workspace);
};
