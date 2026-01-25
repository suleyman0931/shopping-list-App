#!/bin/bash
set -e

echo "Node version:"
node --version

echo "NPM version:"
npm --version

echo "Installing dependencies..."
npm ci --production=false

echo "Checking if react-scripts is available..."
npx react-scripts --version

echo "Building the application..."
CI=false npm run build

echo "Build completed successfully!"
echo "Build directory contents:"
ls -la build/