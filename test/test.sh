#!/bin/bash

./message.sh > out

diff ./base ./out
