# Manus Skills - 高级AI代理技能系统

> 🌍 **语言支持**: [English](../README.md) | [Español](README.es.md) | [中文](README.zh.md)

Manus AI的综合技能系统，这是一个先进的编程代理，灵感来自Claude Code、Cursor、Aider和其他最先进的AI开发系统的最佳实践。

## 🎯 概述

Manus AI是一个自主编程代理，结合了分析、编辑、测试和项目管理功能，具有模块化和可扩展的架构。

## 📚 结构

```
manus-skills/
├── docs/
│   ├── en/                  # 英文文档
│   │   ├── core-skills/     # 核心技能
│   │   ├── advanced-skills/ # 高级技能
│   │   ├── integration/     # 集成指南
│   │   └── examples/        # 使用示例
│   ├── es/                  # 西班牙文档
│   └── zh/                  # 中文文档
├── i18n/                    # 国际化
│   ├── README.es.md         # 西班牙语README
│   └── README.zh.md         # 中文README
├── skills/                  # 技能实现
└── README.md
```

## 🚀 技能类别

### 1. **文件操作**
- 具有上下文感知的智能文件读取
- 基于字符串的精确编辑
- 文件和目录创建/删除
- 批处理操作和重构

### 2. **代码理解**
- 跨代码库的语义代码搜索
- 依赖分析
- 模式和反模式检测
- 自动文档生成

### 3. **搜索与导航**
- 基于内容的搜索（grep/regex）
- 文件名模式匹配
- 上下文语义搜索
- 符号导航和引用

### 4. **终端操作**
- 带超时处理的命令执行
- 后台进程管理
- 输出流和监控
- 跨平台兼容性

### 5. **测试与调试**
- 测试执行和报告
- 失败分析和建议
- 编译错误检测
- 交互式调试支持

### 6. **代码重构**
- 跨文件符号重命名
- 函数/方法提取
- 代码重组模式
- 导入优化

### 7. **版本控制**
- Git操作集成
- Diff分析和暂存
- 分支管理
- 自动代码审查

### 8. **项目管理**
- 带状态跟踪的待办事项列表系统
- 多步骤任务规划
- 进度监控
- 依赖管理

### 9. **内存与上下文**
- 持久用户内存（偏好、模式）
- 会话内存（任务特定上下文）
- 仓库内存（项目约定）
- 从交互中学习模式

### 10. **AI特定技能**
- 上下文感知代码生成
- 主动建议
- 意图检测和澄清
- 多步骤自主规划

## 📖 详细文档

查看`/docs`文件夹获取详细规范：

- [核心技能](../docs/zh/core-skills/) - 基本功能
- [高级技能](../docs/zh/advanced-skills/) - 复杂操作
- [集成指南](../docs/zh/integration/) - 工具集成
- [示例](../docs/zh/examples/) - 实用使用示例

## 🎓 设计哲学

### 核心原则：
1. **自主性**：代理应以最少的指导独立工作
2. **精确性**：精确编辑，无猜测或占位符
3. **效率**：在可能的情况下并行化操作
4. **上下文**：保持对项目状态和历史的认知
5. **学习**：通过交互和反馈改进

### 灵感来源：
- **Claude Code**：精确编辑、上下文管理、多文件感知
- **Cursor**：主动建议、语义理解
- **Aider**：Git集成、智能重构
- **GitHub Copilot**：上下文生成、模式识别

## 🛠️ 实现

每个技能遵循标准结构：

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

## 🚦 项目状态

- ✅ 架构定义
- ✅ 技能文档
- 🔄 实现进行中
- ⏳ 测试和验证

## 🌐 国际化（i18n）

我们支持多语言文档：

- **English**：[docs/en/](../docs/en/) | [README](../README.md)
- **Español**：[docs/es/](../docs/es/) | [README](README.es.md)
- **中文**（当前）：[docs/zh/](../docs/zh/) | [README](README.zh.md)

要贡献翻译，请参阅[CONTRIBUTING.md](../CONTRIBUTING.md)。

## 📝 贡献

添加新技能：
1. 在`/docs/en/core-skills/`或`/docs/en/advanced-skills/`中记录
2. 在`/skills/`中实现
3. 在`/docs/en/examples/`中添加示例
4. 在其他语言文件夹中添加翻译
5. 更新此README

## 📄 许可证

MIT许可证 - 详见LICENSE
