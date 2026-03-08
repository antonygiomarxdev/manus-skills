# Terminal Operations - Core Skill

## Overview

Terminal Operations enables Manus AI to execute shell commands, manage processes, and interact with the system terminal. This skill is essential for running builds, tests, package managers, and other development tools.

## Category

**Core Skill** - Essential for development workflows

## Key Capabilities

### 1. Command Execution
- Run shell commands with proper escaping
- Handle command output (stdout/stderr)
- Manage exit codes and error handling
- Support for command chaining and pipes

### 2. Background Process Management
- Start long-running processes (servers, watchers)
- Monitor background processes
- Retrieve output from running processes
- Graceful shutdown and cleanup

### 3. Timeout Handling
- Set execution timeouts
- Handle long-running commands
- Prevent infinite hangs
- Graceful timeout recovery

### 4. Environment Management
- Set environment variables
- Manage working directory
- Preserve context across commands
- Handle platform differences (Linux/Mac/Windows)

## Use Cases

- **Build Systems**: Run webpack, vite, npm build
- **Testing**: Execute test suites
- **Package Management**: Install/update dependencies
- **Development Servers**: Start and manage dev servers
- **Database Operations**: Run migrations, seed data
- **Git Operations**: Commit, push, pull, merge
- **Code Generation**: Run scaffolding tools
- **System Commands**: File operations, process management

## Parameters

### run_in_terminal

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| command | string | Yes | Shell command to execute |
| explanation | string | Yes | User-facing description |
| goal | string | Yes | Short description of purpose |
| isBackground | boolean | Yes | Run in background? |
| timeout | number | Yes | Timeout in ms (0 = no timeout) |

### get_terminal_output

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Terminal ID from background process |

## Examples

### Example 1: Install Dependencies

```typescript
// Install npm packages
await runInTerminal({
  command: 'npm install express axios dotenv',
  explanation: 'Installing required npm packages for the API server',
  goal: 'Install dependencies',
  isBackground: false,
  timeout: 60000  // 60 seconds
});

// Output:
// added 45 packages in 12s
```

### Example 2: Run Tests

```typescript
// Execute test suite
const result = await runInTerminal({
  command: 'npm test -- --coverage',
  explanation: 'Running test suite with coverage report',
  goal: 'Run tests',
  isBackground: false,
  timeout: 120000  // 2 minutes
});

// Check if tests passed
if (result.exitCode === 0) {
  console.log('All tests passed!');
}
```

### Example 3: Start Development Server

```typescript
// Start dev server in background
const serverId = await runInTerminal({
  command: 'npm run dev',
  explanation: 'Starting development server on port 3000',
  goal: 'Start dev server',
  isBackground: true,  // Don't wait for completion
  timeout: 0  // No timeout for servers
});

// Later, check server output
const serverOutput = await getTerminalOutput({
  id: serverId
});

console.log(serverOutput);
// Output: "Server listening on http://localhost:3000"
```

### Example 4: Chain Commands

```typescript
// Run multiple commands in sequence
await runInTerminal({
  command: 'cd backend && npm install && npm run build',
  explanation: 'Installing and building backend application',
  goal: 'Build backend',
  isBackground: false,
  timeout: 180000  // 3 minutes
});

// Or use && for conditional execution
await runInTerminal({
  command: 'npm test && npm run build && npm run deploy',
  explanation: 'Test, build, and deploy if tests pass',
  goal: 'Deploy application',
  isBackground: false,
  timeout: 300000  // 5 minutes
});
```

### Example 5: Git Operations

```typescript
// Commit and push changes
await runInTerminal({
  command: 'git add . && git commit -m "feat: add user authentication" && git push origin main',
  explanation: 'Committing and pushing authentication feature',
  goal: 'Commit changes',
  isBackground: false,
  timeout: 30000
});
```

### Example 6: Database Migration

```typescript
// Run database migrations
await runInTerminal({
  command: 'npx prisma migrate deploy',
  explanation: 'Applying pending database migrations',
  goal: 'Run migrations',
  isBackground: false,
  timeout: 60000
});
```

### Example 7: Environment Variables

```typescript
// Set environment variables for command
await runInTerminal({
  command: 'NODE_ENV=production npm run build',
  explanation: 'Building application for production',
  goal: 'Production build',
  isBackground: false,
  timeout: 120000
});
```

### Example 8: Find and Filter Output

```typescript
// Use pipes to filter output
await runInTerminal({
  command: 'ps aux | grep node | grep -v grep',
  explanation: 'Finding all running Node.js processes',
  goal: 'List Node processes',
  isBackground: false,
  timeout: 5000
});
```

## Implementation Notes

### Command Safety

Always validate and escape commands:

```typescript
// BAD - User input not sanitized
const filename = userInput;  // Could be "; rm -rf /"
await runInTerminal({
  command: `cat ${filename}`,
  ...
});

// GOOD - Proper escaping
const filename = escapeShellArg(userInput);
await runInTerminal({
  command: `cat ${filename}`,
  ...
});
```

### Working Directory Management

Commands execute in the workspace root by default:

```typescript
// Shared terminal maintains directory state
await runInTerminal({
  command: 'cd backend',
  isBackground: false,
  ...
});

// Next command runs in backend/
await runInTerminal({
  command: 'npm install',
  isBackground: false,
  ...
});
```

### Background vs Foreground

| Aspect | Foreground (isBackground: false) | Background (isBackground: true) |
|--------|---------------------|----------------------|
| Execution | Blocks until complete | Returns immediately |
| Output | Returned in response | Retrieve with get_terminal_output |
| Use Case | Quick commands | Long-running processes |
| Terminal | Shared persistent shell | New spawned shell |
| CWD | Remembered | Resets to workspace root |

### Timeout Strategy

Choose timeout based on command type:

```typescript
// Fast commands: 5-10 seconds
timeout: 10000  // List files, check status

// Package operations: 60-120 seconds
timeout: 120000  // npm install

// Builds: 120-300 seconds
timeout: 300000  // Production builds

// Servers: No timeout
timeout: 0  // Development servers

// Tests: Variable
timeout: 180000  // Large test suites
```

### Output Management

Terminal output is auto-truncated if > 60KB:

```typescript
// For commands with large output, filter it
await runInTerminal({
  command: 'npm list | head -n 50',  // Limit output
  ...
});

// Or use file redirection
await runInTerminal({
  command: 'npm list > package-tree.txt',
  ...
});
```

## Edge Cases

### 1. Long-Running Commands

For commands that may take a long time:

```typescript
// Be conservative with timeout
await runInTerminal({
  command: 'npm run large-build',
  timeout: 600000,  // 10 minutes - better too long than too short
  ...
});

// Or use no timeout if duration is unknown
await runInTerminal({
  command: 'npm run unpredictable-task',
  timeout: 0,  // No timeout
  ...
});
```

### 2. Interactive Commands

Avoid interactive prompts:

```typescript
// BAD - Will hang waiting for input
await runInTerminal({
  command: 'npm init',  // Prompts for input
  ...
});

// GOOD - Use non-interactive flags
await runInTerminal({
  command: 'npm init -y',  // Auto-yes flag
  ...
});
```

### 3. Platform Differences

Handle cross-platform differences:

```typescript
// Check platform
const isWindows = process.platform === 'win32';

const command = isWindows
  ? 'dir /b *.js'
  : 'ls *.js';

await runInTerminal({ command, ... });
```

### 4. Command Not Found

Handle missing commands gracefully:

```typescript
// Check if command exists first
await runInTerminal({
  command: 'command -v docker || echo "Docker not installed"',
  ...
});

// Or use which
await runInTerminal({
  command: 'which docker',
  ...
});
```

## Dependencies

- **Shell**: bash (Linux/Mac), Command Prompt/PowerShell (Windows)
- **Process Management**: Node.js child_process or equivalent
- **Signal Handling**: SIGTERM, SIGKILL for process cleanup

## Related Skills

- [Testing & Debugging](./testing-debugging.md) - Run test commands
- [Version Control](./version-control.md) - Git operations
- [Project Management](./project-management.md) - Build and deploy tasks
- [File Operations](./file-operations.md) - File manipulation commands

## Best Practices

### 1. Always Provide Context

```typescript
// GOOD - Clear explanation and goal
await runInTerminal({
  command: 'npm install',
  explanation: 'Installing project dependencies from package.json',
  goal: 'Install dependencies',
  ...
});

// Not just:
await runInTerminal({
  command: 'npm install',
  explanation: 'Installing',  // Too vague
  goal: 'Install',  // Not helpful
  ...
});
```

### 2. Chain Related Commands

```typescript
// GOOD - Single command chain
await runInTerminal({
  command: 'cd api && npm install && npm test',
  ...
});

// Less efficient - Multiple calls
await runInTerminal({ command: 'cd api', ... });
await runInTerminal({ command: 'npm install', ... });
await runInTerminal({ command: 'npm test', ... });
```

### 3. Use Pipes for Data Flow

```typescript
// GOOD - Piping data
await runInTerminal({
  command: 'cat data.json | jq ".users[]" | wc -l',
  explanation: 'Counting users in data file',
  ...
});

// Avoid temp files when possible
// LESS EFFICIENT:
// cat data.json > temp.txt
// process temp.txt
// rm temp.txt
```

### 4. Quote Variables with Spaces

```typescript
// GOOD - Quoted variables
const file = "my file.txt";
await runInTerminal({
  command: `cat "${file}"`,
  ...
});

// BAD - Unquoted
await runInTerminal({
  command: `cat ${file}`,  // Breaks on spaces
  ...
});
```

### 5. Check Exit Codes

```typescript
// Check if command succeeded
const result = await runInTerminal({
  command: 'npm test',
  ...
});

if (result.exitCode !== 0) {
  console.error('Tests failed!');
  // Take corrective action
}
```

### 6. Disable Pagers

For commands that use pagers:

```typescript
// GOOD - Disable pager
await runInTerminal({
  command: 'git --no-pager log',
  ...
});

// Or pipe to cat
await runInTerminal({
  command: 'git log | cat',
  ...
});
```

## Anti-Patterns to Avoid

### ❌ Don't: Run Untrusted Commands

```typescript
// DANGEROUS - User input not validated
const userCommand = getUserInput();
await runInTerminal({ command: userCommand, ... });
```

### ❌ Don't: Start Multiple Background Servers in Parallel

```typescript
// BAD - Could cause port conflicts
await Promise.all([
  runInTerminal({ command: 'npm run dev', isBackground: true, ... }),
  runInTerminal({ command: 'npm run api', isBackground: true, ... })
]);

// GOOD - Start sequentially with different ports
await runInTerminal({ command: 'PORT=3000 npm run dev', isBackground: true, ... });
await runInTerminal({ command: 'PORT=3001 npm run api', isBackground: true, ... });
```

### ❌ Don't: Use Short Timeouts for Slow Operations

```typescript
// BAD - Too short for build
await runInTerminal({
  command: 'npm run build',
  timeout: 10000,  // 10s might not be enough
  ...
});

// GOOD - Conservative timeout
await runInTerminal({
  command: 'npm run build',
  timeout: 180000,  // 3 minutes
  ...
});
```

### ❌ Don't: Ignore Command Output

```typescript
// BAD - Not checking result
await runInTerminal({ command: 'npm install', ... });
// What if it failed?

// GOOD - Check output
const result = await runInTerminal({ command: 'npm install', ... });
if (result.stderr.includes('error')) {
  // Handle error
}
```

## Advanced Techniques

### 1. Conditional Execution

```typescript
// Run next command only if previous succeeds (&&)
command: 'npm test && npm run build && npm run deploy'

// Run next command regardless (;)
command: 'npm test; npm run build; npm run deploy'

// Run next command only if previous fails (||)
command: 'npm test || echo "Tests failed but continuing"'
```

### 2. Process Substitution

```typescript
// Compare outputs
command: 'diff <(ls dir1) <(ls dir2)'
```

### 3. Background Job Management

```typescript
// Start job in background
const jobId = await runInTerminal({
  command: 'npm run watch',
  isBackground: true,
  ...
});

// Check on it periodically
setInterval(async () => {
  const output = await getTerminalOutput({ id: jobId });
  if (output.includes('error')) {
    // Handle error
  }
}, 10000);
```

### 4. Command Performance Tracking

```typescript
// Use `time` to track command duration
await runInTerminal({
  command: 'time npm run build',
  ...
});
// Output includes: real 2m15.342s
```

## Version History

- **v1.0.0** - Basic terminal execution
- **v1.5.0** - Added background process support
- **v2.0.0** - Improved error handling and timeouts
- **v2.5.0** - Cross-platform compatibility
- **v3.0.0** - Output streaming and monitoring

## Testing

```typescript
describe('TerminalOperations', () => {
  test('executes command successfully', async () => {
    const result = await runInTerminal({
      command: 'echo "test"',
      isBackground: false,
      timeout: 5000,
      ...
    });
    expect(result.stdout).toContain('test');
  });

  test('handles background processes', async () => {
    const id = await runInTerminal({
      command: 'sleep 5 && echo "done"',
      isBackground: true,
      timeout: 0,
      ...
    });
    expect(id).toBeDefined();
  });
});
```

## Metrics

- Command execution time distribution
- Success/failure rate
- Timeout frequency
- Background process count

## Future Enhancements

- **Interactive Terminal**: Support for interactive commands
- **Command History**: Track and reuse previous commands
- **Output Streaming**: Real-time output during execution
- **Command Suggestions**: Auto-suggest common commands
- **Parallel Execution**: Run independent commands in parallel
