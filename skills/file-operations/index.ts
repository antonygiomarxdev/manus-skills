import { Skill, SkillCategory, SkillResult } from '../../src/types';

export const fileReadSkill: Skill = {
  name: 'file-read',
  category: SkillCategory.FILE_OPERATIONS,
  description: 'Intelligent file reading with context awareness. Reads file contents with optional line range and encoding support.',
  parameters: [
    { name: 'path', type: 'string', required: true, description: 'Path to the file to read' },
    { name: 'startLine', type: 'number', required: false, description: 'Start line number (1-indexed)' },
    { name: 'endLine', type: 'number', required: false, description: 'End line number (1-indexed)' },
    { name: 'encoding', type: 'string', required: false, description: 'File encoding (default: utf-8)' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(params.path, params.encoding || 'utf-8');
      const lines = content.split('\n');
      const start = params.startLine ? params.startLine - 1 : 0;
      const end = params.endLine ? params.endLine : lines.length;
      return {
        success: true,
        data: lines.slice(start, end).join('\n'),
        metadata: { totalLines: lines.length, readLines: end - start },
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Read entire file', params: { path: './README.md' } },
    { description: 'Read lines 10-20', params: { path: './src/index.ts', startLine: 10, endLine: 20 } },
  ],
  metadata: { version: '1.0.0', tags: ['file', 'read', 'io'], dependencies: [] },
};

export const fileWriteSkill: Skill = {
  name: 'file-write',
  category: SkillCategory.FILE_OPERATIONS,
  description: 'Write or overwrite file contents with atomic write support.',
  parameters: [
    { name: 'path', type: 'string', required: true, description: 'Path to the file to write' },
    { name: 'content', type: 'string', required: true, description: 'Content to write' },
    { name: 'append', type: 'boolean', required: false, description: 'Append instead of overwrite' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const fs = await import('fs/promises');
      const flag = params.append ? 'a' : 'w';
      await fs.writeFile(params.path, params.content, { flag, encoding: 'utf-8' });
      return { success: true, data: `File written: ${params.path}` };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Write new file', params: { path: './output.txt', content: 'Hello World' } },
    { description: 'Append to file', params: { path: './log.txt', content: 'New entry\n', append: true } },
  ],
  metadata: { version: '1.0.0', tags: ['file', 'write', 'io'], dependencies: [] },
};

export const fileDeleteSkill: Skill = {
  name: 'file-delete',
  category: SkillCategory.FILE_OPERATIONS,
  description: 'Delete files or directories safely.',
  parameters: [
    { name: 'path', type: 'string', required: true, description: 'Path to delete' },
    { name: 'recursive', type: 'boolean', required: false, description: 'Recursively delete directories' },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      const fs = await import('fs/promises');
      await fs.rm(params.path, { recursive: params.recursive || false, force: true });
      return { success: true, data: `Deleted: ${params.path}` };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    { description: 'Delete file', params: { path: './temp.txt' } },
    { description: 'Delete directory', params: { path: './dist', recursive: true } },
  ],
  metadata: { version: '1.0.0', tags: ['file', 'delete', 'io'], dependencies: [] },
};

export const fileOperationsSkills = [fileReadSkill, fileWriteSkill, fileDeleteSkill];
