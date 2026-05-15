const fs = require('fs');
const path = require('path');

const dirs = [
  'server/config',
  'server/models',
  'server/routes',
  'server/controllers',
  'public/css',
  'public/js'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Carpeta creada: ${dir}`);
  }
});

console.log('✓ Estructura de carpetas lista');
