import * as vscode from 'vscode';

export class RunButton implements vscode.Disposable {
  private readonly statusBarItem: vscode.StatusBarItem;

  constructor(runCommand: vscode.Disposable) {
    // Create and configure status bar item
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.text = "$(play) Run Code";
    this.statusBarItem.tooltip = "Execute and time code execution";
    this.statusBarItem.command = "code-timer.run";
    this.statusBarItem.show();
  }

  /**
   * Cleanup resources when extension is deactivated
   */
  dispose() {
    this.statusBarItem.dispose();
  }
}