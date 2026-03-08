import { Skill, SkillCategory, SkillResult } from '../../src/types';

export const codeSearchSkill: Skill = {
  name: 'code-search',
  category: SkillCategory.CODE_UNDERSTANDING,
  description: 'Semantic code search across codebase using regex or text patterns.',
  parameters: [
    { name: 'pattern', type: 'string', required: true, description: 'Search pattern or regex' },
    { name: 'directory', type: 'string', required: false, description: 'Directory to search in (default: cwd)' },
    { name: 'filePattern', type: 'string', required: false, description: 'File glob pattern (e.g., **/*.ts)' },
    { name: 'caseSensitive', type: 'boolean', required: false, description: 'Case-sensitive search' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const { execSync } = await import('child_process');
      const dir = params.directory || '.';
      const include = params.filePattern ? `--include="${params.filePattern}"` : '';
      const flags = params.caseSensitive ? '' : '-i';
      const cmd = `grep -rn ${flags} ${include} "${params.pattern}" ${dir} 2>/dev/null`;
      const output = execSync(cmd, { encoding: 'utf-8', maxBuffer: 1024 * 1024 });
      const results = output.trim().split('\n').filter(Boolean);
      return { success: true, data: results, metadata: { matchCount: results.length } };
    } catch (error: any) {
      if (error.status === 1) return { success: true, data: [], metadata: { matchCount: 0 } };
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Find all TODO comments', params: { pattern: 'TODO:', filePattern: '**/*.ts' } },
    { description: 'Find function usage', params: { pattern: 'executeSkill', directory: './src' } },
  ],
  metadata: { version: '1.0.0', tags: ['search', 'code', 'grep'], dependencies: [] },
};

export const dependencyAnalysisSkill: Skill = {
  name: 'dependency-analysis',
  category: SkillCategory.CODE_UNDERSTANDING,
  description: 'Analyze imports and dependencies in a file or directory.',
  parameters: [
    { name: 'path', type: 'string', required: true, description: 'File or directory to analyze' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(params.path, 'utf-8');
      const importRegex = /^import\s+.*?from\s+['"](.*?)['"];?$/gm;
      const requireRegex = /require\(['"](.*?)['"]\)/g;
      const imports: string[] = [];
      let match;
      while ((match = importRegex.exec(content)) !== null) imports.push(match[1]);
      while ((match = requireRegex.exec(content)) !== null) imports.push(match[1]);
      const external = imports.filter(i => !i.startsWith('.'));
      const internal = imports.filter(i => i.startsWith('.'));
      return { success: true, data: { external, internal, total: imports.length } };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Analyze file dependencies', params: { path: './src/index.ts' } },
  ],
  metadata: { version: '1.0.0', tags: ['dependencies', 'imports', 'analysis'], dependencies: [] },
};

export const codeUnderstandingSkills = [codeSearchSkill, dependencyAnalysisSkill];
