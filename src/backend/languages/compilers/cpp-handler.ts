import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import { CodeExecutor } from "../interfaces";
import { ProcessManager } from "../../../shared/utils/process-manager";

export class CppHandler implements CodeExecutor {
  async execute(filePath: string, processManager: ProcessManager) {
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));
    let outputPath = path.join(dir, baseName);

    if (os.platform() === "win32") {
      outputPath += ".exe";
    }

    const gppPath = "C:\\MinGW\\bin\\g++.exe"; // hardcoded per your original code

    // Compile
    const compileResult = await processManager.runProcess(gppPath, [
      filePath,
      "-o",
      outputPath,
    ]);

    if (compileResult.stderr && compileResult.stderr.trim() !== "") {
      return {
        stdout: "",
        stderr: `Compilation failed: ${compileResult.stderr}`,
      };
    }

    // Run the compiled program
    const execFileName =
      os.platform() === "win32" ? path.basename(outputPath) : `./${baseName}`;

    // Force synchronous-style capture to avoid empty stdout
    const executionResult = await processManager.runProcess(execFileName, [], {
      cwd: dir,
      shell: os.platform() === "win32" ? "cmd.exe" : undefined,
    });

    // Clean up after execution
    try {
      await fs.unlink(outputPath);
    } catch (cleanupError) {
      console.warn("Could not clean up executable:", cleanupError);
    }

    return {
      stdout: executionResult.stdout?.toString() || "",
      stderr: executionResult.stderr?.toString() || "",
    };
  }
}
