#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Navigate to client directory
process.chdir(path.join(__dirname));

// Build the application
console.log('Building the application...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build complete! The site is ready to deploy.');