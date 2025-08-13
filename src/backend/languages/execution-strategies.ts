import { JavaHandler } from './compilers/java-handler';
import { CppHandler } from './compilers/cpp-handler';
import { PythonHandler } from './interpreters/python-handler';
import { JavaScriptHandler } from './interpreters/javascript-handler';
import { CodeExecutor } from './interfaces';

/**
 * Maps language identifiers to execution handlers
 * 
 * Responsibilities:
 * 1. Maintains registry of language handlers
 * 2. Provides the correct handler for a given language
 * 3. Throws error for unsupported languages
 */
export class ExecutionStrategies {
  // Marked as readonly since it's never reassigned after initialization
  private readonly strategies: Record<string, CodeExecutor> = {
    java: new JavaHandler(),
    cpp: new CppHandler(),
    python: new PythonHandler(),
    javascript: new JavaScriptHandler()
  };

  /**
   * Get executor for a specific language
   * 
   * @param language Language identifier
   * @returns CodeExecutor instance
   */
  getExecutor(language: string): CodeExecutor {
    const executor = this.strategies[language];
    if (!executor) throw new Error(`No executor for ${language}`);
    return executor;
  }
}