import * as vscode from 'vscode';
import { CONFIGURATION_KEY } from '../constants';
import { configurationView } from '../views/configuration.view';
import { Configuration } from '../types/configuration';

export const configurationCommandDefinition = (context: vscode.ExtensionContext) => {
    const existingConfig: Configuration = vscode.workspace.getConfiguration().get(CONFIGURATION_KEY) as Configuration;

    const panel = vscode.window.createWebviewPanel(
      'configuration',
      'Dentest | Configuration',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    panel.webview.html = configurationView(existingConfig);

    panel.webview.onDidReceiveMessage(async message => {
      switch (message.command) {
        case 'saveConfiguration':
			const config = message.configuration;

			vscode.workspace.getConfiguration().update(CONFIGURATION_KEY, config, vscode.ConfigurationTarget.Workspace).then(() => {
				vscode.window.showInformationMessage('Configuration saved!');
			}, (err) => {
				vscode.window.showErrorMessage(`Failed to save configuration: ${err}`);
			});

			break;
		case 'selectFeaturesFolder':
			let defaultUri: vscode.Uri | undefined;

			if (existingConfig.featuresDestination.length > 0) {
				defaultUri = vscode.Uri.file(existingConfig.featuresDestination);
			} else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
				defaultUri = vscode.workspace.workspaceFolders[0].uri;
			}

			const folders = await vscode.window.showOpenDialog({
				canSelectFolders: true,
				canSelectFiles: false,
				canSelectMany: false,
				openLabel: 'Select features destination',
				defaultUri
			});

			if (folders && folders.length > 0) {
				panel.webview.postMessage({
					command: 'featuresFolderSelected',
					folderPath: folders[0].fsPath
				});
			}
			break;
      }
    }, undefined, context.subscriptions);
  };

