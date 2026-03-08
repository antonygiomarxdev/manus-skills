# Multi-Step Planning - Advanced Skill

## Overview

Multi-Step Planning enables Manus AI to break down complex tasks into manageable steps, track progress, and adapt plans based on results. This skill is crucial for autonomous operation on complex, multi-faceted problems.

## Category

**Advanced Skill** - For complex autonomous workflows

## Key Capabilities

### 1. Task Decomposition
- Break complex goals into actionable steps
- Identify dependencies between steps
- Estimate effort and time for each step
- Prioritize critical path items

### 2. Progress Tracking
- Maintain TODO lists with status
- Track completed vs remaining work
- Monitor blockers and issues
- Provide progress updates

### 3. Dynamic Adaptation
- Adjust plan based on results
- Handle unexpected obstacles
- Re-prioritize when needed
- Learn from failures

### 4. Context Management
- Maintain awareness of overall goal
- Track what has been accomplished
- Remember decisions and rationale
- Preserve state across sessions

## Use Cases

- **Feature Implementation**: Plan and implement multi-file features
- **Refactoring Projects**: Systematic code refactoring
- **Bug Investigation**: Methodical debugging approach
- **Project Setup**: Initialize new projects with proper structure
- **Migration Tasks**: Upgrade dependencies, migrate APIs
- **Documentation**: Create comprehensive documentation
- **Testing**: Implement full test coverage

## Parameters

### manage_todo_list

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| todoList | array | Yes | Complete list of all todos |

### Todo Item Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | Yes | Unique identifier |
| title | string | Yes | Short, actionable description (3-7 words) |
| status | enum | Yes | 'not-started', 'in-progress', 'completed' |

## Examples

### Example 1: Feature Implementation Plan

```typescript
// Plan: Implement user authentication

await manageTodoList({
  todoList: [
    { id: 1, title: 'Design authentication schema', status: 'completed' },
    { id: 2, title: 'Create User model and migration', status: 'completed' },
    { id: 3, title: 'Implement JWT token service', status: 'in-progress' },
    { id: 4, title: 'Create login endpoint', status: 'not-started' },
    { id: 5, title: 'Create registration endpoint', status: 'not-started' },
    { id: 6, title: 'Add authentication middleware', status: 'not-started' },
    { id: 7, title: 'Write integration tests', status: 'not-started' },
    { id: 8, title: 'Update API documentation', status: 'not-started' }
  ]
});
```

### Example 2: Refactoring Project

```typescript
// Plan: Refactor API layer to use async/await

await manageTodoList({
  todoList: [
    { id: 1, title: 'Identify all callback-based functions', status: 'completed' },
    { id: 2, title: 'Convert user service to async/await', status: 'completed' },
    { id: 3, title: 'Convert auth service to async/await', status: 'in-progress' },
    { id: 4, title: 'Convert payment service to async/await', status: 'not-started' },
    { id: 5, title: 'Update error handling', status: 'not-started' },
    { id: 6, title: 'Update all tests', status: 'not-started' },
    { id: 7, title: 'Run full test suite', status: 'not-started' }
  ]
});
```

### Example 3: Bug Investigation

```typescript
// Plan: Investigate login timeout issue

await manageTodoList({
  todoList: [
    { id: 1, title: 'Reproduce issue locally', status: 'completed' },
    { id: 2, title: 'Check server logs for errors', status: 'completed' },
    { id: 3, title: 'Profile database query performance', status: 'in-progress' },
    { id: 4, title: 'Implement query optimization', status: 'not-started' },
    { id: 5, title: 'Add performance monitoring', status: 'not-started' },
    { id: 6, title: 'Test fix in staging', status: 'not-started' }
  ]
});
```

### Example 4: Dynamic Plan Adaptation

```typescript
// Initial plan
await manageTodoList({
  todoList: [
    { id: 1, title: 'Add email validation', status: 'completed' },
    { id: 2, title: 'Add phone validation', status: 'in-progress' },
    { id: 3, title: 'Add address validation', status: 'not-started' }
  ]
});

// Discovered phone validation library doesn't work
// Adapt plan by adding prerequisite step

await manageTodoList({
  todoList: [
    { id: 1, title: 'Add email validation', status: 'completed' },
    { id: 2, title: 'Research alternative phone libraries', status: 'completed' },
    { id: 3, title: 'Install libphonenumber-js', status: 'completed' },
    { id: 4, title: 'Add phone validation', status: 'in-progress' },
    { id: 5, title: 'Add address validation', status: 'not-started' }
  ]
});
```

## Implementation Notes

### When to Use Task Tracking

✅ **Use for:**
- Complex work requiring 3+ steps
- Multi-file modifications
- Tasks with dependencies
- When user provides multiple requests
- Systematic investigations

❌ **Don't use for:**
- Single, simple operations
- Quick informational queries
- Reading files
- Simple searches

### Todo Status Management

**CRITICAL Workflow:**

```typescript
// 1. Create plan with all todos
await manageTodoList({
  todoList: [
    { id: 1, title: 'Step 1', status: 'not-started' },
    { id: 2, title: 'Step 2', status: 'not-started' },
    { id: 3, title: 'Step 3', status: 'not-started' }
  ]
});

// 2. Mark ONE todo as in-progress before starting
await manageTodoList({
  todoList: [
    { id: 1, title: 'Step 1', status: 'in-progress' },  // Started
    { id: 2, title: 'Step 2', status: 'not-started' },
    { id: 3, title: 'Step 3', status: 'not-started' }
  ]
});

// 3. Do the work for step 1
// ... perform operations ...

// 4. Mark completed IMMEDIATELY
await manageTodoList({
  todoList: [
    { id: 1, title: 'Step 1', status: 'completed' },  // Done!
    { id: 2, title: 'Step 2', status: 'not-started' },
    { id: 3, title: 'Step 3', status: 'not-started' }
  ]
});

// 5. Move to next todo
await manageTodoList({
  todoList: [
    { id: 1, title: 'Step 1', status: 'completed' },
    { id: 2, title: 'Step 2', status: 'in-progress' },  // Next
    { id: 3, title: 'Step 3', status: 'not-started' }
  ]
});
```

### Plan Granularity

Balance between too detailed and too vague:

```typescript
// ❌ TOO DETAILED
{ id: 1, title: 'Open user.ts file', status: 'not-started' }
{ id: 2, title: 'Find getUserById function', status: 'not-started' }
{ id: 3, title: 'Read function body', status: 'not-started' }
{ id: 4, title: 'Modify return statement', status: 'not-started' }

// ❌ TOO VAGUE  
{ id: 1, title: 'Fix everything', status: 'not-started' }

// ✅ JUST RIGHT
{ id: 1, title: 'Update getUserById function', status: 'not-started' }
{ id: 2, title: 'Add error handling', status: 'not-started' }
{ id: 3, title: 'Write unit tests', status: 'not-started' }
```

### Title Guidelines

Titles should be:
- **Actionable**: Start with a verb
- **Specific**: Clear what needs to be done
- **Concise**: 3-7 words ideal
- **User-friendly**: Understandable without context

```typescript
// ❌ BAD TITLES
'User model'  // Not actionable
'Do stuff with the authentication system'  // Too vague
'Refactor the entire codebase to use modern patterns'  // Too broad

// ✅ GOOD TITLES
'Create User model'  // Actionable and specific
'Add JWT authentication middleware'  // Clear and concise
'Refactor auth service to async/await'  // Specific scope
```

## Edge Cases

### 1. Blocked Tasks

When a task is blocked:

```typescript
await manageTodoList({
  todoList: [
    { id: 1, title: 'Setup database', status: 'completed' },
    { id: 2, title: 'Research database library', status: 'in-progress' },  // Blocked
    { id: 3, title: 'Implement data layer', status: 'not-started' },  // Depends on #2
    { id: 4, title: 'Add logging', status: 'not-started' }  // Independent
  ]
});

// Work on independent task while blocked
```

### 2. Plan Changes Mid-Execution

```typescript
// Original plan
await manageTodoList({
  todoList: [
    { id: 1, title: 'Add feature A', status: 'completed' },
    { id: 2, title: 'Add feature B', status: 'in-progress' },
    { id: 3, title: 'Add feature C', status: 'not-started' }
  ]
});

// User requests change - rebuild plan
await manageTodoList({
  todoList: [
    { id: 1, title: 'Add feature A', status: 'completed' },
    { id: 2, title: 'Add feature B (modified)', status: 'in-progress' },
    { id: 3, title: 'Add feature D instead', status: 'not-started' },  // Changed
    { id: 4, title: 'Update documentation', status: 'not-started' }  // Added
  ]
});
```

### 3. Discovered Subtasks

When uncovering hidden complexity:

```typescript
// Initial plan
await manageTodoList({
  todoList: [
    { id: 1, title: 'Migrate to new API', status: 'in-progress' }
  ]
});

// Discovered it's more complex - break down
await manageTodoList({
  todoList: [
    { id: 1, title: 'Update API endpoints', status: 'completed' },
    { id: 2, title: 'Modify request format', status: 'in-progress' },
    { id: 3, title: 'Update response parsing', status: 'not-started' },
    { id: 4, title: 'Update error handling', status: 'not-started' },
    { id: 5, title: 'Update tests', status: 'not-started' }
  ]
});
```

## Dependencies

- **State Management**: Maintain todo state
- **Task Analysis**: Decompose complex goals
- **Context Tracking**: Remember progress and decisions

## Related Skills

- [File Operations](../core-skills/file-operations.md) - Execute planned edits
- [Testing & Debugging](../core-skills/testing-debugging.md) - Validate steps
- [Memory & Context](./memory-context.md) - Persist plans across sessions
- [Code Understanding](../core-skills/code-understanding.md) - Analyze for planning

## Best Practices

### 1. Plan Before Acting

```typescript
// ✅ GOOD - Plan first
await manageTodoList({
  todoList: [
    { id: 1, title: 'Analyze current code', status: 'not-started' },
    { id: 2, title: 'Design new structure', status: 'not-started' },
    { id: 3, title: 'Implement changes', status: 'not-started' },
    { id: 4, title: 'Test changes', status: 'not-started' }
  ]
});
// Now execute step by step

// ❌ BAD - Act without planning
// Just start making changes without thinking through the full scope
```

### 2. One In-Progress at a Time

```typescript
// ✅ GOOD - Single focus
await manageTodoList({
  todoList: [
    { id: 1, title: 'Fix bug A', status: 'completed' },
    { id: 2, title: 'Fix bug B', status: 'in-progress' },  // Working on this
    { id: 3, title: 'Fix bug C', status: 'not-started' }
  ]
});

// ❌ BAD - Multiple in-progress
await manageTodoList({
  todoList: [
    { id: 1, title: 'Fix bug A', status: 'in-progress' },  // Too many!
    { id: 2, title: 'Fix bug B', status: 'in-progress' },  // In progress
    { id: 3, title: 'Fix bug C', status: 'in-progress' }   // At once
  ]
});
```

### 3. Mark Completed Immediately

```typescript
// ✅ GOOD - Update after each step
// Complete step 1
await createFile({...});

// Mark complete immediately
await manageTodoList({
  todoList: [
    { id: 1, title: 'Create file', status: 'completed' },
    { id: 2, title: 'Add content', status: 'not-started' }
  ]
});

// ❌ BAD - Batch updates
// Complete steps 1, 2, 3
// Don't update todos until all done
// User has no visibility into progress
```

### 4. Keep Plans Current

```typescript
// Update plan when discovering new requirements
// Don't hide important steps that emerged
// Add them to the plan transparently
```

### 5. Provide Context in Updates

When updating todos, explain significant changes:

```typescript
// Discovered that step 2 requires additional work
await manageTodoList({
  todoList: [
    { id: 1, title: 'Initial setup', status: 'completed' },
    { id: 2, title: 'Install TypeScript', status: 'completed' },  // Added
    { id: 3, title: 'Configure build', status: 'in-progress' },   // Was step 2
    { id: 4, title: 'Write code', status: 'not-started' }
  ]
});
```

## Advanced Techniques

### 1. Parallel Task Identification

Identify tasks that can run in parallel:

```typescript
await manageTodoList({
  todoList: [
    // Can parallelize these
    { id: 1, title: 'Update component A', status: 'not-started' },
    { id: 2, title: 'Update component B', status: 'not-started' },
    { id: 3, title: 'Update component C', status: 'not-started' },
    // Must be sequential
    { id: 4, title: 'Integration test', status: 'not-started' }
  ]
});

// Execute 1-3 in parallel using multi_replace_string_in_file
```

### 2. Checkpoint Strategy

Create natural checkpoints:

```typescript
await manageTodoList({
  todoList: [
    { id: 1, title: 'Implement feature', status: 'completed' },
    { id: 2, title: 'Test feature', status: 'completed' },
    // CHECKPOINT - Feature works
    { id: 3, title: 'Refactor code', status: 'in-progress' },
    { id: 4, title: 'Optimize performance', status: 'not-started' },
    // CHECKPOINT - Feature optimized
    { id: 5, title: 'Document feature', status: 'not-started' }
  ]
});
```

### 3. Risk-Based Prioritization

Tackle risky/unknown items first:

```typescript
await manageTodoList({
  todoList: [
    { id: 1, title: 'Research integration approach', status: 'completed' },  // Risky
    { id: 2, title: 'Build proof of concept', status: 'completed' },  // Validate
    { id: 3, title: 'Implement full solution', status: 'in-progress' },  // Now confident
    { id: 4, title: 'Add polish and docs', status: 'not-started' }  // Easy
  ]
});
```

### 4. Dependency Tracking (Implicit)

Structure todos to show dependencies:

```typescript
await manageTodoList({
  todoList: [
    // Foundation
    { id: 1, title: 'Create database schema', status: 'completed' },
    
    // Depends on #1
    { id: 2, title: 'Create data models', status: 'completed' },
    
    // Depends on #2
    { id: 3, title: 'Create API endpoints', status: 'in-progress' },
    
    // Depends on #3
    { id: 4, title: 'Create frontend components', status: 'not-started' },
    
    // Depends on #4
    { id: 5, title: 'Integration testing', status: 'not-started' }
  ]
});
```

## Anti-Patterns to Avoid

### ❌ Don't: Create Too Many Todos

```typescript
// BAD - 20+ todos is overwhelming
await manageTodoList({
  todoList: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Micro step ${i + 1}`,
    status: 'not-started'
  }))
});

// GOOD - 5-10 meaningful todos
await manageTodoList({
  todoList: [
    { id: 1, title: 'Phase 1: Setup', status: 'not-started' },
    { id: 2, title: 'Phase 2: Implementation', status: 'not-started' },
    { id: 3, title: 'Phase 3: Testing', status: 'not-started' },
    { id: 4, title: 'Phase 4: Documentation', status: 'not-started' }
  ]
});
```

### ❌ Don't: Leave Stale In-Progress Items

```typescript
// BAD - Abandoned in-progress
await manageTodoList({
  todoList: [
    { id: 1, title: 'Old task', status: 'in-progress' },  // Never completed
    { id: 2, title: 'New task', status: 'in-progress' }   // Started new one
  ]
});

// GOOD - Clean up properly
await manageTodoList({
  todoList: [
    { id: 1, title: 'Old task', status: 'completed' },  // Finish or mark done
    { id: 2, title: 'New task', status: 'in-progress' }
  ]
});
```

### ❌ Don't: Use for Trivial Tasks

```typescript
// BAD - Overkill for simple task
await manageTodoList({
  todoList: [
    { id: 1, title: 'Read one file', status: 'in-progress' }
  ]
});
// Just read the file directly!

// GOOD - Use for complex work
await manageTodoList({
  todoList: [
    { id: 1, title: 'Analyze authentication flow', status: 'not-started' },
    { id: 2, title: 'Implement OAuth provider', status: 'not-started' },
    { id: 3, title: 'Add token refresh logic', status: 'not-started' },
    { id: 4, title: 'Test complete flow', status: 'not-started' }
  ]
});
```

## Version History

- **v1.0.0** - Basic todo list management
- **v1.5.0** - Added status tracking
- **v2.0.0** - Dynamic plan adaptation
- **v2.5.0** - Progress monitoring and reporting

## Testing

```typescript
describe('MultiStepPlanning', () => {
  test('tracks todo status correctly', async () => {
    await manageTodoList({
      todoList: [
        { id: 1, title: 'Test task', status: 'completed' }
      ]
    });
    // Verify status updated
  });

  test('maintains todo order', async () => {
    const todos = [
      { id: 1, title: 'First', status: 'completed' },
      { id: 2, title: 'Second', status: 'in-progress' },
      { id: 3, title: 'Third', status: 'not-started' }
    ];
    await manageTodoList({ todoList: todos });
    // Verify order preserved
  });
});
```

## Metrics

- Average todos per task
- Completion rate
- Time per todo
- Plan adaptation frequency

## Future Enhancements

- **Estimated Time**: Add time estimates to todos
- **Dependencies**: Explicit dependency tracking
- **Sub-tasks**: Hierarchical todo structure
- **Templates**: Common task templates
- **Progress Visualization**: Gantt charts, burndown
