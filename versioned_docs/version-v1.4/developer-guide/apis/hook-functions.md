---
sidebar_label: Hook Functions
sidebar_position: 1
slug: /developer-guide/apis/hook-functions
---

# Hook Functions

Dayu uses a registry-based hook mechanism so policies and application behavior can change without replacing the stable
runtime service loops. Implementations register an alias with `ClassFactory`; templates and visualization configs select
that alias at runtime.

## Resolution model

| Part | Role |
| --- | --- |
| `ClassFactory` | Registers one implementation under a `ClassType` and alias. |
| `Context.get_algorithm()` | Reads the selected name and parameters and creates the hook instance. |
| `dependency/core/lib/algorithms/__init__.py` | Imports each hook-family package so discovery starts during core initialization. |
| Shared hook loader | Imports public single-file hooks and explicit package entry points from `dependency/core/lib/algorithms/loader.py`. |
| Templates and YAML catalogs | Select aliases through `<TYPE>_NAME`, `<TYPE>_PARAMETERS`, lists, or `hook_name`. |

Most single hooks use this pattern:

```yaml
- name: GEN_FILTER_NAME
  value: simple
- name: GEN_COMPRESS_NAME
  value: simple
```

Processor scenario extractors and Monitor metrics use alias lists, while result and system visualizations select one
`hook_name` per visualization item.

## Package discovery

Each hook-family package examines only its direct children. A public `.py` file is imported as a flat hook entry. A
multi-file implementation must provide `<package>/hook.py`; that entry point imports and exposes its registered
implementations through `__all__`. Internal model, DRL, utility, and ablation modules are not discovered recursively,
and package `__init__.py` files should remain lightweight.

Hook families that declare optional dependencies skip an entry only when an external package is unavailable and emit a
warning. Missing `core.*` imports still fail immediately so repository errors are not mistaken for optional features.

## Main hook groups

| Area | Examples |
| --- | --- |
| Generator | Getter filter, frame filter/process/compress, before-schedule, after-schedule, getter, and before-submit hooks. |
| Scheduler | Configuration extraction, scenario/policy retrieval, startup, source selection, deployment, redeployment, and agents. |
| Processor | Processor family, queue discipline, and scenario extraction. |
| Monitor | Resource and queue-state samplers. |
| Visualization | Result and system visualizers selected by YAML. |

## Add an implementation

1. Implement the base signature used by the caller.
2. Use a public `.py` file for a self-contained hook, or a package with `hook.py` for a multi-file implementation or
   related variants.
3. Register each class with `@ClassFactory.register(ClassType.<TYPE>, alias="<name>")` and expose it through the
   entry module's `__all__`.
4. Import package internals explicitly from `hook.py`; do not rely on recursive discovery or eager package imports.
5. Expose the alias in a template, list, or visualization config.
6. Document constructor parameters and optional dependencies, then add focused tests and update the hook catalog.

The call order is part of the runtime contract, especially for Generator identity reservation and Scheduler deployment
validation. Consult the implementation-facing [Hook Guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/README.md)
and [Hook Catalog](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/catalog.md) before adding an alias.
