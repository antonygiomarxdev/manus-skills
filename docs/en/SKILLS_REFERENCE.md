# Manus AI Skills - Complete Reference

## Table of Contents

1. [Core Skills](#core-skills)
2. [Advanced Skills](#advanced-skills)
3. [Skill Categories](#skill-categories)
4. [Usage Patterns](#usage-patterns)
5. [Quick Reference](#quick-reference)

## Core Skills

Essential skills that form the foundation of Manus AI capabilities.

### 1. File Operations
**[Full Documentation](core-skills/file-operations.md)**

Read, write, and edit files with precision.

**Key Capabilities:**
- Intelligent file reading with line ranges
- Precise string-based editing
- Batch file operations
- File creation and management

**When to Use:**
- Modifying source code
- Creating new files
- Refactoring across multiple files
- Configuration updates

**Example:**
```typescript
// Read specific section
await readFile({ filePath: '/src/app.ts', startLine: 10, endLine: 50 });

// Edit with context
await replaceStringInFile({
  filePath: '/src/app.ts',
  oldString: 'old implementation with context',
  newString: 'new implementation'
});
```

---

### 2. Code Understanding
**[Full Documentation](core-skills/code-understanding.md)**

Comprehend code through semantic analysis and pattern recognition.

**Key Capabilities:**
- Semantic code search
- Dependency analysis
- Pattern detection
- Documentation generation

**When to Use:**
- Understanding new codebases
- Finding related code
- Analyzing architecture
- Tracing data flow

**Example:**
```typescript
// Find authentication-related code
await semanticSearch({
  query: 'functions that handle user authentication and token validation'
});
```

---

### 3. Search & Navigation
**[Full Documentation](core-skills/search-navigation.md)**

Find code, files, and information across the codebase.

**Key Capabilities:**
- Text-based grep search
- File name pattern matching
- Semantic search
- Symbol references

**When to Use:**
- Locating specific code
- Finding all usages
- Discovering patterns
- Exploring unfamiliar code

**Example:**
```typescript
// Find all API routes
await grepSearch({
  query: 'router\\.(get|post|put|delete)',
  isRegexp: true,
  includePattern: 'src/api/**'
});
```

---

### 4. Terminal Operations
**[Full Documentation](core-skills/terminal-operations.md)**

Execute shell commands and manage processes.

**Key Capabilities:**
- Command execution
- Background process management
- Timeout handling
- Environment management

**When to Use:**
- Running builds
- Installing packages
- Running tests
- Starting development servers
- Git operations

**Example:**
```typescript
// Install dependencies
await runInTerminal({
  command: 'npm install express axios',
  explanation: 'Installing required packages',
  goal: 'Install dependencies',
  isBackground: false,
  timeout: 60000
});
```

---

### 5. Testing & Debugging

Execute tests, analyze failures, and debug issues.

**Key Capabilities:**
- Test execution
- Error analysis
- Failure reporting
- Debug suggestions

**When to Use:**
- Validating changes
- Finding bugs
- Ensuring quality
- Regression testing

---

### 6. Code Refactoring

Restructure code while preserving functionality.

**Key Capabilities:**
- Symbol renaming
- Function extraction
- Import optimization
- Code reorganization

**When to Use:**
- Improving code quality
- Extracting reusable code
- Renaming for clarity
- Organizing imports

---

### 7. Version Control

Integrate with Git for version control operations.

**Key Capabilities:**
- Git operations (commit, push, pull)
- Diff analysis
- Branch management
- Code review assistance

**When to Use:**
- Committing changes
- Creating branches
- Reviewing code
- Managing merges

---

### 8. Project Management

Track tasks and manage project workflow.

**Key Capabilities:**
- TODO list management
- Progress tracking
- Task prioritization
- Dependency management

**When to Use:**
- Complex multi-step tasks
- Project planning
- Progress monitoring
- Team coordination

---

### 9. Memory & Context

Maintain context and learn from interactions.

**Key Capabilities:**
- Persistent user memory
- Session memory
- Repository memory
- Pattern learning

**When to Use:**
- Storing preferences
- Remembering project context
- Learning conventions
- Maintaining conversation state

---

## Advanced Skills

Complex skills for sophisticated operations.

### 1. Multi-Step Planning
**[Full Documentation](advanced-skills/multi-step-planning.md)**

Break down complex tasks into manageable steps.

**Key Capabilities:**
- Task decomposition
- Progress tracking
- Dynamic adaptation
- Context management

**When to Use:**
- Complex features
- Large refactorings
- Systematic debugging
- Project setup

**Example:**
```typescript
await manageTodoList({
  todoList: [
    { id: 1, title: 'Design authentication schema', status: 'completed' },
    { id: 2, title: 'Create User model', status: 'in-progress' },
    { id: 3, title: 'Implement JWT service', status: 'not-started' },
    { id: 4, title: 'Create login endpoint', status: 'not-started' }
  ]
});
```

---

### 2. Code Generation

Generate code based on specifications and context.

**Key Capabilities:**
- Context-aware generation
- Template-based creation
- Pattern application
- Best practices enforcement

**When to Use:**
- Boilerplate creation
- Scaffolding
- Test generation
- Documentation generation

---

### 3. Architecture Analysis

Analyze and visualize system architecture.

**Key Capabilities:**
- Component relationship mapping
- Dependency visualization
- Architecture pattern detection
- Bottleneck identification

**When to Use:**
- Understanding system design
- Planning refactoring
- Documenting architecture
- Identifying technical debt

---

### 4. Performance Optimization

Analyze and improve code performance.

**Key Capabilities:**
- Performance profiling
- Bottleneck detection
- Optimization suggestions
- Benchmark comparisons

**When to Use:**
- Slow operations
- Resource optimization
- Scalability improvements
- Cost reduction

---

### 5. Security Analysis

Identify and fix security vulnerabilities.

**Key Capabilities:**
- Vulnerability scanning
- Security pattern detection
- Best practice enforcement
- Dependency auditing

**When to Use:**
- Security reviews
- Vulnerability fixes
- Compliance checks
- Dependency updates

---

## Skill Categories

### By Purpose

**Development:**
- File Operations
- Code Understanding
- Code Refactoring
- Code Generation

**Discovery:**
- Search & Navigation
- Code Understanding
- Architecture Analysis

**Execution:**
- Terminal Operations
- Testing & Debugging

**Planning:**
- Multi-Step Planning
- Project Management
- Memory & Context

**Quality:**
- Testing & Debugging
- Security Analysis
- Performance Optimization

### By Complexity

**Basic:**
- File Operations
- Search & Navigation
- Terminal Operations

**Intermediate:**
- Code Understanding
- Testing & Debugging
- Version Control

**Advanced:**
- Multi-Step Planning
- Architecture Analysis
- Performance Optimization
- Security Analysis

---

## Usage Patterns

### Pattern 1: Feature Implementation

```typescript
// 1. Plan the work
await manageTodoList({
  todoList: [
    { id: 1, title: 'Understand existing code', status: 'not-started' },
    { id: 2, title: 'Design new feature', status: 'not-started' },
    { id: 3, title: 'Implement feature', status: 'not-started' },
    { id: 4, title: 'Write tests', status: 'not-started' },
    { id: 5, title: 'Update documentation', status: 'not-started' }
  ]
});

// 2. Understand context
const related = await semanticSearch({
  query: 'related feature implementations'
});

// 3. Implement
await replaceStringInFile({...});

// 4. Test
await runInTerminal({
  command: 'npm test',
  ...
});
```

### Pattern 2: Bug Investigation

```typescript
// 1. Reproduce and search
const errorLocations = await grepSearch({
  query: 'error message text',
  isRegexp: false
});

// 2. Analyze code
const context = await readFile({
  filePath: errorLocations[0].file,
  startLine: errorLocations[0].line - 10,
  endLine: errorLocations[0].line + 10
});

// 3. Trace dependencies
const deps = await analyzeDependencies({
  filePath: errorLocations[0].file
});

// 4. Fix and test
await replaceStringInFile({...});
await runInTerminal({ command: 'npm test', ...});
```

### Pattern 3: Code Refactoring

```typescript
// 1. Analyze current structure
const complexity = await analyzeComplexity({
  filePath: '/src/messy-file.ts'
});

// 2. Plan refactoring
await manageTodoList({
  todoList: [
    { id: 1, title: 'Extract helper functions', status: 'not-started' },
    { id: 2, title: 'Simplify conditional logic', status: 'not-started' },
    { id: 3, title: 'Add type definitions', status: 'not-started' },
    { id: 4, title: 'Update tests', status: 'not-started' }
  ]
});

// 3. Refactor incrementally
await multiReplaceStringInFile({
  replacements: [...]
});

// 4. Verify
await runInTerminal({ command: 'npm test && npm run lint', ...});
```

---

## Quick Reference

### File Operations

| Operation | Tool | Use When |
|-----------|------|----------|
| Read file section | `readFile` | Need specific code range |
| Edit file | `replaceStringInFile` | Single file change |
| Batch edit | `multiReplaceStringInFile` | Multiple changes |
| Create file | `createFile` | New file needed |

### Search

| Search Type | Tool | Use When |
|-------------|------|----------|
| Text/pattern | `grepSearch` | Know exact text |
| File name | `fileSearch` | Know filename pattern |
| Concept | `semanticSearch` | Fuzzy/conceptual search |

### Terminal

| Task | Command Example |
|------|-----------------|
| Install packages | `npm install package` |
| Run tests | `npm test` |
| Build | `npm run build` |
| Start server | `npm run dev` (background) |
| Git commit | `git add . && git commit -m "msg"` |

### Planning

| Scenario | Approach |
|----------|----------|
| 2-3 simple steps | No todo list needed |
| 3-7 steps | Use todo list |
| 7+ steps | Break into phases |
| Unknown complexity | Start with high-level todos, refine |

---

## Skill Combination Examples

### Example 1: Add API Endpoint

```typescript
// Combine: Search + File Ops + Terminal + Testing

// 1. Find existing endpoints for reference
await grepSearch({
  query: 'router\\.post',
  isRegexp: true,
  includePattern: 'src/api/**'
});

// 2. Create new endpoint
await replaceStringInFile({
  filePath: '/src/api/routes.ts',
  oldString: '// existing routes',
  newString: '// new route + existing routes'
});

// 3. Run tests
await runInTerminal({
  command: 'npm test src/api/routes.test.ts',
  ...
});
```

### Example 2: Dependency Upgrade

```typescript
// Combine: Search + Terminal + File Ops + Testing

// 1. Find all usages of deprecated API
await grepSearch({
  query: 'oldAPI\\.',
  isRegexp: true
});

// 2. Update package
await runInTerminal({
  command: 'npm install package@latest',
  ...
});

// 3. Update code
await multiReplaceStringInFile({
  replacements: [
    // Update all usages
  ]
});

// 4. Run full test suite
await runInTerminal({
  command: 'npm test',
  ...
});
```

### Example 3: Documentation Generation

```typescript
// Combine: Code Understanding + File Ops + Search

// 1. Analyze public API
const publicMethods = await semanticSearch({
  query: 'exported functions and classes'
});

// 2. Generate documentation
for (const method of publicMethods) {
  const docs = await generateDocumentation({
    target: method,
    format: 'MARKDOWN'
  });
  
  await createFile({
    filePath: `docs/${method}.md`,
    content: docs
  });
}
```

---

## Best Practices Summary

### 1. Always Start with Understanding
Before making changes, understand the context:
- Use semantic search to find related code
- Read files to understand current implementation
- Analyze dependencies to understand impact

### 2. Plan Before Acting
For complex tasks, create a plan:
- Break down into steps
- Track progress with todos
- Adapt plan as needed

### 3. Verify Changes
Always validate your changes:
- Run relevant tests
- Check for errors
- Verify expected behavior

### 4. Work Efficiently
Optimize your workflow:
- Parallelize independent operations
- Use batch operations
- Cache frequently accessed information

### 5. Learn and Improve
Use memory to improve over time:
- Store best practices
- Remember project conventions
- Learn from mistakes

---

## Getting Help

- **Detailed Documentation**: See individual skill pages
- **Examples**: Check `/docs/en/examples/` directory
- **Contributing**: See [CONTRIBUTING.md](../../CONTRIBUTING.md)
- **Issues**: Report problems on GitHub

---

## Version

**Current Version:** 1.0.0  
**Last Updated:** 2026-03-08

---

*For the most up-to-date information, always refer to individual skill documentation.*
