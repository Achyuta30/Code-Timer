import * as vscode from 'vscode';

/**
 * Manages the output panel that displays execution results
 * 
 * Responsibilities:
 * 1. Creates a dedicated output channel for the extension
 * 2. Formats and displays execution results with:
 *    - Execution time in milliseconds
 *    - Program output
 *    - Error messages (if any)
 * 3. Clears previous results before showing new ones
 * 4. Automatically shows the output panel when results are available
 */
export class OutputPanel implements vscode.Disposable {
  private readonly outputChannel: vscode.OutputChannel;

  constructor() {
    // Create output channel with extension's name
    this.outputChannel = vscode.window.createOutputChannel('Code Timer');
  }

  /**
   * Formats and displays execution results in the output panel
   * 
   * @param executionTime Code execution time in milliseconds
   * @param output Program's standard output
   * @param error Program's error output (if any)
   */
  public showResults(executionTime: number, output: string, error: string | null) {
    // Clear previous results
    this.outputChannel.clear();

    // Display execution time
    this.outputChannel.appendLine(`⏱️ Execution Time: ${executionTime}ms`);
    this.outputChannel.appendLine("--- Output ---");
    this.outputChannel.append(output);

    // Display errors if present
    if (error) {
      this.outputChannel.appendLine("\n--- Errors ---");
      this.outputChannel.append(error);
    }

    // Show the output panel
    this.outputChannel.show(true);
  }

  /**
   * Cleanup resources when extension is deactivated
   */
  public dispose() {
    this.outputChannel.dispose();
  }
}