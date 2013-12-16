#!/usr/bin/env bash

python -m SimpleHTTPServer 8001 &
node basic-server.js &
node integration-proxy.js  &
node watchThisDir.js &
