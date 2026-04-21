#!/usr/bin/env sh
set -eu

echo "[INFO] prepare output directory"
rm -rf output
mkdir -p output

echo "[INFO] export current HEAD files to output/"
# Copy current repository contents (tracked files at HEAD) into output/
git archive --format=tar HEAD | tar -x -C output

echo "[INFO] remove workflow files from output (PAT scope-safe)"
rm -rf output/.github/workflows

echo "[INFO] output prepared"
