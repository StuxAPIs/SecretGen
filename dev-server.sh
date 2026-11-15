#!/bin/bash
# SecretGen - Local dev server
# Usage: ./dev-server.sh [port] [--lan]
#   port    default: 3000 (vercel dev's own default)
#   --lan   listen on all interfaces so phones/tablets on your network can
#           connect (prints the addresses to open); default is 127.0.0.1 only
#
# Unlike most other projects in this org, SecretGen has no config.json or
# hardcoded domain to force into a "dev mode" - vercel.json's routing is
# identical locally and in production, since `vercel dev` reads it directly.
# This script just makes sure dependencies are installed before launching it.
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

PORT=3000
HOST=127.0.0.1

while [ $# -gt 0 ]; do
    case "$1" in
        --lan) HOST=0.0.0.0; shift ;;
        ''|*[!0-9]*) echo "Unknown option: $1" >&2; echo "Usage: ./dev-server.sh [port] [--lan]" >&2; exit 1 ;;
        *) PORT="$1"; shift ;;
    esac
done

if [ ! -d "$DIR/node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install
fi

if [ "$HOST" = "0.0.0.0" ]; then
    # This machine's IPv4 addresses (Windows, macOS or Linux), minus loopback
    case "$OSTYPE" in
        msys*|cygwin*|win32*) ADDRS="$(ipconfig | awk -F': *' '/IPv4/{print $2}' | tr -d '\r')" ;;
        darwin*) ADDRS="$(ifconfig | awk '/inet /{print $2}')" ;;
        *) ADDRS="$(hostname -I 2>/dev/null)" ;;
    esac
    echo "On your local network (--lan), open one of these on the other device:"
    for a in $ADDRS; do
        case "$a" in 127.*|'') ;; *) echo "    http://$a:$PORT" ;; esac
    done
    echo "  (usually the 192.168.x.x one; allow Node through the firewall if asked)"
fi
exec npx vercel dev --listen "tcp://$HOST:$PORT"
