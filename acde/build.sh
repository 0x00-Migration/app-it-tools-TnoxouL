#!/usr/bin/env bash
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
cd "$root"
pnpm="npx --yes pnpm@9"
$pnpm install --frozen-lockfile --ignore-scripts
NODE_OPTIONS=--max-old-space-size=6144 $pnpm exec vite build
public="$root/acde/public"
mkdir -p "$public"
find "$public" -mindepth 1 -delete
cp -r "$root/dist/." "$public/"
find "$public" -name '*.map' -delete
python3 "$root/../../packages/runtime-shims/install.py" "$public"
