import * as vscode from 'vscode';
import { CONFIGURATION_KEY } from "../constants";
import { Configuration } from '../types/configuration';
import { Feature } from '../types/feature';
import { FeatureTreeDataProvider } from '../provider/feature-tree.provider';

export const pullCommandDefinition = async () => {
    const config: Configuration = vscode.workspace.getConfiguration().get(CONFIGURATION_KEY) as Configuration;

    if (!config.api || !config.pullToken || !config.featuresDestination) {
      vscode.window.showWarningMessage('Configuration is missing or incomplete. Please configure Dentest.');

      await vscode.commands.executeCommand('dentest.configuration');

      return;
    }

    try {
      const response = await fetch(`${config.api}/pull/features?inlineParameterWrapper=${config.inlineParamWrapper}`, {
        method: 'GET',
        headers: {
          'Authorization': `Pull ${config.pullToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        vscode.window.showErrorMessage('Failed to pull features. Maybe try to reconfigure Dentest for this workspace.');

        await vscode.commands.executeCommand('dentest.configuration');

        return; 
      }

      const data = (await response.json()) as Feature[];

      const featuresTreeDataProvider = new FeatureTreeDataProvider(data);
      
      const treeView = vscode.window.createTreeView('featuresTreeView', { treeDataProvider: featuresTreeDataProvider });

      treeView.onDidChangeSelection(async (event) => {
        const selectedItem = event.selection[0];

        if (selectedItem && selectedItem.feature) {
          const feature = selectedItem.feature;
          const filePath = vscode.Uri.file(`${config.featuresDestination}/${feature.path}`);
          await vscode.workspace.fs.writeFile(filePath, Buffer.from(feature.feature, 'utf8'));

          const document = await vscode.workspace.openTextDocument(filePath);
          await vscode.window.showTextDocument(document);

          vscode.window.showInformationMessage(`Feature file created: ${filePath.fsPath}`);
        }
      });

      vscode.window.showInformationMessage('Features pulled. You can see them in the "Features" section of the explorer');
    } catch (error) {
      vscode.window.showErrorMessage(`Pull failed: ${error}`);
    }
  };
