import * as vscode from 'vscode';

// Map file extensions to language identifiers
const LANGUAGE_MAP: Record<string, string> = {
  '.java': 'java',
  '.cpp': 'cpp',
  '.cxx': 'cpp',
  '.cc': 'cpp',
  '.py': 'python',
  '.js': 'javascript'
};

/**
 * Detects programming language from file extension
 * 
 * Responsibilities:
 * 1. Extracts file extension from document's file name
 * 2. Maps extension to supported language
 * 3. Returns null for unsupported languages
 */
export class LanguageDetector {
  /**
   * Detect language from document
   * 
   * @param document The document to analyze
   * @returns Language identifier or null
   */
  detect(document: vscode.TextDocument): string | null {
    // Extract and normalize file extension
    const fileName = document.fileName;
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    return LANGUAGE_MAP[ext] || null;
  }
}