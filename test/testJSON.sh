#!/bin/bash

HOST="http://127.0.0.1:2048"
END="test"
HEADER="Content-Type:application/json"
DATA=""
FILE=$(pwd)/json

printf "pinging server\n\n"
curl ${HOST}
printf "\n-------------------------\n\n"

end_of_file=0
while [[ $end_of_file == 0 ]]; do
  read -r line
  end_of_file=$?

  TMP=$(echo $line | grep -E "^>>>")
  if [ "$TMP" ]; then  
    printf "${TMP//>>>}"
    continue
  fi
  TMP=$(echo $line | grep -E "^<<<")
  if [ "$TMP" ]; then
    OUT=$(curl -i -X POST --data "${TMP//<<<}" ${HOST}/${END} --header ${HEADER})
    printf "${OUT//$'\r'/}"
  fi
done < "$FILE"
