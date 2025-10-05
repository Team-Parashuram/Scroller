#!/bin/bash

# AI Chat Test Script
# Run this after starting the dev server with 'pnpm dev'

echo "🧪 Testing AI Chat Fix..."
echo ""

# Test 1: Check if API route exists
echo "✓ Test 1: Checking /api/ai endpoint..."
response=$(curl -s http://localhost:3000/api/ai)
if echo "$response" | grep -q "API Key found"; then
    echo "  ✅ API endpoint working correctly"
    echo "  Response: $response"
else
    echo "  ❌ API endpoint failed"
    echo "  Response: $response"
    exit 1
fi

echo ""
echo "✓ Test 2: Checking response format..."
if echo "$response" | grep -q '"status":200'; then
    echo "  ✅ Response has correct status field"
else
    echo "  ❌ Response missing status field"
    exit 1
fi

if echo "$response" | grep -q '"data"'; then
    echo "  ✅ Response has data field"
else
    echo "  ❌ Response missing data field"
    exit 1
fi

echo ""
echo "✅ All API tests passed!"
echo ""
echo "📋 Next steps:"
echo "  1. Open http://localhost:3000/ask-ai in your browser"
echo "  2. Check console for 'AI service initialized' message"
echo "  3. Try sending a test message"
echo ""
