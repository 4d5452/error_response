#!/bin/bash
# clear the screen
clear
# Start the nodejs server and kill after test are complete
CUR_DIR=$(pwd)
HOST='127.0.0.1'
PORT=2048
SERVER=$CUR_DIR/"server.js"
BUNYAN=$CUR_DIR/"node_modules/.bin/bunyan"

TIMER=1 ### secs
START=$(date +"%s")
END=$(expr $START + $TIMER)

# Log directory and active logs: Volatile, log files may change.
LOG_DIR=$CUR_DIR/"logs"
ERROR=$LOG_DIR/"error.log"
INFO=$LOG_DIR/"info.log"
DEBUG=$LOG_DIR/"debug.log"

# if a file is open by a running process the command node is true,
#  inform user and terminate.
if [[ `lsof -c node | grep "$LOG_DIR"` ]]; then
  echo "Logs open by another process.  Ending test!"
  exit
else
  echo "Clearing logs"
  rm $ERROR $INFO $DEBUG
  touch $ERROR $INFO $DEBUG
fi 

# Start node server
# $! := process id of job most recently placed into the background
# $? := exit status recently executed foreground process
# man bash (search for special parameters)
# start node with server.js and store $! $? output to PROC
#  PROC[0] = $!; PROC[1] = $?
IFS=' ' read -ra PROC < <(exec node $SERVER & echo $! $?)

# give node time to start
TIME=$(date +"%s")
while [ $TIME -lt $END ]; do
  sleep 1
  TIME=$(date +"%s")
done

if [ !${PROC[1]} ]; then
  # status of 0: server started
  echo "Node Server Process ID :=" ${PROC[0]}
else
  exit 
fi

# Check for active connection on port
printf "\nTesting connection\n"
nc -znv $HOST $PORT

# Check for http response at server index '/'
printf "\nPing server\n"
curl $HOST:$PORT -D -
printf "\n"

# GET login page
printf "\nGet Login Page\n"
curl $HOST:$PORT/login -D -
printf "\n"

# POST login page: missing key => 'password'
printf "\nPOST Login Page\n"
curl -H "Content-Type: application/json" -X POST -d \
  '{"username"' $HOST:$PORT/login -D -
printf "\n"

# POST login page (bad): username:password
printf "\nPOST Login Page (bad)\n"
curl -H "Content-Type: application/json" -X POST -d \
  '{"username":"JIM", "password":"MIJ"}' $HOST:$PORT/login -D -
printf "\n"

# POST login page (good): username:password
printf "\nPOST Login Page (good)\n"
curl -H "Content-Type: application/json" -X POST -d \
  '{"username":"JIM", "password":"123456"}' $HOST:$PORT/login -D -
printf "\n"

# Request known invalid endpoint
printf "\nRequesting non-existent page from server\n"
curl $HOST:$PORT/bad-request.html -D -
printf "\n"

printf "\nPrinting logs\n"
printf "\nError Log\n"
$BUNYAN $ERROR

printf "\nInfo Log\n"
$BUNYAN $INFO

# kill server process
printf "\nKilling Process with ID := %s\n" "${PROC[0]}"
kill ${PROC[0]}
