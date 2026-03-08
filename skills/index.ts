/**
 * Manus Skills - Main Entry Point
 * 
 * Aggregates all skill categories for easy import and registration.
 * Each skill follows the standard Skill interface defined in src/types.
 */

export * from './file-operations';
export * from './code-understanding';
export * from './terminal-operations';
export * from './version-control';

import { fileOperationsSkills } from './file-operations';
import { codeUnderstandingSkills } from './code-understanding';
import { terminalOperationsSkills } from './terminal-operations';
import { versionControlSkills } from './version-control';
import { Skill } from '../src/types';

/**
 * All registered skills grouped by category.
 */
export const allSkills: Skill[] = [
  ...fileOperationsSkills,
  ...codeUnderstandingSkills,
  ...terminalOperationsSkills,
  ...versionControlSkills,
];

/**
 * Get a skill by name.
 */
export function getSkill(name: string): Skill | undefined {
  return allSkills.find(skill => skill.name === name);
}

/**
 * Get all skills in a specific category.
 */
export function getSkillsByCategory(category: string): Skill[] {
  return allSkills.filter(skill => skill.category === category);
}

export default allSkills;
