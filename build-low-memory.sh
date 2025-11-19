#!/bin/bash

# Low Memory Build Script for Kamp
# This script helps build the app with limited memory by:
# 1. Clearing caches
# 2. Using maximum heap size
# 3. Disabling source maps
# 4. Building in production mode

echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

echo "🔧 Setting environment variables..."
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=8192"
export NEXT_TELEMETRY_DISABLED=1

echo "📦 Building with optimizations..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "Run 'npm start' to start the production server"
else
    echo "❌ Build failed. Try these alternatives:"
    echo ""
    echo "1. Skip build and use dev mode:"
    echo "   npm run dev"
    echo ""
    echo "2. Increase system swap:"
    echo "   sudo swapon --show"
    echo ""
    echo "3. Close other applications to free memory"
    echo ""
    echo "4. Use a machine with more RAM (8GB+ recommended)"
fi
