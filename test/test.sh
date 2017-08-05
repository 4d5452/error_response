#!/bin/bash

./message.sh > out

diff -I "^Date" ./base ./out
