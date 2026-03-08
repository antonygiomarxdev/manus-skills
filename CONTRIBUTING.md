# Contributing to Manus Skills

Thank you for your interest in contributing to Manus Skills! This document provides guidelines and instructions for contributing.

## 🌍 Internationalization (i18n)

We support multiple languages for documentation. All documentation should be available in:

- **English** (en) - Primary language
- **Español** (es) - Spanish
- **中文** (zh) - Chinese

### Adding Translations

1. **READMEs**: Place translated READMEs in `/i18n/` folder:
   - `/i18n/README.es.md`
   - `/i18n/README.zh.md`

2. **Documentation**: Place translated docs in `/docs/{lang}/` folders:
   - `/docs/en/` - English (primary)
   - `/docs/es/` - Spanish
   - `/docs/zh/` - Chinese

3. **Translation Workflow**:
   - Always update English documentation first
   - Add translations for the same content in other languages
   - Use language codes consistently (ISO 639-1)

### Language Codes

| Language | Code | Folder |
|----------|------|--------|
| English | en | `/docs/en/` |
| Spanish | es | `/docs/es/` |
| Chinese | zh | `/docs/zh/` |

## 📝 Adding New Skills

### 1. Documentation First

Create documentation in English first:

```
docs/en/core-skills/your-skill-name.md
```

or

```
docs/en/advanced-skills/your-skill-name.md
```

### 2. Documentation Structure

Each skill document should include:

```markdown
# Skill Name

## Overview
Brief description of what the skill does.

## Category
Core Skill / Advanced Skill

## Use Cases
- Use case 1
- Use case 2
- Use case 3

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1 | string | Yes | Description |
| param2 | number | No | Description |

## Examples

### Example 1: Basic Usage
\`\`\`typescript
// Code example
\`\`\`

### Example 2: Advanced Usage
\`\`\`typescript
// Code example
\`\`\`

## Implementation Notes
Technical details, edge cases, limitations.

## Dependencies
- dependency-1
- dependency-2

## Related Skills
- [Related Skill 1](./related-skill-1.md)
- [Related Skill 2](./related-skill-2.md)
```

### 3. Implementation

Place implementation in `/skills/` folder:

```
skills/
├── core/
│   └── your-skill-name/
│       ├── index.ts
│       ├── implementation.ts
│       └── tests/
└── advanced/
    └── your-skill-name/
        ├── index.ts
        ├── implementation.ts
        └── tests/
```

### 4. Add Examples

Add practical examples in `/docs/en/examples/`:

```markdown
# Example: Using [Your Skill] for [Use Case]

## Scenario
Description of the scenario

## Implementation
Step-by-step guide

## Result
Expected outcome
```

### 5. Update Documentation

- Add skill to main README.md
- Add translations to other language READMEs
- Update category documentation

## 🧪 Testing

All skills must include:

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test skill in context
3. **Edge Cases**: Test boundaries and error conditions

## 📋 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-skill-name`
3. **Write** documentation (English first)
4. **Implement** the skill with tests
5. **Add** translations (if possible)
6. **Test** thoroughly
7. **Commit** with clear messages
8. **Push** to your fork
9. **Create** a Pull Request

### PR Title Format

```
[Category] Skill Name: Brief description
```

Examples:
- `[Core] File Operations: Add batch file reading`
- `[Advanced] Code Analysis: Add dependency graph generation`
- `[i18n] Spanish: Translate core skills documentation`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New skill
- [ ] Bug fix
- [ ] Documentation update
- [ ] Translation
- [ ] Other (please describe)

## Checklist
- [ ] Documentation in English added/updated
- [ ] Implementation complete
- [ ] Tests added and passing
- [ ] Examples provided
- [ ] Translations added (if applicable)
- [ ] README updated

## Related Issues
Closes #issue-number
```

## 🎨 Code Style

- **TypeScript**: Use ESLint configuration
- **Formatting**: Use Prettier
- **Naming**: camelCase for variables, PascalCase for classes
- **Comments**: JSDoc for public APIs

## 📖 Documentation Style

- Use clear, concise language
- Include code examples
- Link to related documentation
- Keep line length under 100 characters
- Use proper Markdown formatting

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Numbered steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, etc.
6. **Screenshots**: If applicable

## 💡 Feature Requests

When requesting features:

1. **Use Case**: Describe the problem to solve
2. **Proposed Solution**: How you envision it working
3. **Alternatives**: Other solutions you've considered
4. **Additional Context**: Any other relevant information

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## 📞 Questions?

- Open an issue with the `question` label
- Join our Discord community (coming soon)
- Email: [Coming soon]

Thank you for contributing to Manus Skills! 🎉
