# Quick Start Guide

Get started with Manus AI Skills in 5 minutes!

## What is Manus AI?

Manus AI is an advanced programming agent that can:
- ✅ Understand and modify codebases
- ✅ Plan and execute complex tasks
- ✅ Run tests and debug issues
- ✅ Generate documentation
- ✅ Learn from your project conventions

## Core Concepts

### 1. Skills
Skills are capabilities that Manus AI can use. Like building blocks, they combine to solve complex problems.

**Core Skills** (Essential):
- File Operations - Read/write/edit files
- Code Understanding - Analyze code semantically
- Search & Navigation - Find anything in your codebase
- Terminal Operations - Run commands and tests

**Advanced Skills** (Powerful):
- Multi-Step Planning - Break down complex tasks
- Code Generation - Create new code contextually
- Architecture Analysis - Understand system design

### 2. Planning
For complex tasks, Manus AI creates a plan with steps and tracks progress.

```typescript
Plan: Add user authentication
├── ✅ Setup project structure
├── ✅ Create database schema
├── 🔄 Implement JWT authentication
├── ⏳ Create API endpoints
└── ⏳ Write tests
```

### 3. Context Awareness
Manus AI maintains awareness of:
- Your project structure
- Coding conventions
- Previous decisions
- Current state

## Basic Usage Examples

### Example 1: Find and Modify Code

```typescript
// 1. Find authentication code
await semanticSearch({
  query: 'user authentication and login logic'
});

// 2. Read the file
await readFile({
  filePath: '/src/auth/login.ts',
  startLine: 1,
  endLine: 50
});

// 3. Make precise changes
await replaceStringInFile({
  filePath: '/src/auth/login.ts',
  oldString: 'old implementation',
  newString: 'new improved implementation'
});
```

### Example 2: Run Tests

```typescript
// Execute tests
await runInTerminal({
  command: 'npm test',
  explanation: 'Running test suite to verify changes',
  goal: 'Run tests',
  isBackground: false,
  timeout: 60000
});
```

### Example 3: Complex Task with Planning

```typescript
// Create plan
await manageTodoList({
  todoList: [
    { id: 1, title: 'Understand existing code', status: 'not-started' },
    { id: 2, title: 'Design solution', status: 'not-started' },
    { id: 3, title: 'Implement changes', status: 'not-started' },
    { id: 4, title: 'Add tests', status: 'not-started' }
  ]
});

// Execute step by step, marking each complete
```

## Common Workflows

### Workflow 1: Adding a Feature

```
User: "Add password reset functionality"

Manus AI:
1. 📋 Creates plan with 6 steps
2. 🔍 Searches for existing auth code
3. 📖 Reads relevant files
4. ✏️ Implements password reset
5. ✅ Adds tests
6. 📝 Updates documentation
```

### Workflow 2: Fixing a Bug

```
User: "Login fails with timeout error"

Manus AI:
1. 🔍 Searches for "login" and "timeout"
2. 📖 Reads login implementation
3. 🔬 Analyzes dependencies
4. 🐛 Identifies slow database query
5. ✏️ Adds query optimization
6. ✅ Runs tests to verify fix
```

### Workflow 3: Code Refactoring

```
User: "Refactor utils.ts to be more maintainable"

Manus AI:
1. 📊 Analyzes code complexity
2. 📋 Plans refactoring steps
3. ✂️ Extracts helper functions
4. 🔄 Simplifies logic
5. 📝 Adds type definitions
6. ✅ Ensures tests still pass
```

## Best Practices

### ✅ DO

**Be Specific:**
```
❌ "Fix the code"
✅ "Fix the authentication timeout in login.ts"
```

**Verify Changes:**
```typescript
// Always run tests after changes
await runInTerminal({ command: 'npm test', ... });
```

**Use Context:**
```typescript
// Read surrounding code before editing
await readFile({ startLine: line - 10, endLine: line + 10 });
```

### ❌ DON'T

**Don't Make Blind Changes:**
```
❌ Edit without reading the file first
✅ Read → Understand → Edit
```

**Don't Skip Planning:**
```
❌ Start complex task without plan
✅ Create todo list → Execute step by step
```

**Don't Ignore Errors:**
```
❌ Continue when tests fail
✅ Fix errors before proceeding
```

## Skill Cheat Sheet

### File Operations

| Task | Command |
|------|---------|
| Read file | `readFile({ filePath, startLine, endLine })` |
| Edit file | `replaceStringInFile({ filePath, oldString, newString })` |
| Edit multiple | `multiReplaceStringInFile({ replacements })` |
| Create file | `createFile({ filePath, content })` |

### Search

| Task | Tool |
|------|------|
| Find text | `grepSearch({ query, isRegexp })` |
| Find files | `fileSearch({ query })` |
| Find concepts | `semanticSearch({ query })` |

### Terminal

| Task | Example |
|------|---------|
| Install pkg | `npm install package-name` |
| Run tests | `npm test` |
| Build | `npm run build` |
| Git commit | `git add . && git commit -m "message"` |

### Planning

| Scenario | Action |
|----------|--------|
| Simple task (1-2 steps) | Execute directly |
| Medium task (3-7 steps) | Create todo list |
| Complex task (7+ steps) | Break into phases |

## Example Requests

Try these with Manus AI:

### Development
- "Create a new React component for user profile"
- "Add error handling to all API endpoints"
- "Refactor database queries to use prepared statements"

### Debugging
- "Find why the payment processing is slow"
- "Debug the memory leak in the user service"
- "Investigate why tests are failing on CI"

### Refactoring
- "Extract duplicate code into utility functions"
- "Migrate from Moment.js to date-fns"
- "Reorganize project structure for better maintainability"

### Testing
- "Add unit tests for authentication module"
- "Increase test coverage to 80%"
- "Add integration tests for API endpoints"

## Next Steps

1. **📖 Read Core Skills**
   - [File Operations](core-skills/file-operations.md)
   - [Code Understanding](core-skills/code-understanding.md)
   - [Search & Navigation](core-skills/search-navigation.md)

2. **🎯 Try Examples**
   - [Building a REST API](examples/rest-api-example.md)
   - More examples coming soon!

3. **🚀 Advanced Topics**
   - [Multi-Step Planning](advanced-skills/multi-step-planning.md)
   - [Architecture Guide](ARCHITECTURE.md)

4. **🤝 Contribute**
   - [Contributing Guide](../../CONTRIBUTING.md)
   - Help improve skills and documentation

## Common Questions

**Q: How does Manus AI understand my code?**
A: It uses semantic search (embeddings) plus AST analysis to understand code meaning, not just text.

**Q: Will it break my code?**
A: Manus AI makes precise edits with context. Always review changes and run tests.

**Q: Can it work with any programming language?**
A: Core support for JavaScript/TypeScript, Python. Basic support for Java, C++, Go.

**Q: How does it handle large codebases?**
A: Uses intelligent search, caching, and targeted analysis. Doesn't load everything at once.

**Q: Can I undo changes?**
A: Use version control (Git). Manus AI can help commit and rollback changes.

## Tips for Success

1. **Start Small**: Try simple tasks first to understand how it works
2. **Be Clear**: Specific requests get better results
3. **Review Changes**: Always review code changes before committing
4. **Run Tests**: Verify changes with tests after modifications
5. **Iterate**: Refine requests based on results

## Getting Help

- 📖 **Documentation**: [Full Index](INDEX.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/antonygiomarxdev/manus-skills/issues)
- 💬 **Discussions**: Coming soon!

## What's Next?

Check out the [complete skills reference](SKILLS_REFERENCE.md) to see everything Manus AI can do!

---

**Ready to dive deeper?** → [Core Skills Documentation](core-skills/)

**Want to see it in action?** → [Examples](examples/)

**Building your own skills?** → [Architecture Guide](ARCHITECTURE.md)
