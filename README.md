# Manus Skills - Advanced AI Agent Skill System

> 🌍 **Available in**: [English](README.md) | [Español](i18n/README.es.md) | [中文](i18n/README.zh.md)

A comprehensive skill system for Manus AI, an advanced programming agent inspired by best practices from Claude Code, Cursor, Aider, and other state-of-the-art AI development systems.

📊 **[View Project Overview](PROJECT_OVERVIEW.md)** | 🚀 **[Quick Start](docs/en/QUICKSTART.md)** | 📖 **[Documentation Index](docs/en/INDEX.md)**

## 🎯 Overview

Manus AI is an autonomous programming agent that combines analysis, editing, testing, and project management capabilities with a modular and extensible architecture.

## 📚 Structure

```
manus-skills/
├── docs/
│   ├── en/                  # English documentation
│   │   ├── core-skills/     # Core skills
│   │   ├── advanced-skills/ # Advanced skills
│   │   ├── integration/     # Integration guides
│   │   └── examples/        # Usage examples
│   ├── es/                  # Spanish documentation
│   └── zh/                  # Chinese documentation
├── i18n/                    # Internationalization
│   ├── README.es.md         # Spanish README
│   └── README.zh.md         # Chinese README
├── skills/                  # Skill implementations
└── README.md
```

## 🚀 Skill Categories

### 1. **File Operations**
- Intelligent file reading with context awareness
- Precise string-based editing
- File and directory creation/deletion
- Batch operations and refactoring

### 2. **Code Understanding**
- Semantic code search across codebase
- Dependency analysis
- Pattern and anti-pattern detection
- Automatic documentation generation

### 3. **Search & Navigation**
- Content-based search (grep/regex)
- Filename pattern matching
- Contextual semantic search
- Symbol navigation and references

### 4. **Terminal Operations**
- Command execution with timeout handling
- Background process management
- Output streaming and monitoring
- Cross-platform compatibility

### 5. **Testing & Debugging**
- Test execution and reporting
- Failure analysis and suggestions
- Compilation error detection
- Interactive debugging support

### 6. **Code Refactoring**
- Symbol renaming across files
- Function/method extraction
- Code reorganization patterns
- Import optimization

### 7. **Version Control**
- Git operations integration
- Diff analysis and staging
- Branch management
- Automated code review

### 8. **Project Management**
- TODO list system with status tracking
- Multi-step task planning
- Progress monitoring
- Dependency management

### 9. **Memory & Context**
- Persistent user memory (preferences, patterns)
- Session memory (task-specific context)
- Repository memory (project conventions)
- Pattern learning from interactions

### 10. **AI-Specific Skills**
- Context-aware code generation
- Proactive suggestions
- Intent detection and clarification
- Multi-step autonomous planning

## 📖 Detailed Documentation

Check the `/docs` folder for detailed specifications:

- [Core Skills](docs/en/core-skills/) - Fundamental capabilities
- [Advanced Skills](docs/en/advanced-skills/) - Complex operations
- [Integration Guide](docs/en/integration/) - Tool integration
- [Examples](docs/en/examples/) - Practical usage examples

## 🎓 Design Philosophy

### Key Principles:
1. **Autonomy**: The agent should work independently with minimal guidance
2. **Precision**: Exact edits without guessing or placeholders
3. **Efficiency**: Parallelize operations when possible
4. **Context**: Maintain awareness of project state and history
5. **Learning**: Improve through interaction and feedback

### Inspiration:
- **Claude Code**: Precise editing, context management, multi-file awareness
- **Cursor**: Proactive suggestions, semantic understanding
- **Aider**: Git integration, intelligent refactoring
- **GitHub Copilot**: Contextual generation, pattern recognition

## 🛠️ Implementation

Each skill follows a standard structure:

```typescript
interface Skill {
  name: string;
  category: SkillCategory;
  description: string;
  parameters: Parameter[];
  execute: (params: any) => Promise<Result>;
  examples: Example[];
  metadata: {
    version: string;
    tags: string[];
    dependencies: string[];
  };
}
```

## 🚦 Project Status

- ✅ Architecture definition
- ✅ Skill documentation
- 🔄 Implementation in progress
- ⏳ Testing and validation

## 🌐 Internationalization (i18n)

We support multiple languages for documentation:

- **English** (default): Native documentation
- **Español**: [docs/es/](docs/es/) | [README](i18n/README.es.md)
- **中文**: [docs/zh/](docs/zh/) | [README](i18n/README.zh.md)

To contribute translations, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 Contributing

To add new skills:
1. Document in `/docs/en/core-skills/` or `/docs/en/advanced-skills/`
2. Implement in `/skills/`
3. Add examples in `/docs/en/examples/`
4. Add translations in other language folders
5. Update this README

## 📄 License

MIT License - See LICENSE for details