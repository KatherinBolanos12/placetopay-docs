#!/bin/bash

API_LOCATION="$PWD/src/app/api/keystatic/[...params]/route.ts"
mv $API_LOCATION $API_LOCATION.bak

UI_LOCATION="$PWD/src/pages/keystatic/[[...params]].ts"
mv $UI_LOCATION $UI_LOCATION.bak
