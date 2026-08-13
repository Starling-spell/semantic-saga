# Architecture

The contract owns the deterministic DAG, claims, dependency unlocking,
completion ordering, forward freeze, reverse compensation queue, and terminal
state. External systems own receipt publication. GenLayer consensus owns the
minimum nondeterministic transition: whether a public receipt proves a bounded
execution or compensation criterion.

Every validator independently refetches the same URL and reruns the bounded
classification. Exact equality is required for every stored field. Changing a
receipt or returning different semantic outcomes forces disagreement instead
of allowing leader-selected state.
