import fs from 'fs';
console.log(fs.readFileSync('embedded_view.txt', 'utf8').substring(0, 4000));
