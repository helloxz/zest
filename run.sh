#!/bin/sh
set -e

SCRIPT_DIR=$(pwd)

if [ -f "$SCRIPT_DIR/.env" ]; then
  set -a
  . "$SCRIPT_DIR/.env"
  set +a
fi

ensure_runtime_dirs() {
  mkdir -p "$SCRIPT_DIR/data/db"
  mkdir -p "$SCRIPT_DIR/data"
  if [ ! -f "$SCRIPT_DIR/data/reset.txt" ]; then
    touch "$SCRIPT_DIR/data/reset.txt"
  fi
}

ensure_build_artifacts() {
  if [ ! -f "$SCRIPT_DIR/dist/index.js" ]; then
    sh "$SCRIPT_DIR/build_frontend.sh"
  fi
}

ensure_runtime_dirs

if [ "$1" = "dev" ]; then
  bun run dev
  exit 0
fi

ensure_build_artifacts
bun run db:push
bun run ./dist/index.js
