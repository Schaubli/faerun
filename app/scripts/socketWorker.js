importScripts('/libs/socketio/socket.io-1.4.5.js');
importScripts('/scripts/faerun-common.js');

var socket = socket = io.connect('http://localhost:8080/underdark');

socket.on('initresponse', function(msg) {
    postMessage({ cmd: 'initresponse', message: msg.data });
});

socket.on('loadresponse', function(msg) { 
    var arr = Faerun.csvToArray(msg.data, msg.data_types);
    for(var i = 0; i < arr.length; i++) arr[i] = arr[i].buffer;
    postMessage({ cmd: 'loadresponse', message: { data: arr, data_types: msg.data_types, maps: msg.maps } });
});

socket.on('loadmapresponse', function(msg) { 
    var arr = Faerun.csvToArray(msg.data, msg.data_types);
    for(var i = 0; i < arr.length; i++) arr[i] = arr[i].buffer;
    postMessage({ cmd: 'loadmapresponse', message: { data: arr, data_types: msg.data_types } });
});

onmessage = function(e) {
    var cmd = e.data.cmd;
    var message = e.data.message;
    
    socket.emit(cmd, message);
}

