import { createReadStream ,rm,existsSync,rmSync } from 'fs';
import { Unzip } from 'zlib';
import { extract } from 'tar';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagename = process.env.NPM_PACKAGE_NAME.replace('@', '').replace('/', '-');
const packagefilename = `${packagename}-${process.env.NPM_PACKAGE_VERSION}.tgz`;
console.log("hello world")
if(existsSync(`${__dirname}/../package`)){
  try{
  rmSync(`${__dirname}/../package`, { recursive: true },(e)=>{});
  }catch(e){
    console.log(e);
  }
}
createReadStream(`${__dirname}/../${packagefilename}`)
  .on('end', () => {rm(`${__dirname}/../${packagefilename}`, () => {});})
  .on('error', console.log)
  .pipe(Unzip())
  .pipe(extract({
    path: `${__dirname}/../`,
  }));
