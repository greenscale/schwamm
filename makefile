cmd_mkdir := mkdir -p
cmd_rm := rm -r -f
cmd_echo := echo -e
cmd_cat := cat
cmd_tsc := tsc

all: build/schwamm.js
	@ ${cmd_echo} "-- all done"
.PHONY: all

build/schwamm.js: libs/plankton-impl.js temp/pure.js
	@ ${cmd_echo} "-- linking parts ..."
	@ ${cmd_mkdir} build
	@ ${cmd_cat} libs/plankton-impl.js temp/pure.js > build/schwamm.js

temp/pure.js: libs/plankton-decl.d.ts source/schwamm.ts
	@ ${cmd_echo} "-- compiling source ..."
	@ ${cmd_mkdir} temp
	@ ${cmd_tsc} libs/plankton-decl.d.ts source/schwamm.ts --outFile temp/pure.js

clean:
	@ ${cmd_echo} "-- cleaning ..."
	@ ${cmd_rm} temp/
.PHONY: clean

clear: clean
	@ ${cmd_echo} "-- clearing ..."
	@ ${cmd_rm} build/
.PHONY: clear

