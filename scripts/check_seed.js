const fs = require('fs');
const content = fs.readFileSync('src/data/seedData.ts', 'utf8');

// Match all product declarations in ALL_INITIAL_PRODUCTS
const matches = [];
const regex = /id:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*slug:\s*["']([^"']+)["']/g;
let m;
while ((m = regex.exec(content)) !== null) {
  matches.push({ id: m[1], name: m[2], slug: m[3] });
}
console.log('Found', matches.length, 'products:');
matches.forEach(p => console.log(p.id, '=>', p.name));
