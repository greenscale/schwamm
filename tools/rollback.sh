#!/bin/bash

path_src=build/schwamm.js
path_dst=~/programme/schwamm/schwamm.js
path_bak=~/programme/schwamm/schwamm.js.bak

rm --force ${path_dst}
cp ${path_bak} ${path_dst}

