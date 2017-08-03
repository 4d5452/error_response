#!/bin/bash

HOST="http://127.0.0.1:2048"
END="contact/message"
HEADER="Content-Type:application/json"
DATA=""

printf "pinging server\n\n"
curl ${HOST}
printf "\n-------------------------\n"

printf "Sending bad json object\n\n"
DATA='{"jack"="me"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Causing 'Unexpected end of JSON input' during request with curl\n\n"
DATA='{"jack": "me"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request without 'name, email, or message' key(s)\n\n"
DATA='{"test":"name"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request without 'email or message' key(s)\n\n"
DATA='{"name":"jack"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request without 'message' key(s)\n\n"
DATA='{"name":"jack","email":"jack@jungle"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request with name less than minLength (2)\n\n"
DATA='{"name":"j","email":"jack@jungle","message":"HI"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request with name greater than maxLength (24)\n\n"
DATA='{"name":"ABCDEFGHIJKLMNOPQRSTUVWXYZ","email":"jack@jungle","message":"HI"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request with name that fails regex\n\n"
DATA='{"name":"*Jack","email":"jack@jungle","message":"HI"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request with name greater than maxLength and fails regex validation\n\n"
DATA='{"name":"*ABCDEFGHIJKLMNOPQRSTUVWXYZ","email":"jack@jungle","message":"HI"}'
curl -X POST --data ${DATA} ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request with invalid objects at multiple levesl\n\n"
DATA='{"name":"jack","email":"jack@jungle","message":"HI","business":{"address":{"street":"So","state":"VA"}}}'
curl -X POST --data "$DATA" ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request without non-required key:value\n\n"
DATA='{"name":"jack","email":"jack@jungle","message":"HI","business":{"name":"JUICE, LLC","address":{"street":"Someplace USA","state":"VA"}}}'
curl -X POST --data "$DATA" ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending request with invalid non-required key:value\n\n"
DATA='{"name":"jack","email":"jack@jungle","message":"HI","business":{"name":"JUICE, LLC","position":"o","address":{"street":"Someplace USA","state":"VA"}}}'
curl -X POST --data "$DATA" ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

printf "Sending valid json object\n\n"
DATA='{"name":"jack","email":"jack@jungle","message":"HI","business":{"name":"JUICE, LLC","address":{"street":"Someplace USA","state":"VA"}}}'
curl -X POST --data "$DATA" ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"


printf "Sending valid json object with extra keys not supported\n\n"
DATA='{"name":"jack","email":"jack@jungle","message":"HI","business":{"name":"JUICE, LLC","address":{"street":"Someplace USA","state":"VA"}}, "garbage":"key value pair"}'
curl -X POST --data "$DATA" ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"

