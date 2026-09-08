#!/bin/bash
# SecretGen - Local dev server
# Usage: ./dev-server.sh [port]
#   port   default: 3000 (vercel dev's own default)
#
# Unlike most other projects in this org, SecretGen has no config.json or
# hardcoded domain to force into a "dev mode" - vercel.json's routing is
# identical locally and in production, since `vercel dev` reads it directly.
# This script just makes sure dependencies are installed before launching it.
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

PORT="${1:-3000}"

if [ ! -d "$DIR/node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install
fi

exec npx vercel dev --listen "$PORT"
