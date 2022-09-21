'use strict';

/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const DiscordRPC = require('../');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 340,
//     height: 380,
//     resizable: false,
//     titleBarStyle: 'hidden',
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });

//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'index.html'),
//     protocol: 'file:',
//     slashes: true,
//   }));

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   app.quit();
// });

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });

// Set this to your Client ID.
const clientId = '1021880095545237554';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc) {
    return;
  }

  // const boops = await mainWindow.webContents.executeJavaScript('window.boops');

  // You'll need to have snek_large and snek_small assets uploaded to
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  rpc.setActivity({
    details: `sern handler`,
    state: 'INSTALL CLI TO START',
    startTimestamp,
    largeImageKey: 'sern',
    largeImageText: 'sern',
    smallImageKey: 'rpc-verify',
    smallImageText: 'rpc-verify',
    instance: false,
    buttons: [
      {
        label: `sern handler (v 1.0.0)`,
        url: `https://sern-handler.js.org/`
      },
      {
        label: `Discord Server`,
        url: `https://discord.gg/DwbF5H5JgQ`
      }
    ]
  });
}

rpc.on('ready', () => {
  setActivity();
  console.log('ready')
  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);
