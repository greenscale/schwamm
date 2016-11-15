all: build/schwamm.js
	@ echo "-- all done"
.PHONY: all

build/schwamm.js: libs/plankton.js temp/pure.js
	@ echo "-- linking parts ..."
	@ mkdir --parents build
	@ cat libs/plankton.js temp/pure.js > build/schwamm.js

temp/pure.js: source/schwamm.js
	@ echo "-- compiling source ..."
	@ mkdir --parents temp
	@ cat source/schwamm.js > temp/pure.js

clean:
	@ echo "-- cleaning ..."
	@ rm --force --recursive temp/
.PHONY: clean

clear: clean
	@ echo "-- clearing ..."
	@ rm --force --recursive build/
.PHONY: clear

