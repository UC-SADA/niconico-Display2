"use strict";
const electron = require('electron');
const elc_app = electron.app;
const elc_BrowserWindow = electron.BrowserWindow;
const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const extend = require('util')._extend
const os = require('os');
const interfaces = os.networkInterfaces();
const addresses = Object.keys(interfaces)
  .reduce((results, name) => results.concat(interfaces[name]), [])
  .filter((iface) => iface.family === 'IPv4' && !iface.internal)
  .map((iface) => iface.address);


function getLocalAddress() {
    var ifacesObj = {}
    ifacesObj.ipv4 = [];
    ifacesObj.ipv6 = [];
    var interfaces = os.networkInterfaces();

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        ifacesObj.ipv4.push({name:dev, address:details.address})
                    break;
                    case "IPv6":
                        ifacesObj.ipv6.push({name:dev, address:details.address})
                    break;
                }
            }
        });
    }
    return ifacesObj;
};
http.listen(2525, function(){
  console.log(addresses + ":2525");
});

var mainWindow = null;
var mainWindow2 = null;
elc_app.on('ready', function () {
    var size = electron.screen.getPrimaryDisplay().size;
    mainWindow = new elc_BrowserWindow({
        left: 0,
        top: 0,
        width: 400,
        height: size.height,
        frame: true,
        show: true,
        transparent: false,
        resizable: true,
        webPreferences: {nodeIntegration: false}
    });
//    mainWindow.setIgnoreMouseEvents(true);
//    mainWindow.maximize();
//    mainWindow.setAlwaysOnTop(true);
    mainWindow.loadURL("http://" + addresses + ":2525/controller");
//    mainWindow.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
            });

    mainWindow2 = new elc_BrowserWindow({
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
        frame: false,
        show: true,
        transparent: true,
        resizable: true,
        webPreferences: {nodeIntegration: false}
    });
    mainWindow2.setIgnoreMouseEvents(true);
    mainWindow2.maximize();
    mainWindow2.setAlwaysOnTop(true);
    mainWindow2.loadURL("http://localhost:2525/display");
//    mainWindow2.openDevTools();
    mainWindow2.on('closed', function () {
    mainWindow2 = null;
      });

});

//入力側画面指定
app.use("/controller",express.static(path.join(__dirname, 'public')))

//出力側画面指定
app.get("/display", function(req, res){
  res.sendFile(__dirname + '/index_nico-Display.html');
});

require('console-stamp')(console, '[HH:MM:ss.l]')

app.get('/comment', function (req, res) {
  const msg = extend({}, req.query)
  io.emit('comment', msg);
  res.end()
})

app.get('/like', function (req, res) {
  const msg = extend({}, req.query);
  io.emit('like', msg)
  res.end()
})
