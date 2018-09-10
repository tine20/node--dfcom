# POC: use DFCom lib with NodeJS base on node-ffi

## Usage:
### get dependencies from npm
    npm install
    
### compile libDFcom
    sudo apt-get install g++
    cd /usr/src
    curl -o Datafox_SDK_Linux_04.03.10.zip https://www.datafox.de/downloads-evo-line-28.de.html?file=files/Datafox_Devices/Downloads_Geraete_Zubehoer/001_MasterIV-Software/Datafox_SDK_Linux_04.03.10.zip
    unzip Datafox_SDK_Linux_04.03.10.zip
    cd Release_DatafoxLibraryIVSource/DatafoxLibraryIV
    make all

### place libDFCom.so in library path
    export LD_LIBRARY_PATH=/usr/src/Release_DatafoxLibraryIVSource/DatafoxLibraryIV/bin
    
### run the example ;-)
    nodejs index.js

### in case of error: could not locate the bindings file
    sudo npm install -g node-gyp
    $ cd node_modules/ffi
    $ node-gyp rebuild 
    
## Pitfalls
### location of DFCom.ini
___NOTE___: you need to run node as root so DFCom.ini can be created next to the node binary. In my case:
    
    /usr/bin/DFCom.ini

## Rethink
node-ffi is known to be slow. Moreover each function needs to be defined manually in the mappings. 
It might be worth checking node-gyp with swig.

As the libDFCom function signatures reveal the c++ pointer background, it might be an idea not to use the lib but
directly communicate via socket OR to wrap the whole API to have js friendly methods.

