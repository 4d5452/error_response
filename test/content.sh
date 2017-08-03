#!/bin/bash

HOST="http://127.0.0.1:2048"
END="content"
HEADER="Accept:application/json"

printf "pinging server\n\n"
curl ${HOST}
printf "\n-------------------------\n"


printf "Requesting OPTIONS from the endpoint to retreive the contentType access type\n\n"
curl -X POST --data "$DATA" ${HOST}/${END} --header ${HEADER}
printf "\n-------------------------\n"


printf "Requesting content definition from the content endpoint using the type returned from the above OPTIONS request\n\n"
curl ${HOST}/${END}/ --header ${HEADER}
printf "\n-------------------------\n"


