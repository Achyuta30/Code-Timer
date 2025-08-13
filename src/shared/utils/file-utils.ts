import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * Manages temporary files for code execution
 * 
 * Responsibilities:
 * 1. Saves document content to temporary files
 * 2. Creates unique temporary directories
 * 3. Cleans up temporary files after execution
 */
export class FileUtils {
  /**
   * Save document content to temporary file
   * 
   * @param document Document to save
   * @returns Path to temporary file
   */
  async saveTempFile(document: vscode.TextDocument): Promise<string> {
    // Create unique temporary directory
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'code-timer-'));
    // Preserve original file name using nullish coalescing
    const fileName = document.fileName.split(path.sep).pop() ?? 'code';
    const filePath = path.join(tempDir, fileName);

    // Write document content to file
    await fs.promises.writeFile(filePath, document.getText());
    return filePath;
  }

  /**
   * Clean up temporary files
   * 
   * @param filePath Path to temporary file
   */
  async cleanupTempFile(filePath: string) {
    const dir = path.dirname(filePath);
    try {
      // Recursively delete temporary directory
      await fs.promises.rm(dir, { recursive: true, force: true });
    } catch (error) {
      console.error(`Temp cleanup failed: ${error}`);
    }
  }
}