export PATH=$PATH:./node_modules/.bin/
export IGNORE_TEST_WIN32=

type babel && babel src --out-dir lib --presets es2015 || echo 'warn: babel failed'
