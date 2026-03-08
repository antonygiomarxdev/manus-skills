import { Skill, SkillCategory, SkillResult } from '../../src/types';

export const gitStatusSkill: Skill = {
  name: 'git-status',
  category: SkillCategory.VERSION_CONTROL,
  description: 'Get git repository status including staged, unstaged, and untracked files.',
  parameters: [
    { name: 'cwd', type: 'string', required: false, description: 'Repository directory (default: cwd)' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const { execSync } = await import('child_process');
      const cwd = params.cwd || process.cwd();
      const status = execSync('git status --porcelain', { cwd, encoding: 'utf-8' });
      const branch = execSync('git branch --show-current', { cwd, encoding: 'utf-8' }).trim();
      const lines = status.trim().split('\n').filter(Boolean);
      const staged = lines.filter(l => l[0] !== ' ' && l[0] !== '?');
      const unstaged = lines.filter(l => l[1] === 'M' || l[1] === 'D');
      const untracked = lines.filter(l => l.startsWith('??'));
      return { success: true, data: { branch, staged, unstaged, untracked, clean: lines.length === 0 } };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Check repo status', params: { cwd: './' } },
  ],
  metadata: { version: '1.0.0', tags: ['git', 'status', 'vcs'], dependencies: [] },
};

export const gitCommitSkill: Skill = {
  name: 'git-commit',
  category: SkillCategory.VERSION_CONTROL,
  description: 'Stage and commit changes with a descriptive message.',
  parameters: [
    { name: 'message', type: 'string', required: true, description: 'Commit message' },
    { name: 'files', type: 'array', required: false, description: 'Specific files to stage (default: all changes)' },
    { name: 'cwd', type: 'string', required: false, description: 'Repository directory' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const { execSync } = await import('child_process');
      const cwd = params.cwd || process.cwd();
      const files = params.files ? params.files.join(' ') : '.';
      execSync(`git add ${files}`, { cwd, encoding: 'utf-8' });
      const result = execSync(`git commit -m "${params.message}"`, { cwd, encoding: 'utf-8' });
      return { success: true, data: result.trim() };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Commit all changes', params: { message: 'feat: add new feature' } },
    { description: 'Commit specific file', params: { message: 'fix: update config', files: ['config.json'] } },
  ],
  metadata: { version: '1.0.0', tags: ['git', 'commit', 'vcs'], dependencies: [] },
};

export const gitDiffSkill: Skill = {
  name: 'git-diff',
  category: SkillCategory.VERSION_CONTROL,
  description: 'Show diff of changes in working directory or between commits.',
  parameters: [
    { name: 'file', type: 'string', required: false, description: 'Specific file to diff' },
    { name: 'staged', type: 'boolean', required: false, description: 'Show staged changes' },
    { name: 'cwd', type: 'string', required: false, description: 'Repository directory' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const { execSync } = await import('child_process');
      const cwd = params.cwd || process.cwd();
      const stagedFlag = params.staged ? '--staged' : '';
      const file = params.file || '';
      const diff = execSync(`git diff ${stagedFlag} ${file}`, { cwd, encoding: 'utf-8', maxBuffer: 2 * 1024 * 1024 });
      return { success: true, data: diff };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Show all unstaged changes', params: {} },
    { description: 'Show staged diff', params: { staged: true } },
  ],
  metadata: { version: '1.0.0', tags: ['git', 'diff', 'vcs'], dependencies: [] },
};

export const versionControlSkills = [gitStatusSkill, gitCommitSkill, gitDiffSkill];
