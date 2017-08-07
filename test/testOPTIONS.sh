#!/bin/bash

HOST="http://127.0.0.1:2048"
END="contact/message"
HEADER="Content-Type:application/json"
DATA=""
FILE=$(pwd)/

printf "pinging server\n\n"
curl ${HOST}
printf "\n-------------------------\n\n"

OUT=$(curl -i -X OPTIONS ${HOST}/${END} --header ${HEADER})
printf "${OUT//$'\r'/}"
printf "\n-------------------------\n\n"
