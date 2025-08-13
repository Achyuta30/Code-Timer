import * as child_process from "child_process";
import { promisify } from "util";

const exec = promisify(child_process.exec);

export class ProcessManager {
  async runProcess(
    command: string,
    args: string[],
    options?: child_process.ExecOptions
  ) {
    // Quote the command if it contains spaces
    let safeCommand = command.includes(" ") ? `"${command}"` : command;

    // Join arguments safely (quote ones with spaces)
    const safeArgs = args
      .map((arg) => (arg.includes(" ") ? `"${arg}"` : arg))
      .join(" ");

    // On Windows, run through cmd.exe /c to ensure .exe files execute from cwd
    if (process.platform === "win32") {
      safeCommand = `cmd.exe /c ${safeCommand} ${safeArgs}`;
    } else {
      safeCommand = `${safeCommand} ${safeArgs}`;
    }

    console.debug(`Running command: ${safeCommand}`);

    try {
      // Add timeout to prevent hanging
      const { stdout, stderr } = await exec(safeCommand, {
        ...options,
        timeout: 10000, // 10 seconds timeout
        killSignal: "SIGKILL",
      });

      console.debug(`Command output: ${stdout}`);
      return { stdout, stderr };
    } catch (error: any) {
      console.error(`Command failed: ${error.message}`);
      return {
        stdout: error.stdout ?? "",
        stderr: error.stderr ?? error.message,
      };
    }
  }
}
