# Security model

- Receipt URLs require public HTTPS DNS hosts.
- Receipt content is delimited as untrusted prompt data.
- Exact complete-record comparison binds identity, outcome, status and source.
- `UNKNOWN` never unlocks dependencies or advances compensation.
- The DAG is bounded to 12 steps and checked for cycles.
- A verified failure freezes all forward claims immediately.
- Only the reverse queue head can be compensated.
- Free-form reasoning, confidence and summaries are excluded from state.

Use durable, public, append-only or content-addressed receipt URLs where
possible. Authenticated and private endpoints are intentionally unsupported.
