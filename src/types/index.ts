/**
 * Core types for the Manus Skills system
 * Defines the interfaces and enums used across all skill implementations
 */

/**
 * Categories of skills available in the Manus AI system
 */
export enum SkillCategory {
  FILE_OPERATIONS = 'file_operations',
  CODE_UNDERSTANDING = 'code_understanding',
  SEARCH_NAVIGATION = 'search_navigation',
  TERMINAL_OPERATIONS = 'terminal_operations',
  TESTING_DEBUGGING = 'testing_debugging',
  CODE_REFACTORING = 'code_refactoring',
  VERSION_CONTROL = 'version_control',
  PROJECT_MANAGEMENT = 'project_management',
  MEMORY_CONTEXT = 'memory_context',
  AI_SPECIFIC = 'ai_specific',
}

/**
 * Possible statuses for a skill execution result
 */
export enum SkillStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  PARTIAL = 'partial',
  PENDING = 'pending',
}

/**
 * A parameter definition for a skill
 */
export interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
  default?: unknown;
}

/**
 * An example of how to use a skill
 */
export interface Example {
  description: string;
  input: Record<string, unknown>;
  expectedOutput: string;
}

/**
 * The result of executing a skill
 */
export interface SkillResult<T = unknown> {
  status: SkillStatus;
  data?: T;
  error?: string;
  metadata?: {
    executionTime?: number;
    timestamp?: string;
    [key: string]: unknown;
  };
}

/**
 * Core interface that all skills must implement
 */
export interface Skill {
  name: string;
  category: SkillCategory;
  description: string;
  parameters: Parameter[];
  execute: (params: Record<string, unknown>) => Promise<SkillResult>;
  examples: Example[];
  metadata: {
    version: string;
    tags: string[];
    dependencies: string[];
  };
}

/**
 * Registry to manage and access all available skills
 */
export interface SkillRegistry {
  register: (skill: Skill) => void;
  get: (name: string) => Skill | undefined;
  list: () => Skill[];
  listByCategory: (category: SkillCategory) => Skill[];
}
