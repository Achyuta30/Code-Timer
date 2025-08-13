import { ProcessManager } from '../../shared/utils/process-manager';

/**
 * Defines the contract for code execution handlers
 * 
 * Responsibilities:
 * 1. Standardizes interface for all language handlers
 * 2. Ensures consistent execute() method signature
 * 3. Decouples core execution from language specifics
 */
export interface CodeExecutor {
  /**
   * Execute code from a file
   * 
   * @param filePath Path to the code file
   * @param processManager Process management utility
   * @returns Promise with stdout and stderr
   */
  execute(
    filePath: string,
    processManager: ProcessManager
  ): Promise<{
    stdout: string;
    stderr: string;
  }>;
}