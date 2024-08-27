import * as vscode from 'vscode';
import { configurationCommandDefinition } from './commands/configuration.command';
import { pullCommandDefinition } from './commands/pull.command';
import { FeatureTreeDataProvider } from './provider/feature-tree.provider';
import { clearCommandDefinition } from './commands/clear.command';

export function activate(context: vscode.ExtensionContext) {
  const configurationCommand = vscode.commands.registerCommand('dentest.configuration', () => configurationCommandDefinition(context));
  const pullCommand = vscode.commands.registerCommand('dentest.pull', pullCommandDefinition);
  const clearCommand = vscode.commands.registerCommand('dentest.clear', clearCommandDefinition);

  context.subscriptions.push(pullCommand);
  context.subscriptions.push(configurationCommand);
  context.subscriptions.push(clearCommand);

  vscode.window.registerTreeDataProvider('featuresTreeView', new FeatureTreeDataProvider([]));

  let pullStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

  pullStatusBarItem.command = 'dentest.pull';
  pullStatusBarItem.text = `$(cloud-download) Dentest pull`;
  pullStatusBarItem.color = '#7f83e5';
  pullStatusBarItem.tooltip = 'Pull the latest features from Dentest';
  pullStatusBarItem.show();

  context.subscriptions.push(pullStatusBarItem);
}

export function deactivate() {}
