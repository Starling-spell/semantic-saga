import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),expected=path.normalize("contracts/SemanticSaga.py");
const ignored=new Set([".git",".tools","node_modules",".pytest_cache","__pycache__","artifacts"]),files:string[]=[];
function walk(d:string){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(ignored.has(e.name))continue;const a=path.join(d,e.name);if(e.isDirectory())walk(a);else if(e.isFile()&&e.name.endsWith(".py"))files.push(path.normalize(path.relative(root,a)));}}
walk(root);
const candidates=files.filter(f=>/['"]Depends['"]\s*:|\bgl\.Contract\b|\bfrom\s+genlayer\s+import\b/.test(fs.readFileSync(path.join(root,f),"utf8")));
if(candidates.length!==1||candidates[0]!==expected)throw new Error(`Expected only ${expected}; got ${candidates}`);
console.log(`Contract discovery passed: ${expected}`);
