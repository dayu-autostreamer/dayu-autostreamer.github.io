---
sidebar_label: Customize Scheduling
sidebar_position: 4
slug: /developer-guide/how-to-develop/customize-scheduling
---

# Customize Scheduling

A schedulable Dayu policy is assembled from three surfaces:

1. registered hook implementations under `dependency/core/lib/algorithms/`;
2. a Scheduler template under `template/scheduler/` that selects aliases and parameters;
3. an installable catalog entry in `template/scheduler_policies.yaml` that selects the Scheduler and its dependent
   Generator, Controller, Distributor, and Monitor templates.

## Scheduler hook families

| Hook | Responsibility |
| --- | --- |
| `SCH_CONFIG_EXTRACTION` | Load policy configuration spaces and mounted assets. |
| `SCH_SCENARIO_RETRIEVAL` | Convert completed tasks into policy state. |
| `SCH_POLICY_RETRIEVAL` | Recover the policy applied to a task. |
| `SCH_STARTUP_POLICY` | Provide a safe schedule before the agent has enough state. |
| `SCH_SELECTION_POLICY` | Select one source node from Backend-authorized candidates. |
| `SCH_INITIAL_DEPLOYMENT_POLICY` | Return the first complete processor deployment plan. |
| `SCH_REDEPLOYMENT_POLICY` | Return a later complete processor deployment plan. |
| `SCH_AGENT` | Maintain per-source state and generate task schedule decisions. |

## Current scheduling contracts

- Source selection operates only on the candidate scope supplied by Backend and must not discover cluster topology.
- Initial deployment and redeployment return a complete `logical service -> [node hostname, ...]` map for the current
  DAG. Unknown services, empty placements, and non-candidate nodes fail validation.
- `BaseAgent` validates deployment plans against the current request and injected cloud identity.
- The validated Scheduler result is the complete desired Processor topology. Backend materializes it unchanged and
  never appends replicas. Policies select cloud placement explicitly through choices such as `cloud`, `full`,
  `source-edge-cloud`, fixed `@cloud` targets, or `include_cloud`; `full-edge` remains edge-only.
- Runtime routing is not a policy output. Scheduler and Backend attach the committed RuntimeDirectory revision and exact
  routes after validating the policy result.
- Immediate offloading decisions should use a `LIVE` scheduling snapshot and select only replicas active in that
  revision. Commitment-aware planning should use `COMMITTED`, which also includes reservations, active commitments,
  and task barriers. Telemetry must match the RuntimeDirectory revision being used.
- Pipeline-only policies may use the shared edge-to-cloud partition helpers. General DAG policies must preserve the
  full graph and reject unsupported branches, joins, cycles, or inactive targets instead of silently linearizing them.
- A scheduling agent must not mutate the copied snapshot or other shared framework state.

## Add a policy

1. Start from the closest existing hook and template family.
2. Implement a self-contained hook as a public `.py` entry, or use an algorithm package with `hook.py` when the
   policy owns helpers, models, or related variants.
3. Register each class with `@ClassFactory.register(ClassType.<TYPE>, alias="<name>")`, expose it through
   `__all__`, and keep package internals explicitly imported from `hook.py`.
4. Add constructor parameters through the matching `<TYPE>_PARAMETERS` value in the Scheduler template.
5. Keep policy assets under an explicit mounted path and document whether optional ML dependencies are required.
6. Add a unique policy ID to `template/scheduler_policies.yaml` and choose component dependencies appropriate to the
   policy's source and monitor needs.
7. Add focused tests for alias loading, request validation, schedule output, deployment-plan validation, and fallback
   behavior.
8. Run `make validate-build`, the relevant Python tests, and `make check` where dependencies are available.

Do not add Kubernetes clients or route lookup code to a policy. Backend owns cluster access, Scheduler owns route
publication, and runtime tasks carry the exact route commitment.

The complete alias catalog and call signatures are maintained in the system repository:
[Hook Guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/README.md) and
[Hook Catalog](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/catalog.md).
