import { JavaHandler } from "../../src/backend/languages/compilers/java-handler";
import { CppHandler } from "../../src/backend/languages/compilers/cpp-handler";
import { PythonHandler } from "../../src/backend/languages/interpreters/python-handler";
import { JavaScriptHandler } from "../../src/backend/languages/interpreters/javascript-handler";
import { ProcessManager } from "../../src/shared/utils/process-manager";
import * as path from "path";

describe("Language Handlers", () => {
  const processManager = new ProcessManager();
  const testDir = path.join(__dirname, "..", "fixtures", "code-samples");

  it("executes Java code correctly", async () => {
    const handler = new JavaHandler();
    const filePath = path.join(testDir, "Simple.java");
    const result = await handler.execute(filePath, processManager);

    expect(result.stdout.trim()).toBe("Hello from Java!");
    expect(result.stderr).toBe("");
  });

  it("executes C++ code correctly", async () => {
    // Increase timeout to 30 seconds
    jest.setTimeout(30000);

    const handler = new CppHandler();
    const filePath = path.join(testDir, "simple.cpp");
    const result = await handler.execute(filePath, processManager);

    expect(result.stdout.trim()).toBe("Hello from C++!");
    expect(result.stderr).toBe("");
  }, 30000); // Pass timeout here too

  it("executes Python code correctly", async () => {
    const handler = new PythonHandler();
    const filePath = path.join(testDir, "simple.py");
    const result = await handler.execute(filePath, processManager);

    expect(result.stdout.trim()).toBe("Hello from Python!");
    expect(result.stderr).toBe("");
  });

  it("executes JavaScript code correctly", async () => {
    const handler = new JavaScriptHandler();
    const filePath = path.join(testDir, "simple.js");
    const result = await handler.execute(filePath, processManager);

    expect(result.stdout.trim()).toBe("Hello from JavaScript!");
    expect(result.stderr).toBe("");
  });
});
