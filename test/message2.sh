#!/bin/bash

HOST="http://127.0.0.1:2048"
END="contact/message"
HEADER="Content-Type:application/json"
DATA=""

printf "Sending valid json object\n\n"
DATA='{"name":"jack","email":"jack@jungle","message":"HI"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"


