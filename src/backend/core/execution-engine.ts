import * as vscode from 'vscode';
import { LanguageDetector } from '../languages/language-detector';
import { ExecutionStrategies } from '../languages/execution-strategies';
import { PrecisionTimer } from './precision-timer';
import { FileUtils } from '../../shared/utils/file-utils';
import { ProcessManager } from '../../shared/utils/process-manager';
import { ErrorHandler } from '../../shared/utils/error-handler';

/**
 * Core component that coordinates the code execution process
 * 
 * Responsibilities:
 * 1. Detects the programming language of the active document
 * 2. Saves code to a temporary file for execution
 * 3. Selects the appropriate language handler
 * 4. Measures execution time with PrecisionTimer
 * 5. Processes errors with ErrorHandler
 * 6. Ensures cleanup of temporary files
 */
export class ExecutionEngine {
  constructor(
    private readonly languageDetector: LanguageDetector = new LanguageDetector(),
    private readonly strategies: ExecutionStrategies = new ExecutionStrategies(),
    private readonly fileUtils: FileUtils = new FileUtils(),
    private readonly processManager: ProcessManager = new ProcessManager(),
    private readonly errorHandler: ErrorHandler = new ErrorHandler()
  ) { }

  /**
   * Executes code from a document and returns results
   * 
   * @param document The document containing code to execute
   * @returns Object with execution time, output, and error
   */
  async execute(document: vscode.TextDocument): Promise<{
    executionTime: number;
    output: string;
    error: string | null;
  }> {
    // Detect language from file extension
    const language = this.languageDetector.detect(document);
    if (!language) {
      throw new Error("Unsupported language. Supported: Java, C++, Python, JavaScript");
    }

    // Save code to temporary file
    const filePath = await this.fileUtils.saveTempFile(document);
    // Get language-specific executor
    const executor = this.strategies.getExecutor(language);

    const timer = new PrecisionTimer();
    try {
      // Start timing and execute code
      timer.start();
      const { stdout, stderr } = await executor.execute(filePath, this.processManager);
      timer.stop();

      return {
        executionTime: timer.getTime(),
        output: stdout,
        error: stderr ? this.errorHandler.process(stderr, language) : null
      };
    } finally {
      // Clean up temporary files even if execution fails
      await this.fileUtils.cleanupTempFile(filePath);
    }
  }
}