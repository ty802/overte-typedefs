import fs from 'fs';
import path from 'path';
import * as url from 'url';

const installPath = url.fileURLToPath(new URL('.', import.meta.url));

let filedata = fs.readFileSync(path.join(installPath, '../types.d.ts'), 'utf8');
fs.renameSync(path.join(installPath, '../types.d.ts'), path.join(installPath, '../types.d.ts.bak'));

filedata = filedata.replace(/(: void)/gmi, '');
filedata = filedata.replace(/([a-zA-Z])~([a-zA-Z])/g, '$1.$2');

// Remove "-" character from the type names
// (but not from YYYY-mm-dd) or (param X-coordinate)
filedata = filedata.replace(/\b(([A-Z][a-z]+)+)-(([A-Z][a-z]+)+)\b/g, '$1$3');

// Namespace and types cannot share the same name.
// Let's add prefix "T" to the types
filedata = filedata.replace(/\b(Vec[2-4]|Mat4|Quat)\b/g, 'T$1');
// Restore previous names for namespace
filedata = filedata.replace(/declare namespace T(Vec[2-4]|Mat4|Quat)/g, 'declare namespace $1');
filedata = filedata.replace(/\T(Vec[2-4]|Mat4|Quat)\./g, '$1.');

// "function" is really wrong name for na variable
filedata = filedata.replace(/function: \(/g, 'fn: (');

fs.writeFileSync(path.join(installPath, '../types.d.ts'), filedata);
