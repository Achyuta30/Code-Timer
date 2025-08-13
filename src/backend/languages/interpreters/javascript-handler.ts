import { CodeExecutor } from '../interfaces';
import { ProcessManager } from '../../../shared/utils/process-manager';

/**
 * Handles JavaScript code execution
 * Responsibilities:
 * 1. Executes JavaScript code using Node.js
 * 2. Captures output and errors
 */
export class JavaScriptHandler implements CodeExecutor {
    async execute(filePath: string, processManager: ProcessManager) {
        return processManager.runProcess('node', [filePath]);
    }
}