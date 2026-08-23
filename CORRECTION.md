# Complete compensation correction

Steward issue: a completed step without compensation criteria could be omitted
from the queue while the workflow later became `ROLLED_BACK`.

Correction in commit `d0bce09`:

- template registration requires non-empty compensation criteria for every step;
- every completed step is included in reverse completion order;
- queue exhaustion rechecks every completed step's stored state;
- `ROLLED_BACK` is set only when all are `COMPENSATED`; otherwise the terminal
  state is `FAILED_UNCOMPENSATED` and `is_terminally_safe` remains false.

Validation:

- GenVM lint and validation: pass, zero findings;
- frozen contract discovery: exactly `contracts/SemanticSaga.py`;
- rollback invariant checks: 4/4 pass;
- StudioNet deployment: `MAJORITY_AGREE`, `FINALIZED`;
- local/deployed normalized source SHA-256:
  `20c92a3fe5cd9cbceaa8c299e677797c80c5859ee8a2798dd3c05cec1f658cb1`.

Evidence:

- Contract: https://explorer-studio.genlayer.com/address/0xad727bFBd1238FF977C51aB39fB153A17Adaa42C
- Deployment: https://explorer-studio.genlayer.com/tx/0xc33084cfffc2d07b252aa12b9e0835b9853a5403a053cca0483f432e7803322b
