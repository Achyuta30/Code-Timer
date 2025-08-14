import { spawn } from 'child_process';

export class ProcessManager {
  async runProcess(
    command: string,
    args: string[],
    options?: Record<string, any>
  ) {
    console.debug(`Running command: ${command} ${args.join(' ')}`);

    return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
      let stdout = '';
      let stderr = '';

      const child = spawn(command, args, {
        shell: process.platform === 'win32', // allow exe execution in cwd
        timeout: 10000, // 10 seconds
        killSignal: 'SIGKILL',
        ...options
      });

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('error', (err) => {
        console.error(`Command failed to start: ${err.message}`);
        reject(err);
      });

      child.on('close', () => {
        console.debug(`Command output: ${stdout}`);
        resolve({ stdout, stderr });
      });
    });
  }
}
