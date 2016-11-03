all: info build/schwamm.js
	@ echo "-- all done"
.PHONY: all

info:
	@ echo "-- please make sure you have all plankton libs updated (if so, fine - this message appears anyhow)"
.PHONY: info

build/schwamm.js: temp/libs.js temp/pure.js
	@ echo "-- linking parts ..."
	@ mkdir -p build
	@ cat temp/libs.js temp/pure.js > build/schwamm.js

temp/libs.js: \
	../plankton/base/build/logic.js \
	../plankton/call/build/logic.js \
	../plankton/object/build/logic.js \
	../plankton/path/build/logic.js \
	../plankton/file/build/logic.js \
	../plankton/args/build/logic.js
	@ echo "-- gathering libs ..."
	@ mkdir -p temp
	@ cat \
		../plankton/base/build/logic.js \
		../plankton/call/build/logic.js \
		../plankton/object/build/logic.js \
		../plankton/path/build/logic.js \
		../plankton/file/build/logic.js \
		../plankton/args/build/logic.js \
	> temp/libs.js

temp/pure.js: source/schwamm.js
	@ echo "-- compiling source ..."
	@ cat source/schwamm.js > temp/pure.js

clean:
	@ echo "-- cleaning ..."
	@ rm --force --recursive temp/
.PHONY: clean

clear: clean
	@ echo "-- clearing ..."
	@ rm --force --recursive build/
.PHONY: clear

