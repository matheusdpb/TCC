'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var mainWindow = null;
var ipc = require('electron').ipcMain;

ipc.on('close-main-window', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800,
        webPreferences:{
          nodeIntegration:true
        }
    });

    mainWindow.loadFile('index.html')
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

var os = require('os');
var {dialog} = require('electron');

ipc.on('open-file-dialog-for-file', function (event) {
    if(os.platform() === 'linux' || os.platform() === 'win32'){
      //  dialog.showOpenDialog({
      //      properties: ['openFile']
      //  }, function (files) {
      //     if (files) event.sender.send('selected-file', files[0]);
      //  });
      dialog.showOpenDialog({
        properties: ['openFile']
     }).then((data) => {
        // console.log(data.filePaths);
        event.sender.send('selected-file', data.filePaths);
     });
   } else {
      //  }, function (files) {
      //      if (files) event.sender.send('selected-file', files[0]);
      //  });
      dialog.showOpenDialog({
        properties: ['openFile','openDirectory']
     }).then((data) => {
        // console.log(data.filePaths);
        event.sender.send('selected-file', data.filePaths);
     });
   }});

   