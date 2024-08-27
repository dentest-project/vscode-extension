import * as vscode from 'vscode';
import { Feature } from './feature';

export class FeatureTreeItem extends vscode.TreeItem {
    children: FeatureTreeItem[] | undefined;

    parent: FeatureTreeItem | undefined;

    feature: Feature | undefined;

    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command,
        children?: FeatureTreeItem[],
        parent?: FeatureTreeItem,
        feature?: Feature
    ) {
        super(label, collapsibleState);

        this.children = children;
        this.parent = parent;
        this.feature = feature;
    }
}
