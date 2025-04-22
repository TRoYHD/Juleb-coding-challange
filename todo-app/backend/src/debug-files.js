// debug-container.js
const fs = require('fs');
const path = require('path');

console.log('=== Docker Container File Check ===');
console.log('Current directory:', __dirname);
console.log('Parent directory:', path.resolve(__dirname, '..'));

// Check public directory
const publicPath = path.resolve(__dirname, '..', 'public');
console.log(`\nChecking ${publicPath}:`);
if (fs.existsSync(publicPath)) {
  console.log('✅ Directory exists');
  const files = fs.readdirSync(publicPath);
  console.log('Files:', files);
  
  // Check index.html
  const indexPath = path.join(publicPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists');
    console.log('Content preview:', fs.readFileSync(indexPath, 'utf8').slice(0, 200) + '...');
  } else {
    console.log('❌ index.html NOT FOUND');
  }
  
  // Check static directory
  const staticPath = path.join(publicPath, 'static');
  if (fs.existsSync(staticPath)) {
    console.log('✅ static directory exists');
    console.log('Static files:', fs.readdirSync(staticPath));
  } else {
    console.log('❌ static directory NOT FOUND');
  }
} else {
  console.log('❌ Directory NOT FOUND');
}