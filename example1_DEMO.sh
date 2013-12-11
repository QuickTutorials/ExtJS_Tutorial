#!/usr/bin/env bash

wget http://cdn.sencha.io/ext-4.0.7-gpl.zip
unzip ext*gpl.zip -d example1/
cd example1
python -m SimpleHTTPServer 
firefox http://localhost:8000/ext-4.0.7-gpl/examples/desktop/desktop.html
cd -

