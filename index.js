var colors = require('colors/safe');
var error = colors.red;
var info = colors.red;

var ffi = require('ffi');
var ref = require("ref");

var stringPtr = ref.refType('CString');
var intPtr = ref.refType('int');

// @TODO define more dll function mappings here!
var DFCom = ffi.Library('libDFCom', {
    'DFCComOpenIV': [ 'int', [ 'int', 'int', 'int', 'string', 'int', 'int' ] ],
    'DFCGetLastErrorNumber': [ 'int', [ 'int', 'int'] ],
    'DFCGetErrorText': [ 'void', [ 'int', 'int', 'int', stringPtr, 'int'] ],
    'DFCGetSeriennummer': ['int', ['int', 'int', intPtr, intPtr ] ],
});

var host = '192.168.27.61';
var port = 8000;
var connectionId = 1;

try {
    if (!DFCom.DFCComOpenIV(connectionId, 0, 3, host, port, 3000)) {
        throw new Error('opening communication failed');
    }

    var errorNumber = ref.alloc('int');
    var serialNumber = ref.alloc('int');

    if (!DFCom.DFCGetSeriennummer(connectionId, 254, errorNumber, serialNumber)) {
        throw new Error('cannot get serical number');
    }

    console.log(info('Serial Number: ' + serialNumber.deref()));
} catch (e) {
    var errNumber = DFCom.DFCGetLastErrorNumber(connectionId, 0);
    var errMsg = ref.alloc('CString');
    DFCom.DFCGetErrorText(connectionId, errNumber, 0, errMsg, 100);
    console.log(error('[' + errNumber + '] ' + ref.readCString(errMsg)));
    console.log(error(e));
}




