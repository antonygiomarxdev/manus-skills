# Code Understanding - Core Skill

## Overview

Code Understanding enables Manus AI to deeply comprehend codebases through semantic analysis, pattern recognition, and contextual reasoning. This skill goes beyond simple text search to understand code structure, dependencies, and intent.

## Category

**Core Skill** - Essential for intelligent code assistance

## Key Capabilities

### 1. Semantic Code Search
- Natural language queries to find relevant code
- Context-aware search across entire codebase
- Understanding of code intent and purpose
- Ranking results by relevance

### 2. Dependency Analysis
- Trace imports and exports
- Build dependency graphs
- Identify circular dependencies
- Analyze module relationships

### 3. Pattern Detection
- Identify common design patterns
- Detect anti-patterns and code smells
- Find similar code blocks
- Recognize architectural patterns

### 4. Symbol Navigation
- Find all references to symbols
- Jump to definitions
- Track symbol usage across files
- Understand symbol scope and lifecycle

### 5. Documentation Generation
- Generate JSDoc/TSDoc comments
- Create README sections
- Document API endpoints
- Explain complex algorithms

## Use Cases

- **Code Discovery**: "Find all API handlers that deal with user authentication"
- **Refactoring Planning**: Understand impact before making changes
- **Bug Investigation**: Trace data flow to find issues
- **Onboarding**: Understand new codebases quickly
- **Architecture Analysis**: Visualize system structure

## Parameters

### semantic_search

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Natural language search query |

### analyze_dependencies

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| filePath | string | Yes | File to analyze |
| depth | number | No | How many levels deep (default: 3) |
| includeExternal | boolean | No | Include node_modules (default: false) |

### find_pattern

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| pattern | PatternType | Yes | Pattern to search for |
| scope | string | No | Directory to search in |

### generate_documentation

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target | string | Yes | File or symbol to document |
| format | DocFormat | No | Output format (JSDoc, TSDoc, Markdown) |

## Examples

### Example 1: Semantic Code Search

```typescript
// Find authentication-related code
const results = await semanticSearch({
  query: 'functions that validate user credentials and check permissions'
});

// Results might include:
// - src/auth/validateUser.ts
// - src/middleware/authCheck.ts
// - src/guards/permissions.ts
```

**Smart**: Unlike grep, this understands intent and context, not just keywords.

### Example 2: Dependency Analysis

```typescript
// Analyze what a module depends on
const deps = await analyzeDependencies({
  filePath: '/project/src/services/UserService.ts',
  depth: 2,
  includeExternal: false
});

// Output:
// UserService.ts
// ├── models/User.ts
// │   └── types/UserTypes.ts
// ├── database/connection.ts
// │   └── config/database.ts
// └── utils/validation.ts
```

### Example 3: Pattern Detection

```typescript
// Find all Singleton patterns in the codebase
const singletons = await findPattern({
  pattern: 'SINGLETON',
  scope: '/project/src'
});

// Results:
// - DatabaseConnection.ts (implements singleton)
// - ConfigManager.ts (implements singleton)
// - Logger.ts (implements singleton)
```

### Example 4: Symbol References

```typescript
// Find all usages of a function
const refs = await findReferences({
  symbol: 'calculateDiscount',
  filePath: '/project/src/utils/pricing.ts'
});

// Results:
// - src/components/Cart.tsx:45
// - src/services/OrderService.ts:102
// - src/api/checkout.ts:78
```

### Example 5: Documentation Generation

```typescript
// Generate documentation for a complex function
const docs = await generateDocumentation({
  target: '/project/src/algorithms/pathfinding.ts:dijkstra',
  format: 'JSDOC'
});

// Generated:
/**
 * Implements Dijkstra's shortest path algorithm
 * 
 * @param graph - Weighted graph represented as adjacency list
 * @param start - Starting node identifier
 * @param end - Destination node identifier
 * @returns Shortest path as array of nodes, or null if no path exists
 * 
 * @complexity O((V + E) log V) where V is vertices and E is edges
 * 
 * @example
 * const path = dijkstra(graph, 'A', 'F');
 * // Returns: ['A', 'C', 'E', 'F']
 */
```

## Implementation Notes

### Semantic Search Technology

The semantic search capability uses:

1. **Embedding Models**: Convert code and queries to vector representations
2. **Similarity Matching**: Find code with similar semantic meaning
3. **Ranking Algorithms**: Prioritize most relevant results
4. **Context Windows**: Consider surrounding code for better understanding

### AST (Abstract Syntax Tree) Analysis

Many code understanding features rely on AST parsing:

```typescript
// Parse code into AST
const ast = parser.parse(sourceCode, {
  sourceType: 'module',
  plugins: ['typescript', 'jsx']
});

// Traverse AST to find patterns
traverse(ast, {
  FunctionDeclaration(path) {
    // Analyze function structure
  },
  ImportDeclaration(path) {
    // Track dependencies
  }
});
```

### Language Support

Core support for:
- **JavaScript/TypeScript**: Full AST analysis
- **Python**: Full AST analysis
- **Java**: Basic pattern detection
- **C/C++**: Basic pattern detection
- **Go**: Basic pattern detection

Extensible to other languages via plugins.

### Performance Considerations

1. **Indexing**: Build code index for faster searches
2. **Caching**: Cache AST and analysis results
3. **Incremental Analysis**: Only re-analyze changed files
4. **Lazy Loading**: Load metadata first, details on demand

## Edge Cases

### 1. Dynamic Code

Code generated at runtime is difficult to analyze:

```typescript
// Hard to analyze statically
const methodName = 'get' + entityType;
obj[methodName]();

// Better for analysis
if (entityType === 'User') {
  obj.getUser();
} else if (entityType === 'Post') {
  obj.getPost();
}
```

### 2. Multiple Languages

Projects with multiple languages require different analyzers:
- Use appropriate parser for each language
- Maintain separate indices
- Cross-language dependency tracking may be limited

### 3. Generated Code

Auto-generated code (protobuf, GraphQL, etc.):
- May inflate search results
- Consider excluding from semantic search
- Keep in dependency analysis

### 4. Obfuscated/Minified Code

Cannot reliably analyze obfuscated code:
- Work with source maps when available
- Suggest using source code instead
- Limit analysis to un-minified files

## Dependencies

- **AST Parsers**: @babel/parser, typescript, esprima
- **Embedding Models**: sentence-transformers, OpenAI embeddings
- **Graph Analysis**: networkx, cytoscape
- **Language Servers**: TypeScript Language Server, Python LSP

## Related Skills

- [File Operations](./file-operations.md) - Read code for analysis
- [Search & Navigation](./search-navigation.md) - Complementary search methods
- [Code Refactoring](./code-refactoring.md) - Apply understanding to refactor
- [Testing & Debugging](./testing-debugging.md) - Use understanding to debug

## Best Practices

### 1. Start Broad, Then Narrow

```typescript
// 1. Broad semantic search
const files = await semanticSearch({
  query: 'authentication and authorization logic'
});

// 2. Narrow to specific files
const authFile = files[0];
const content = await readFile(authFile);

// 3. Analyze specific implementations
const patterns = await findPattern({
  pattern: 'MIDDLEWARE',
  scope: path.dirname(authFile)
});
```

### 2. Combine Multiple Search Methods

```typescript
// Semantic search for general area
const semanticResults = await semanticSearch({
  query: 'database query optimization'
});

// Grep for specific patterns
const grepResults = await grepSearch({
  query: 'SELECT.*FROM.*WHERE',
  isRegexp: true,
  includePattern: semanticResults.join('|')
});
```

### 3. Visualize Dependencies

```typescript
// Generate dependency graph
const deps = await analyzeDependencies({
  filePath: '/project/src/main.ts',
  depth: 3
});

// Create visualization
const graph = createDependencyGraph(deps);
// Export as mermaid diagram or interactive graph
```

### 4. Document As You Understand

```typescript
// As you understand code, generate documentation
for (const file of complexFiles) {
  const docs = await generateDocumentation({
    target: file,
    format: 'MARKDOWN'
  });
  
  await createFile({
    filePath: `${file}.md`,
    content: docs
  });
}
```

### 5. Cache Understanding

```typescript
// Build and maintain code understanding cache
const cache = {
  index: await buildCodeIndex('/project/src'),
  dependencies: await analyzeDependencies({...}),
  patterns: await findPatterns({...})
};

// Reuse cache for faster subsequent operations
```

## Anti-Patterns to Avoid

### ❌ Don't: Search Without Context

```typescript
// BAD - Vague search
await semanticSearch({query: 'function'});

// GOOD - Specific with context
await semanticSearch({
  query: 'function that calculates tax including regional variations'
});
```

### ❌ Don't: Ignore Language-Specific Idioms

```typescript
// BAD - Looking for Java patterns in Python
await findPattern({
  pattern: 'GETTER_SETTER', // Java idiom
  scope: '/project/python-src'
});

// GOOD - Use language-appropriate patterns
await findPattern({
  pattern: 'PROPERTY_DECORATOR', // Python idiom
  scope: '/project/python-src'
});
```

### ❌ Don't: Over-Analyze

```typescript
// BAD - Analyzing everything deeply
for (const file of allFiles) {
  await analyzeDependencies({file, depth: 10}); // Too deep!
}

// GOOD - Analyze strategically
const entryPoints = identifyEntryPoints();
for (const entry of entryPoints) {
  await analyzeDependencies({entry, depth: 3}); // Reasonable depth
}
```

## Advanced Techniques

### 1. Call Graph Construction

Build a graph of function calls to understand execution flow:

```typescript
const callGraph = await buildCallGraph({
  entryPoint: '/project/src/main.ts',
  includeLibraries: false
});

// Find paths between functions
const paths = findCallPaths(callGraph, 'start', 'end');
```

### 2. Data Flow Analysis

Track how data moves through the system:

```typescript
const dataFlow = await analyzeDataFlow({
  variable: 'userCredentials',
  startFile: '/project/src/auth/login.ts'
});

// Trace where data goes
// userCredentials -> hash() -> database -> session -> cookie
```

### 3. Impact Analysis

Understand the impact of potential changes:

```typescript
const impact = await analyzeChangeImpact({
  target: 'function calculatePrice',
  change: 'add new parameter'
});

// Shows:
// - 15 call sites need updating
// - 3 tests will break
// - 1 API endpoint affected
```

### 4. Code Complexity Metrics

Calculate complexity for refactoring decisions:

```typescript
const complexity = await calculateComplexity({
  filePath: '/project/src/business-logic.ts',
  metrics: ['cyclomatic', 'cognitive', 'halstead']
});

// Results:
// - Cyclomatic: 45 (HIGH - consider refactoring)
// - Cognitive: 32 (MEDIUM)
// - Halstead Difficulty: 28
```

## Version History

- **v1.0.0** - Basic semantic search
- **v1.5.0** - Added dependency analysis
- **v2.0.0** - Pattern detection and documentation generation
- **v2.5.0** - Advanced AST analysis and call graphs
- **v3.0.0** - Multi-language support and embeddings

## Testing

### Unit Tests

```typescript
describe('CodeUnderstanding', () => {
  test('semantic search finds relevant code', async () => {
    const results = await semanticSearch({
      query: 'authentication logic'
    });
    expect(results).toContain('auth/');
  });

  test('dependency analysis detects circular deps', async () => {
    const deps = await analyzeDependencies({
      filePath: 'circular-test.ts'
    });
    expect(deps.circular).toBe(true);
  });
});
```

## Metrics

- Search accuracy (precision/recall)
- Analysis speed per file
- Cache hit rate
- Pattern detection accuracy

## Future Enhancements

- **AI-Powered Explanations**: Natural language code explanations
- **Cross-Repository Understanding**: Analyze dependencies across repos
- **Real-Time Analysis**: Live analysis as code is written
- **Learning from Feedback**: Improve search based on user interactions
- **Visual Code Maps**: Interactive codebase visualizations
