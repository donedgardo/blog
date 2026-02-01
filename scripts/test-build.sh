#!/bin/bash
set -e
echo "🧪 Testing build..."
npm run build 2>&1 | tail -20
echo "✅ Build passed!"
