#!/bin/bash

u=0
p=0

if [ "$1" == "-h" ]; then
   echo "./launch [-u] [-p]"
   echo ""
   echo "Start szerver"
   echo ""
   echo "-u   update"
   echo "-p   pull"
   exit 0
fi
for var in "$@"
do
    if [ "$var" == "-p" ]; then
      p=1
    fi
    if [ "$var" = "-u" ]; then
      u=1
    fi
done

if [ $p -eq 1 ]; then
   git pull origin master
fi
if [ $u -eq 1 ]; then
    npm update
fi

npm start
