import fs from 'fs';
import path from 'path';
import * as url from 'url';
let __dirname = url.fileURLToPath(new URL('.', import.meta.url));
fs.renameSync(path.join(__dirname, '../types.d.ts.bak'), path.join(__dirname, '../types.d.ts'));
