import * as vscode from 'vscode';
import { ExecutionEngine } from '../core/execution-engine';
import { OutputPanel } from '../../frontend/output-panel';

/**
 * Coordinates the code execution process from user interaction to result display
 * 
 * Responsibilities:
 * 1. Receives the active document when the user triggers execution
 * 2. Uses ExecutionEngine to run the code and get results
 * 3. Passes results to OutputPanel for display
 * 4. Handles errors during the execution process
 */
export class QuickRunner {
  constructor(private readonly outputPanel: OutputPanel) { }

  /**
   * Executes code from the active document and displays results
   * 
   * @param document The active text document containing code to execute
   */
  async runCode(document: vscode.TextDocument) {
    try {
      // Create execution engine and run the code
      const engine = new ExecutionEngine();
      const result = await engine.execute(document);

      // Display results in the output panel
      this.outputPanel.showResults(
        result.executionTime,
        result.output,
        result.error
      );
    } catch (error: any) {
      // Display error message if execution fails
      this.outputPanel.showResults(0, '', `❌ Execution failed: ${error.message}`);
    }
  }
}