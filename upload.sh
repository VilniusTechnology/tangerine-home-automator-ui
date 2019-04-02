#!/bin/sh

rsync -avz --progress --exclude 'node_modules' --exclude '.idea' ./dist/tangerine-home-automator-ui/*  tangerine@tangerine.local:/home/tangerine/nest-ui/tangerine-home-automator-ui
