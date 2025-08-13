import * as vscode from 'vscode';
import { RunButton } from '../frontend/run-button';
import { OutputPanel } from '../frontend/output-panel';
import { QuickRunner } from '../backend/runners/quick-runner';

export function activate(context: vscode.ExtensionContext) {
  const outputPanel = new OutputPanel();
  const quickRunner = new QuickRunner(outputPanel);

  // Register command and create button
  const runCommand = vscode.commands.registerCommand('code-timer.run', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active code editor!');
      return;
    }
    quickRunner.runCode(editor.document);
  });

  // Store RunButton instance in a variable and add to subscriptions
  const runButton = new RunButton(runCommand);
  context.subscriptions.push(runCommand, outputPanel, runButton);
}

export function deactivate() {
  // Cleanup handled by VS Code's disposal mechanism
}