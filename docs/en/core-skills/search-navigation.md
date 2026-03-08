# Search & Navigation - Core Skill

## Overview

Search & Navigation provides multiple methods for finding code, files, and information across the codebase. It combines text-based search, pattern matching, and semantic understanding to help locate exactly what's needed.

## Category

**Core Skill** - Essential for code discovery

## Key Capabilities

### 1. Content Search (grep)
- Fast text-based search across files
- Regular expression support
- Case-sensitive/insensitive options
- Include/exclude patterns

### 2. File Name Search
- Glob pattern matching
- Recursive directory search
- Flexible wildcard support
- Fast file system traversal

### 3. Semantic Search
- Natural language queries
- Context-aware results
- Relevance ranking
- Intent understanding

### 4. Symbol Search
- Find function definitions
- Locate class declarations
- Search for variables
- Find all references

## Use Cases

- **Quick Lookups**: "Where is the login function defined?"
- **Pattern Finding**: "Find all files matching *.test.ts"
- **Code Discovery**: "Show me error handling patterns"
- **Reference Tracking**: "Where is this function used?"
- **File Location**: "Find the configuration files"

## Parameters

### grep_search

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Text or regex pattern to search |
| isRegexp | boolean | Yes | Whether query is a regex |
| includePattern | string | No | Glob pattern for files to include |
| maxResults | number | No | Maximum results to return |
| includeIgnoredFiles | boolean | No | Search in .gitignore files |

### file_search

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Glob pattern for file names |
| maxResults | number | No | Maximum results to return |

### semantic_search

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Natural language search query |

## Examples

### Example 1: Text Search with Grep

```typescript
// Find all TODO comments
const todos = await grepSearch({
  query: 'TODO:|FIXME:|HACK:',
  isRegexp: true,
  maxResults: 50
});

// Results:
// src/utils/helper.ts:45: // TODO: Refactor this function
// src/api/routes.ts:102: // FIXME: Handle edge case
// src/components/Form.tsx:78: // HACK: Temporary workaround
```

### Example 2: Find Test Files

```typescript
// Find all test files in the project
const testFiles = await fileSearch({
  query: '**/*.test.{ts,js,tsx,jsx}'
});

// Results:
// src/utils/helpers.test.ts
// src/components/Button.test.tsx
// src/api/client.test.js
```

### Example 3: Search in Specific Directory

```typescript
// Search for API endpoints only in api folder
const endpoints = await grepSearch({
  query: 'router\\.(get|post|put|delete)',
  isRegexp: true,
  includePattern: 'src/api/**'
});

// Results:
// src/api/users.ts:12: router.get('/users', ...)
// src/api/users.ts:18: router.post('/users', ...)
// src/api/posts.ts:9: router.get('/posts', ...)
```

### Example 4: Case-Insensitive Search

```typescript
// Find authentication-related code (case-insensitive by default)
const authCode = await grepSearch({
  query: 'authenticate|authorization|login|auth',
  isRegexp: true
});
```

### Example 5: Multiple Patterns at Once

```typescript
// Search for multiple import patterns efficiently
const imports = await grepSearch({
  query: 'import.*from.*(react|vue|angular)',
  isRegexp: true,
  includePattern: 'src/**/*.{ts,tsx,js,jsx}'
});
```

### Example 6: Find Configuration Files

```typescript
// Locate all config files
const configs = await fileSearch({
  query: '**/{config,configuration,settings}.{json,js,ts,yaml,yml}'
});

// Also search for dotfiles
const dotfiles = await fileSearch({
  query: '**/.*rc{,.json,.js,.yml}'
});
```

## Implementation Notes

### Search Performance

1. **Grep Search**: Fast for text patterns, uses ripgrep or similar
2. **File Search**: Fast filesystem traversal, respects .gitignore
3. **Semantic Search**: Slower but more intelligent, uses embeddings

### When to Use Each Method

| Method | Use When | Speed | Intelligence |
|--------|----------|-------|--------------|
| grep_search | Know exact text/pattern | ⚡ Fast | 🎯 Exact |
| file_search | Know filename pattern | ⚡⚡ Very Fast | 🎯 Exact |
| semantic_search | Fuzzy/conceptual search | 🐌 Slower | 🧠 Smart |

### Regex Patterns

Common useful patterns:

```typescript
// Function definitions (various languages)
'function\\s+\\w+|def\\s+\\w+|func\\s+\\w+'

// Import statements
'import.*from|require\\(|import\\s'

// Error handling
'try\\s*{|catch\\s*\\(|throw\\s+new'

// API calls
'fetch\\(|axios\\.|http\\.(get|post)'

// Environment variables
'process\\.env|import\\.meta\\.env|ENV\\['
```

### Glob Patterns

Common glob patterns:

```typescript
'**/*.ts'           // All TypeScript files
'src/**/*.test.ts'  // All test files in src
'**/index.{ts,js}'  // All index files
'!**/node_modules/**' // Exclude node_modules
'**/{config,settings}.*' // Config or settings files
```

## Edge Cases

### 1. Large Result Sets

When searches return many results:

```typescript
// Limit results initially
const results = await grepSearch({
  query: 'function',
  isRegexp: false,
  maxResults: 10
});

// If need more, search more specifically
if (results.length === 10) {
  const moreSpecific = await grepSearch({
    query: 'function calculateTotal',
    isRegexp: false
  });
}
```

### 2. Hidden/Ignored Files

By default, search respects .gitignore:

```typescript
// Standard search (respects .gitignore)
const results = await grepSearch({
  query: 'API_KEY',
  isRegexp: false
});

// Search including ignored files (use sparingly!)
const allResults = await grepSearch({
  query: 'API_KEY',
  isRegexp: false,
  includeIgnoredFiles: true
});
```

### 3. Special Characters in Regex

Escape special regex characters:

```typescript
// BAD - Special chars not escaped
query: 'function()'  // Matches 'functio' + any char

// GOOD - Properly escaped
query: 'function\\(\\)'  // Matches literal 'function()'
```

### 4. Performance with Large Codebases

For very large projects:

```typescript
// Narrow scope with includePattern
const results = await grepSearch({
  query: 'loginUser',
  isRegexp: false,
  includePattern: 'src/auth/**'  // Only search auth folder
});
```

## Dependencies

- **Grep Engine**: ripgrep, ag (the silver searcher)
- **File System**: Node.js fs/glob or equivalent
- **Semantic Search**: Embedding models, vector database

## Related Skills

- [Code Understanding](./code-understanding.md) - Deep code analysis
- [File Operations](./file-operations.md) - Work with found files
- [Project Management](./project-management.md) - Organize findings

## Best Practices

### 1. Start Specific, Broaden If Needed

```typescript
// 1. Try specific search first
let results = await grepSearch({
  query: 'async function handleUserLogin',
  isRegexp: false
});

// 2. If no results, broaden
if (results.length === 0) {
  results = await grepSearch({
    query: 'handleUserLogin',
    isRegexp: false
  });
}

// 3. If still nothing, use semantic
if (results.length === 0) {
  results = await semanticSearch({
    query: 'user login handler function'
  });
}
```

### 2. Combine Multiple Search Methods

```typescript
// Use semantic search to find area
const area = await semanticSearch({
  query: 'authentication logic'
});

// Then use grep in that area
const specifics = await grepSearch({
  query: 'validatePassword|checkCredentials',
  isRegexp: true,
  includePattern: area[0].path + '/**'
});
```

### 3. Use Alternation for Multiple Terms

```typescript
// GOOD - One search with alternation
await grepSearch({
  query: 'function|method|procedure|def ',
  isRegexp: true
});

// BAD - Multiple sequential searches
await grepSearch({query: 'function', isRegexp: false});
await grepSearch({query: 'method', isRegexp: false});
await grepSearch({query: 'procedure', isRegexp: false});
```

### 4. Preview Before Reading Full Files

```typescript
// 1. Search to get locations
const matches = await grepSearch({
  query: 'database connection',
  isRegexp: false
});

// 2. Review match context (from search results)
console.log(matches); // Shows surrounding lines

// 3. Read full file only if needed
if (needsFullContext) {
  const content = await readFile(matches[0].file);
}
```

### 5. Document Search Strategies

When searching for complex requirements:

```typescript
// Document your search approach
const searchPlan = {
  goal: 'Find all error handling in API layer',
  searches: [
    // 1. Find API layer
    { type: 'file', pattern: 'api/**/*.ts' },
    // 2. Find error handling
    { type: 'grep', pattern: 'try|catch|throw', regex: true },
    // 3. Semantic check
    { type: 'semantic', query: 'error handling middleware' }
  ]
};
```

## Advanced Techniques

### 1. Multi-Step Search Refinement

```typescript
// Step 1: Broad file search
const candidateFiles = await fileSearch({
  query: 'src/**/*.ts'
});

// Step 2: Filter by content
const withAuth = await grepSearch({
  query: 'authentication',
  isRegexp: false,
  includePattern: candidateFiles.join('|')
});

// Step 3: Semantic understanding
const relevant = await semanticSearch({
  query: 'JWT token validation'
});
```

### 2. Search Result Aggregation

```typescript
// Aggregate searches into comprehensive results
const allResults = {
  tests: await fileSearch({ query: '**/*.test.*' }),
  configs: await fileSearch({ query: '**/*config.*' }),
  errors: await grepSearch({ query: 'throw new Error', isRegexp: false }),
  todos: await grepSearch({ query: 'TODO|FIXME', isRegexp: true })
};

// Generate report
generateSearchReport(allResults);
```

### 3. Context-Aware Search

```typescript
// Search with different strategies based on context
async function smartSearch(query: string, context: 'exact' | 'fuzzy' | 'semantic') {
  switch (context) {
    case 'exact':
      return await grepSearch({ query, isRegexp: false });
    case 'fuzzy':
      return await grepSearch({ query: `.*${query}.*`, isRegexp: true });
    case 'semantic':
      return await semanticSearch({ query });
  }
}
```

### 4. Search Performance Monitoring

```typescript
// Track search performance
const searchMetrics = {
  start: Date.now(),
  query: 'user authentication'
};

const results = await grepSearch({...});

searchMetrics.duration = Date.now() - searchMetrics.start;
searchMetrics.resultCount = results.length;

// Adjust strategy if slow
if (searchMetrics.duration > 5000) {
  // Use more targeted search next time
}
```

## Anti-Patterns to Avoid

### ❌ Don't: Search with Too-Generic Terms

```typescript
// BAD - Too generic, thousands of results
await grepSearch({ query: 'function', isRegexp: false });

// GOOD - More specific
await grepSearch({ query: 'async function processPayment', isRegexp: false });
```

### ❌ Don't: Ignore Regex Escaping

```typescript
// BAD - Unescaped regex special chars
await grepSearch({ query: 'user.email', isRegexp: true });
// Matches 'user' + any char + 'email'

// GOOD - Properly escaped
await grepSearch({ query: 'user\\.email', isRegexp: true });
// Matches literal 'user.email'
```

### ❌ Don't: Search Without Scope

```typescript
// BAD - Searching everything including node_modules
await grepSearch({
  query: 'React',
  isRegexp: false,
  includeIgnoredFiles: true  // Don't do this!
});

// GOOD - Targeted scope
await grepSearch({
  query: 'React',
  isRegexp: false,
  includePattern: 'src/**'
});
```

## Version History

- **v1.0.0** - Basic grep and file search
- **v1.5.0** - Added regex and glob patterns
- **v2.0.0** - Integrated semantic search
- **v2.5.0** - Performance optimizations
- **v3.0.0** - Multi-language and smart ranking

## Testing

```typescript
describe('SearchNavigation', () => {
  test('grep finds exact matches', async () => {
    const results = await grepSearch({
      query: 'exact phrase',
      isRegexp: false
    });
    expect(results.length).toBeGreaterThan(0);
  });

  test('file search supports globs', async () => {
    const results = await fileSearch({
      query: '**/*.test.ts'
    });
    expect(results.every(f => f.endsWith('.test.ts'))).toBe(true);
  });
});
```

## Metrics

- Search latency by method
- Result relevance (precision/recall)
- Cache hit rate
- Query complexity distribution

## Future Enhancements

- **Fuzzy Filename Search**: Typo-tolerant file finding
- **Search History**: Learn from past searches
- **Smart Suggestions**: Autocomplete search queries
- **Cross-Repository Search**: Search across multiple repos
- **Visual Search Results**: Interactive result browser
