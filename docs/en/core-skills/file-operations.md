# File Operations - Core Skill

## Overview

File Operations is a fundamental skill that enables Manus AI to interact with the file system intelligently. It provides capabilities for reading, writing, editing, and managing files with context awareness and precision.

## Category

**Core Skill** - Essential for basic agent functionality

## Key Capabilities

### 1. Intelligent File Reading
- Read files with line range specification
- Optimize context gathering by reading large ranges
- Handle various file encodings
- Detect and handle binary files appropriately

### 2. Precise String-Based Editing
- Replace exact string matches in files
- Support for multi-line replacements
- Context-aware editing (requires surrounding context)
- Batch replacements across multiple locations

### 3. File Creation
- Create new files with specified content
- Automatically create parent directories
- Prevent accidental overwriting
- Support for templates

### 4. File Management
- Move and rename files
- Delete files and directories
- List directory contents
- Check file existence and permissions

## Use Cases

- **Code Refactoring**: Update function names across multiple files
- **Configuration Updates**: Modify config files precisely
- **Documentation Generation**: Create and update README files
- **Project Scaffolding**: Create initial project structure
- **Batch Operations**: Update multiple files consistently

## Parameters

### read_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| filePath | string | Yes | Absolute path to the file |
| startLine | number | Yes | Starting line number (1-indexed) |
| endLine | number | Yes | Ending line number (1-indexed, inclusive) |

### replace_string_in_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| filePath | string | Yes | Absolute path to the file |
| oldString | string | Yes | Exact string to replace (with context) |
| newString | string | Yes | Replacement string |

### multi_replace_string_in_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| replacements | array | Yes | Array of replacement operations |
| explanation | string | Yes | Overall description of changes |

### create_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| filePath | string | Yes | Absolute path for the new file |
| content | string | Yes | Initial file content |

## Examples

### Example 1: Reading File with Context

```typescript
// Read a specific function in a source file
await readFile({
  filePath: '/project/src/utils/helpers.ts',
  startLine: 45,
  endLine: 68
});
```

**Best Practice**: Read larger ranges to get full context rather than making multiple small reads.

### Example 2: Precise String Replacement

```typescript
// Replace a function implementation
await replaceStringInFile({
  filePath: '/project/src/app.ts',
  oldString: `
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
  `,
  newString: `
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => {
    const price = item.discount ? item.price * 0.9 : item.price;
    return sum + price;
  }, 0);
}
  `
});
```

**Best Practice**: Include 3-5 lines of context before and after the target string to ensure unique matching.

### Example 3: Batch File Operations

```typescript
// Update multiple files in parallel
await multiReplaceStringInFile({
  explanation: 'Update API endpoint across components',
  replacements: [
    {
      filePath: '/project/src/components/UserList.tsx',
      oldString: `const API_URL = '/api/users';`,
      newString: `const API_URL = '/api/v2/users';`
    },
    {
      filePath: '/project/src/components/UserDetail.tsx',
      oldString: `const API_URL = '/api/users';`,
      newString: `const API_URL = '/api/v2/users';`
    }
  ]
});
```

**Best Practice**: Use batch operations for independent changes to improve efficiency.

### Example 4: Creating New File with Template

```typescript
// Create a new React component
await createFile({
  filePath: '/project/src/components/NewComponent.tsx',
  content: `import React from 'react';

interface NewComponentProps {
  title: string;
  onAction: () => void;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title, onAction }) => {
  return (
    <div className="new-component">
      <h2>{title}</h2>
      <button onClick={onAction}>Click me</button>
    </div>
  );
};
`
});
```

## Implementation Notes

### Context Requirements for Editing

When replacing strings, always include sufficient context:

```typescript
// ❌ BAD - Not enough context
oldString: `return sum + item.price;`

// ✅ GOOD - Sufficient context
oldString: `
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
`
```

### Handling Large Files

For large files (>1000 lines):
1. Use targeted reads with specific line ranges
2. Use grep_search to locate relevant sections first
3. Consider reading in chunks rather than entire file

### Error Handling

Common errors and mitigations:

| Error | Cause | Solution |
|-------|-------|----------|
| String not found | oldString doesn't match exactly | Verify whitespace, indentation, and context |
| Multiple matches | oldString not unique | Add more surrounding context |
| File not found | Incorrect path | Use file_search to locate file first |
| Permission denied | Insufficient permissions | Check file permissions, use appropriate user |

### Performance Optimization

1. **Parallel Reads**: Read multiple independent files in parallel
2. **Batch Edits**: Use multi_replace for multiple changes
3. **Lazy Loading**: Only read files when needed
4. **Caching**: Maintain file content cache for frequently accessed files

## Edge Cases

### 1. Whitespace Sensitivity

The replacement system is whitespace-sensitive. Ensure exact matches:

```typescript
// These are DIFFERENT strings:
"function test() {"  // 2 spaces
"function test()  {" // 3 spaces
```

### 2. Line Endings

Different platforms use different line endings:
- Unix/Linux/Mac: `\n` (LF)
- Windows: `\r\n` (CRLF)

Always normalize line endings or match the file's existing format.

### 3. File Encoding

Assume UTF-8 unless specified. For other encodings:
- Detect encoding before reading
- Convert to UTF-8 for processing
- Convert back when writing

### 4. Binary Files

Never attempt string operations on binary files:
- Check file type before operations
- Use appropriate binary handling tools
- Warn user if binary file detected

## Dependencies

- File system access (Node.js `fs` module or equivalent)
- Path resolution utilities
- Text encoding detection library (optional)

## Related Skills

- [Code Understanding](./code-understanding.md) - Analyze code before editing
- [Search & Navigation](./search-navigation.md) - Find files to operate on
- [Version Control](./version-control.md) - Track file changes
- [Testing & Debugging](./testing-debugging.md) - Validate changes

## Best Practices

### 1. Always Verify Context

Before editing, read the target section to ensure understanding:

```typescript
// 1. Read first
const context = await readFile({filePath, startLine: 40, endLine: 60});

// 2. Analyze and plan

// 3. Edit with confidence
await replaceStringInFile({...});
```

### 2. Use Descriptive Paths

Prefer absolute paths over relative paths for clarity:

```typescript
// ✅ GOOD
filePath: '/workspaces/project/src/utils/helpers.ts'

// ❌ AVOID (unless explicitly relative)
filePath: '../utils/helpers.ts'
```

### 3. Handle Errors Gracefully

```typescript
try {
  await replaceStringInFile({...});
} catch (error) {
  if (error.message.includes('not found')) {
    // Try alternative approach or search for file
  } else if (error.message.includes('multiple matches')) {
    // Add more context to oldString
  }
}
```

### 4. Document Changes

Always provide clear explanations for changes:

```typescript
await multiReplaceStringInFile({
  explanation: 'Refactor authentication logic to use new token service',
  replacements: [...]
});
```

### 5. Maintain Code Style

When generating or editing code:
- Match existing indentation (spaces vs tabs)
- Follow project's code style guidelines
- Preserve formatting conventions
- Maintain consistent line lengths

## Anti-Patterns to Avoid

### ❌ Don't: Read Files Unnecessarily

```typescript
// BAD - Reading same file multiple times
await readFile({filePath: 'app.ts', startLine: 1, endLine: 10});
await readFile({filePath: 'app.ts', startLine: 11, endLine: 20});
await readFile({filePath: 'app.ts', startLine: 21, endLine: 30});

// GOOD - Read once with larger range
await readFile({filePath: 'app.ts', startLine: 1, endLine: 30});
```

### ❌ Don't: Use Placeholders in Replacements

```typescript
// BAD - Using placeholders
newString: `
function calculate() {
  // TODO: implement this
  return 0;
}
`

// GOOD - Provide complete implementation
newString: `
function calculate(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
`
```

### ❌ Don't: Make Sequential Edits That Could Be Parallel

```typescript
// BAD - Sequential operations
await replaceStringInFile({filePath: 'file1.ts', ...});
await replaceStringInFile({filePath: 'file2.ts', ...});
await replaceStringInFile({filePath: 'file3.ts', ...});

// GOOD - Parallel operations
await multiReplaceStringInFile({
  replacements: [
    {filePath: 'file1.ts', ...},
    {filePath: 'file2.ts', ...},
    {filePath: 'file3.ts', ...}
  ]
});
```

## Version History

- **v1.0.0** - Initial implementation with read/write/edit
- **v1.1.0** - Added multi_replace for batch operations
- **v1.2.0** - Improved error messages and context matching
- **v2.0.0** - Added support for large files and streaming

## Testing

### Unit Tests

```typescript
describe('FileOperations', () => {
  test('should read file with correct line range', async () => {
    const content = await readFile({
      filePath: '/test/sample.ts',
      startLine: 1,
      endLine: 10
    });
    expect(content).toContain('import');
  });

  test('should replace string with exact match', async () => {
    await replaceStringInFile({
      filePath: '/test/sample.ts',
      oldString: 'const old = true;',
      newString: 'const new = true;'
    });
    // Verify change
  });
});
```

### Integration Tests

Test file operations in realistic scenarios with actual projects.

## Metrics

Track these metrics for performance monitoring:

- Average read time per file size
- Edit success rate (successful matches)
- Number of parallel operations
- Error rate by error type

## Future Enhancements

- **Streaming for Large Files**: Handle files >100MB efficiently
- **Diff Preview**: Show changes before applying
- **Undo/Redo**: Revert changes if needed
- **Atomic Operations**: Ensure all-or-nothing for batch edits
- **File Watching**: Monitor files for external changes
