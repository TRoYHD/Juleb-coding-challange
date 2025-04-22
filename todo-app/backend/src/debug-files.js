// debug-files.js
const fs = require('fs');
const path = require('path');

// List of paths to check
const paths = [
  '/app/public',
  '/app/public/index.html',
  '/app/dist',
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public/index.html'),
  path.join(__dirname, '..', 'public'),
  path.join(__dirname, '..', 'public/index.html')
];

console.log('Current directory:', __dirname);
console.log('Checking paths:');

// Check each path
paths.forEach(p => {
  try {
    const exists = fs.existsSync(p);
    console.log(`${p}: ${exists ? 'EXISTS' : 'NOT FOUND'}`);
    
    if (exists) {
      const stats = fs.statSync(p);
      console.log(`  - Is directory: ${stats.isDirectory()}`);
      
      if (stats.isDirectory()) {
        console.log('  - Contents:');
        const files = fs.readdirSync(p);
        files.forEach(file => {
          console.log(`    - ${file}`);
        });
      }
    }
  } catch (err) {
    console.log(`${p}: ERROR - ${err.message}`);
  }
});