build/schwamm.js: temp/libs.js temp/pure.js
	cat temp/libs.js temp/pure.js > build/schwamm.js

temp/libs.js: \
	../plankton/base/build/logic.js \
	../plankton/call/build/logic.js \
	../plankton/object/build/logic.js \
	../plankton/path/build/logic.js \
	../plankton/file/build/logic.js \
	../plankton/args/build/logic.js
	cat \
		../plankton/base/build/logic.js \
		../plankton/call/build/logic.js \
		../plankton/object/build/logic.js \
		../plankton/path/build/logic.js \
		../plankton/file/build/logic.js \
		../plankton/args/build/logic.js \
	> temp/libs.js

temp/pure.js: source/schwamm.js
	cat source/schwamm.js > temp/pure.js
	
