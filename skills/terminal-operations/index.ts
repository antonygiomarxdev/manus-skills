import { Skill, SkillCategory, SkillResult } from '../../src/types';

export const executeCommandSkill: Skill = {
  name: 'execute-command',
  category: SkillCategory.TERMINAL_OPERATIONS,
  description: 'Execute shell commands with timeout handling and output capture.',
  parameters: [
    { name: 'command', type: 'string', required: true, description: 'Command to execute' },
    { name: 'cwd', type: 'string', required: false, description: 'Working directory' },
    { name: 'timeout', type: 'number', required: false, description: 'Timeout in milliseconds (default: 30000)' },
    { name: 'env', type: 'object', required: false, description: 'Additional environment variables' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      const { stdout, stderr } = await execAsync(params.command, {
        cwd: params.cwd || process.cwd(),
        timeout: params.timeout || 30000,
        env: { ...process.env, ...(params.env || {}) },
      });
      return { success: true, data: { stdout: stdout.trim(), stderr: stderr.trim() } };
    } catch (error: any) {
      return { success: false, error: error.message, data: { stdout: error.stdout, stderr: error.stderr } };
    }
  },
  examples: [
    { description: 'Run npm install', params: { command: 'npm install', cwd: './my-project' } },
    { description: 'List files', params: { command: 'ls -la' } },
  ],
  metadata: { version: '1.0.0', tags: ['terminal', 'command', 'shell'], dependencies: [] },
};

export const backgroundProcessSkill: Skill = {
  name: 'background-process',
  category: SkillCategory.TERMINAL_OPERATIONS,
  description: 'Spawn a long-running background process and return its PID.',
  parameters: [
    { name: 'command', type: 'string', required: true, description: 'Command to run in background' },
    { name: 'cwd', type: 'string', required: false, description: 'Working directory' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const { spawn } = await import('child_process');
      const parts = params.command.split(' ');
      const child = spawn(parts[0], parts.slice(1), {
        cwd: params.cwd || process.cwd(),
        detached: true,
        stdio: 'ignore',
      });
      child.unref();
      return { success: true, data: { pid: child.pid, command: params.command } };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Start dev server', params: { command: 'npm run dev', cwd: './app' } },
  ],
  metadata: { version: '1.0.0', tags: ['terminal', 'process', 'background'], dependencies: [] },
};

export const terminalOperationsSkills = [executeCommandSkill, backgroundProcessSkill];
