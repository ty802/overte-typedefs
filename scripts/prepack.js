import fs from 'fs';
import path from 'path';
import * as url from 'url';
let __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let filedata = fs.readFileSync(path.join(__dirname, '../types.d.ts'), 'utf8');
fs.renameSync(path.join(__dirname, '../types.d.ts'), path.join(__dirname, '../types.d.ts.bak'));
let regex = /(: void)/gmi
filedata = filedata.replace(regex, '');
filedata = filedata.replace(/([a-zA-Z])~([a-zA-Z])/g, '$1.$2');
fs.writeFileSync(path.join(__dirname, '../types.d.ts'), filedata);