import * as path from 'path';
import { CodeExecutor } from '../interfaces';
import { ProcessManager } from '../../../shared/utils/process-manager';

/**
 * Handles Java code execution
 * 
 * Responsibilities:
 * 1. Compiles Java code using javac
 * 2. Runs compiled class using java
 * 3. Handles compilation and runtime errors
 */
export class JavaHandler implements CodeExecutor {
  async execute(filePath: string, processManager: ProcessManager) {
    // Extract class name and directory path
    const className = path.basename(filePath, '.java');
    const dirPath = path.dirname(filePath);

    // Compile Java code
    const { stderr: compileErr } = await processManager.runProcess(
      'javac',
      [filePath],
      { cwd: dirPath }
    );

    // Return if compilation fails
    if (compileErr) {
      return { stdout: '', stderr: compileErr };
    }

    // Run compiled Java class
    return processManager.runProcess(
      'java',
      [className],
      { cwd: dirPath }
    );
  }
}