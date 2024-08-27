import * as vscode from 'vscode';
import { FeatureTreeItem } from '../types/feature-tree-item';
import { Feature } from '../types/feature';

export class FeatureTreeDataProvider implements vscode.TreeDataProvider<FeatureTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FeatureTreeItem | undefined | null | void> = new vscode.EventEmitter<FeatureTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FeatureTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
  
    private root: FeatureTreeItem;
  
    constructor(features: Feature[]) {
      this.root = new FeatureTreeItem('Root', vscode.TreeItemCollapsibleState.Expanded);
      this.buildTree(features);
    }
  
    getTreeItem(element: FeatureTreeItem): vscode.TreeItem {
      return element;
    }
  
    getChildren(element?: FeatureTreeItem): Thenable<FeatureTreeItem[]> {
      if (!element) {
        return Promise.resolve(this.root.children ?? []);
      }
  
      return Promise.resolve(element.children ?? []);
    }
  
    getParent(element: FeatureTreeItem): FeatureTreeItem | undefined {
      return element.parent;
    }
  
    refresh(features: Feature[]): void {
      this.root = new FeatureTreeItem('Root', vscode.TreeItemCollapsibleState.Expanded);
      this.buildTree(features);
      this._onDidChangeTreeData.fire();
    }
  
    private buildTree(features: Feature[]): void {
      const featureMap = new Map<string, FeatureTreeItem>();
  
      for (const feature of features) {
        const segments = feature.displayPath.split(' / ');
        let currentParent = this.root;
  
        for (let i = 0; i < segments.length; i++) {
          const segment = segments[i];
          let childNode = currentParent.children?.find(child => child.label === segment);
  
          if (!childNode) {
            const isLeaf = i === segments.length - 1;
            childNode = new FeatureTreeItem(
              segment, 
              isLeaf ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed,
              undefined, 
              undefined, 
              currentParent,
              isLeaf ? feature : undefined
            );
  
            if (!currentParent.children) {
              currentParent.children = [];
            }
  
            currentParent.children.push(childNode);
          }
  
          currentParent = childNode;
        }
      }
    }
  }