#!/bin/bash
# Build and deploy script for video editor
# Usage: ./scripts/build.sh [composition-id]

set -e

COMPOSITION=${1:-"MyVideo"}
OUTPUT_DIR="./dist"

echo "Building Remotion bundle..."
npx remotion bundle src/index.ts --config.outputDir=$OUTPUT_DIR

echo "Rendering $COMPOSITION..."
npx remotion render src/index.ts $COMPOSITION $OUTPUT_DIR/output.mp4

echo "Done! Output: $OUTPUT_DIR/output.mp4"
