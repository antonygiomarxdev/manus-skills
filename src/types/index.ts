/**
 * Core types and interfaces for the Manus Skills system.
 */

export enum SkillCategory {
  FILE_OPERATIONS = 'file-operations',
  CODE_UNDERSTANDING = 'code-understanding',
  SEARCH_NAVIGATION = 'search-navigation',
  TERMINAL_OPERATIONS = 'terminal-operations',
  TESTING_DEBUGGING = 'testing-debugging',
  CODE_REFACTORING = 'code-refactoring',
  VERSION_CONTROL = 'version-control',
  PROJECT_MANAGEMENT = 'project-management',
  MEMORY_CONTEXT = 'memory-context',
  AI_SPECIFIC = 'ai-specific',
}

export interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  default?: any;
}

export interface Example {
  description: string;
  params: Record<string, any>;
  expectedOutput?: any;
}

export interface SkillResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}

export interface SkillMetadata {
  version: string;
  tags: string[];
  dependencies: string[];
  author?: string;
  deprecated?: boolean;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  description: string;
  parameters: Parameter[];
  execute: (params: any) => Promise<SkillResult>;
  examples: Example[];
  metadata: SkillMetadata;
}

export interface SkillRegistry {
  register(skill: Skill): void;
  unregister(name: string): void;
  get(name: string): Skill | undefined;
  getAll(): Skill[];
  getByCategory(category: SkillCategory): Skill[];
  search(query: string): Skill[];
}

export type SkillExecutor = (skill: Skill, params: any) => Promise<SkillResult>;
