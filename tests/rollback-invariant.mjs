import fs from "node:fs";
import assert from "node:assert/strict";

const source = fs.readFileSync("contracts/SemanticSaga.py", "utf8");

assert.match(source, /"compensation criteria", MAX_TEXT\)/);
assert.doesNotMatch(source, /len\(item\["compensation_criteria"\]\) > 0/);
assert.match(source, /workflow\.state = "ROLLED_BACK" if self\._all_compensated/);
assert.match(source, /if state != "COMPENSATED":\s+return False/);
console.log("Rollback invariant checks passed: 4/4");
