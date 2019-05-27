#!/bin/bash

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
/usr/src/app/node_modules/wait-for-it.sh/bin/wait-for-it mongo:27017
/usr/src/app/node_modules/wait-for-it.sh/bin/wait-for-it redis:6379
exec nodemon app.js
