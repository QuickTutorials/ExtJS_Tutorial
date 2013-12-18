#!/usr/bin/env bash

node static-server.js &
node basic-server.js &
node integration-proxy.js  &
node watchThisDir.js &
