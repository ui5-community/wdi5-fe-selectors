#!/bin/env bash

set -x
set -e

ROOT_DIR=`pwd`
WORK_DIR=tmp/testCAPBookshop

if [ -d ${WORK_DIR} ]; then

  cd ${WORK_DIR}
  cd service

else

  mkdir -p ${WORK_DIR}
  cd ${WORK_DIR}

  npm init -y

  npm init -w dk -y
  npm add -w dk @sap/cds-dk

  npm init -w service -y

  cd service
  rm package.json

  npx cds init
  npx cds add sample

  npm add ${ROOT_DIR} || true

  ln -s ${ROOT_DIR}/test/testCAPBookshop.js .

  npm init wdi5@latest

  rm webapp/test/e2e/*.test.js
  ln -s ${ROOT_DIR}/test/CAPBookshop.test.js  webapp/test/e2e

fi

rm webapp/test/e2e/*.js
cp ${ROOT_DIR}/test/*.js  webapp/test/e2e

PORT=8080 ../node_modules/.bin/cds run &
CDSPID=$!
echo "Started process with PID ${CDSPID}"

export wdi5_username="alice"
export wdi5_password=""

set +e

npm run wdi5
#../node_modules/.bin/wdio run ./webapp/test/e2e/wdio.conf.js --headless
RC=$?

# clean up
echo Terminate process with PID $CDSPID
kill -s SIGUSR2 $CDSPID

if [ $RC -ne 0 ]; then
  echo "Test failed, rc:${RC}"
  exit $RC
else
  echo "Test succeeded, rc:${RC}"
fi
