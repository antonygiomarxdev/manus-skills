# Integration Guide

This guide explains how to integrate Manus Skills into your AI agent or development workflow.

## Quick Setup

```typescript
import { allSkills, getSkill, getSkillsByCategory } from '../skills';
import { SkillCategory } from '../src/types';

// Register all skills
console.log(`Loaded ${allSkills.length} skills`);

// Get a specific skill
const readSkill = getSkill('file-read');
if (readSkill) {
  const result = await readSkill.execute({ path: './README.md' });
  console.log(result.data);
}

// Get skills by category
const gitSkills = getSkillsByCategory(SkillCategory.VERSION_CONTROL);
```

## Custom Skill Registry

You can build a custom registry to manage skills at runtime:

```typescript
import { Skill, SkillRegistry, SkillCategory } from '../src/types';
import { allSkills } from '../skills';

class ManusSkillRegistry implements SkillRegistry {
  private skills: Map<string, Skill> = new Map();

  register(skill: Skill): void {
    this.skills.set(skill.name, skill);
  }

  unregister(name: string): void {
    this.skills.delete(name);
  }

  get(name: string): Skill | undefined {
    return this.skills.get(name);
  }

  getAll(): Skill[] {
    return Array.from(this.skills.values());
  }

  getByCategory(category: SkillCategory): Skill[] {
    return this.getAll().filter(s => s.category === category);
  }

  search(query: string): Skill[] {
    const q = query.toLowerCase();
    return this.getAll().filter(s =>
      s.name.includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.metadata.tags.some(t => t.includes(q))
    );
  }
}

// Initialize registry
const registry = new ManusSkillRegistry();
allSkills.forEach(skill => registry.register(skill));
```

## Creating Custom Skills

Follow this template to create a new skill:

```typescript
import { Skill, SkillCategory, SkillResult } from '../src/types';

export const myCustomSkill: Skill = {
  name: 'my-custom-skill',
  category: SkillCategory.AI_SPECIFIC,
  description: 'Description of what the skill does.',
  parameters: [
    {
      name: 'input',
      type: 'string',
      required: true,
      description: 'The input to process',
    },
  ],
  execute: async (params: any): Promise<SkillResult> => {
    try {
      // Your skill logic here
      const output = `Processed: ${params.input}`;
      return { success: true, data: output };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  examples: [
    {
      description: 'Basic usage',
      params: { input: 'hello world' },
    },
  ],
  metadata: {
    version: '1.0.0',
    tags: ['custom', 'example'],
    dependencies: [],
  },
};
```

## Error Handling

All skills return a `SkillResult` object:

```typescript
const result = await skill.execute(params);

if (result.success) {
  console.log('Output:', result.data);
  console.log('Metadata:', result.metadata);
} else {
  console.error('Error:', result.error);
}
```

## Available Skill Categories

| Category | Value | Description |
|---|---|---|
| FILE_OPERATIONS | `file-operations` | Read, write, delete files |
| CODE_UNDERSTANDING | `code-understanding` | Search and analyze code |
| TERMINAL_OPERATIONS | `terminal-operations` | Execute shell commands |
| VERSION_CONTROL | `version-control` | Git operations |
| SEARCH_NAVIGATION | `search-navigation` | Find content and symbols |
| TESTING_DEBUGGING | `testing-debugging` | Run tests and debug |
| CODE_REFACTORING | `code-refactoring` | Rename, extract, reorganize |
| PROJECT_MANAGEMENT | `project-management` | TODOs and task tracking |
| MEMORY_CONTEXT | `memory-context` | Persistent memory |
| AI_SPECIFIC | `ai-specific` | AI-specific capabilities |
