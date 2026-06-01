const fs = require('fs');
const lines = fs.readFileSync('src/pages/modules/LoopsModule.jsx', 'utf8').split('\n');
lines.forEach((line, i) => {
    if (line.includes('`')) console.log(i + 1, line.trim());
});
