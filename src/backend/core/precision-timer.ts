/**
 * Measures code execution time with high precision
 * 
 * Responsibilities:
 * 1. Uses Node.js high-resolution time (process.hrtime())
 * 2. Measures time in milliseconds with microsecond precision
 * 3. Provides start/stop interface
 * 4. Throws errors if used incorrectly
 */
export class PrecisionTimer {
  private startTime: [number, number] | null = null;
  private endTime: [number, number] | null = null;

  /**
   * Start the timer
   */
  start() {
    this.startTime = process.hrtime();
  }

  /**
   * Stop the timer
   */
  stop() {
    if (!this.startTime) throw new Error("Timer not started!");
    this.endTime = process.hrtime(this.startTime);
  }

  /**
   * Get elapsed time in milliseconds
   * 
   * @returns Execution time in whole milliseconds
   */
  getTime(): number {
    if (!this.endTime) throw new Error("Timer not stopped!");
    // Convert [seconds, nanoseconds] to milliseconds
    return Math.round(this.endTime[0] * 1000 + this.endTime[1] / 1000000);
  }
}