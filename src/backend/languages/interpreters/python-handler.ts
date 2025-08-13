import { CodeExecutor } from '../interfaces';
import { ProcessManager } from '../../../shared/utils/process-manager';

/**
 * Handles Python code execution
 * 
 * Responsibilities:
 * 1. Executes Python code directly using python command
 * 2. Captures output and errors
 */
export class PythonHandler implements CodeExecutor {
  async execute(filePath: string, processManager: ProcessManager) {
    return processManager.runProcess('python', [filePath]);
  }
}