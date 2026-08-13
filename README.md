# SemanticSaga

SemanticSaga is a reusable GenLayer compensation primitive for non-atomic
autonomous workflows. It combines an immutable dependency DAG with
consensus-verified execution and compensation receipts.

## Core invariant

Once a step receives a verified `FAIL`, forward claims are frozen. Completed
effects are queued for compensation in reverse **actual completion order**.
Calling a compensating API is not success: the corresponding public receipt
must independently produce the same complete bounded record for leader and
validators before the queue advances.

Receipt consensus binds policy version, workflow, step, action, verdict,
source availability, HTTP status and normalized evidence fingerprint. There is
no free-form summary in state or later prompts. Unavailable or ambiguous
evidence stores `UNKNOWN`; it never passes and never silently preserves a
successful compensation.

## Reuse

Suitable for travel booking, provisioning, procurement, deployment,
marketplace fulfillment, migrations, and other workflows whose external side
effects cannot be atomically reverted.

## State machine

`RUNNING -> COMPLETED` or `RUNNING -> COMPENSATING -> ROLLED_BACK`.
Irreversible completed steps are recorded but omitted from the reverse queue;
if no completed effect is compensable, failure terminates as
`FAILED_UNCOMPENSATED`.

## Validation

```powershell
genvm-lint check contracts\SemanticSaga.py --json
pytest tests\direct -q
npm run check:discovery
```

See [ARCHITECTURE.md](ARCHITECTURE.md), [SECURITY.md](SECURITY.md), and
[SUBMISSION_NOTES.md](SUBMISSION_NOTES.md).
