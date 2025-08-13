/**
 * Processes and formats execution errors
 * 
 * Responsibilities:
 * 1. Cleans up unnecessary error messages
 * 2. Formats language-specific errors
 * 3. Limits output length for C++ errors
 */
export class ErrorHandler {
  /**
   * Process raw error output
   * 
   * @param rawError Original error string
   * @param language Programming language
   * @returns Processed error string
   */
  process(rawError: string, language: string): string {
    // Patterns to remove from error output
    const cleanupPatterns = [
      /Note: .*\.java uses? unchecked or unsafe operations\./g,
      /Note: Recompile with -Xlint:unchecked for details\./g
    ];

    let cleaned = rawError;
    // Apply all cleanup patterns
    cleanupPatterns.forEach(pattern => {
      cleaned = cleaned.replace(pattern, '');
    });

    // Language-specific formatting
    switch (language) {
      case 'java':
        // Simplify Java error messages
        return cleaned.replace(/error: /g, '');
      case 'cpp':
        // Limit C++ error output to first 10 lines
        return cleaned.split('\n').slice(0, 10).join('\n');
      default:
        // Trim whitespace for other languages
        return cleaned.trim();
    }
  }
}