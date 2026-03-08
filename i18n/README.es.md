# Manus Skills - Sistema Avanzado de Habilidades para Agentes AI

> 🌍 **Disponible en**: [English](../README.md) | [Español](README.es.md) | [中文](README.zh.md)

Un sistema completo de habilidades para Manus AI, un agente de programación avanzado inspirado en las mejores prácticas de Claude Code, Cursor, Aider y otros sistemas de desarrollo asistido por IA de última generación.

## 🎯 Visión General

Manus AI es un agente de programación autónomo que combina capacidades de análisis, edición, testing y gestión de proyectos con una arquitectura modular y extensible.

## 📚 Estructura

```
manus-skills/
├── docs/
│   ├── en/                  # Documentación en inglés
│   │   ├── core-skills/     # Habilidades fundamentales
│   │   ├── advanced-skills/ # Habilidades avanzadas
│   │   ├── integration/     # Guías de integración
│   │   └── examples/        # Ejemplos de uso
│   ├── es/                  # Documentación en español
│   └── zh/                  # Documentación en chino
├── i18n/                    # Internacionalización
│   ├── README.es.md         # README en español
│   └── README.zh.md         # README en chino
├── skills/                  # Implementaciones de habilidades
└── README.md
```

## 🚀 Categorías de Habilidades

### 1. **Operaciones de Archivos**
- Lectura inteligente de archivos con contexto
- Edición precisa basada en strings
- Creación/eliminación de archivos y directorios
- Operaciones por lotes y refactorización

### 2. **Comprensión de Código**
- Búsqueda semántica en el código base
- Análisis de dependencias
- Detección de patrones y anti-patrones
- Generación automática de documentación

### 3. **Búsqueda y Navegación**
- Búsqueda por contenido (grep/regex)
- Coincidencia de patrones en nombres de archivos
- Búsqueda semántica contextual
- Navegación de símbolos y referencias

### 4. **Operaciones de Terminal**
- Ejecución de comandos con manejo de timeouts
- Gestión de procesos en segundo plano
- Streaming y monitoreo de salida
- Compatibilidad multiplataforma

### 5. **Testing y Depuración**
- Ejecución y reporte de tests
- Análisis de fallos y sugerencias
- Detección de errores de compilación
- Soporte de depuración interactiva

### 6. **Refactorización de Código**
- Renombrado de símbolos entre archivos
- Extracción de funciones/métodos
- Patrones de reorganización de código
- Optimización de imports

### 7. **Control de Versiones**
- Integración de operaciones Git
- Análisis y staging de diffs
- Gestión de ramas
- Revisión automática de código

### 8. **Gestión de Proyectos**
- Sistema de listas TODO con seguimiento de estado
- Planificación de tareas multi-paso
- Monitoreo de progreso
- Gestión de dependencias

### 9. **Memoria y Contexto**
- Memoria persistente de usuario (preferencias, patrones)
- Memoria de sesión (contexto específico de tarea)
- Memoria de repositorio (convenciones del proyecto)
- Aprendizaje de patrones de interacciones

### 10. **Habilidades Específicas de IA**
- Generación de código consciente del contexto
- Sugerencias proactivas
- Detección y clarificación de intenciones
- Planificación autónoma multi-paso

## 📖 Documentación Detallada

Consulta la carpeta `/docs` para especificaciones detalladas:

- [Habilidades Fundamentales](../docs/es/core-skills/) - Capacidades básicas
- [Habilidades Avanzadas](../docs/es/advanced-skills/) - Operaciones complejas
- [Guía de Integración](../docs/es/integration/) - Integración de herramientas
- [Ejemplos](../docs/es/examples/) - Ejemplos de uso práctico

## 🎓 Filosofía de Diseño

### Principios Clave:
1. **Autonomía**: El agente debe trabajar de forma independiente con mínima guía
2. **Precisión**: Ediciones exactas sin adivinanzas ni placeholders
3. **Eficiencia**: Paralelizar operaciones cuando sea posible
4. **Contexto**: Mantener conciencia del estado e historial del proyecto
5. **Aprendizaje**: Mejorar a través de la interacción y retroalimentación

### Inspiración:
- **Claude Code**: Edición precisa, gestión de contexto, conciencia multi-archivo
- **Cursor**: Sugerencias proactivas, comprensión semántica
- **Aider**: Integración Git, refactorización inteligente
- **GitHub Copilot**: Generación contextual, reconocimiento de patrones

## 🛠️ Implementación

Cada habilidad sigue una estructura estándar:

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

## 🚦 Estado del Proyecto

- ✅ Definición de arquitectura
- ✅ Documentación de habilidades
- 🔄 Implementación en progreso
- ⏳ Testing y validación

## 🌐 Internacionalización (i18n)

Soportamos múltiples idiomas para la documentación:

- **English**: [docs/en/](../docs/en/) | [README](../README.md)
- **Español** (actual): [docs/es/](../docs/es/) | [README](README.es.md)
- **中文**: [docs/zh/](../docs/zh/) | [README](README.zh.md)

Para contribuir con traducciones, consulta [CONTRIBUTING.md](../CONTRIBUTING.md).

## 📝 Contribuir

Para agregar nuevas habilidades:
1. Documentar en `/docs/en/core-skills/` o `/docs/en/advanced-skills/`
2. Implementar en `/skills/`
3. Agregar ejemplos en `/docs/en/examples/`
4. Agregar traducciones en otras carpetas de idiomas
5. Actualizar este README

## 📄 Licencia

Licencia MIT - Ver LICENSE para detalles
