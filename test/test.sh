#!/bin/bash

./testJSON.sh > out
./testOPTIONS.sh >> out
node ./testCLIENT.js >> out

diff -I "^[dD]ate" ./base ./out
