#!/usr/bin/env bash
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
cd "$root"
pnpm="npx --yes pnpm@9"
sed -i "/virtual:pwa-register/d;/registerSW/d" src/main.ts
$pnpm install --frozen-lockfile --ignore-scripts
NODE_OPTIONS=--max-old-space-size=6144 $pnpm exec vite build
public="$root/acde/public"
mkdir -p "$public"
find "$public" -mindepth 1 -delete
cp -r "$root/dist/." "$public/"
find "$public" -name '*.map' -delete
cp "$root/acde/acde-compat.js" "$public/acde-compat.js"
find "$public" -name '*.html' -exec sed -i 's#<head>#<head><script src="/acde-compat.js"></script>#' {} +
