#!/bin/sh

git checkout --orphan gh-pages

cd app
yarn build
cp -R dist ../pages/

git --work-tree ../pages/ add --all
git --work-tree ../pages/ commit -m gh-pages
git push origin HEAD:gh-pages --force
rm -rf dist
rm -rf ../pages
git checkout -f main
git branch -D gh-pages