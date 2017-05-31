const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {globalShortcut} = require('electron')
var win


var winState = true;
function changeState(){
	if(winState){
		win.hide();		
	}else{	
		win.show();
	}
}


function createWindow () {
  win = new BrowserWindow({width: 700, height: 420, center: true, frame: false})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools();
  
  win.on('closed', () => {
    win = null
  }) 
  win.on('hide', () => {
    winState = false;
  } )
  win.on('show', () => {
    winState = true;
  } )

}

 
app.on('ready', () => {
	createWindow();
globalShortcut.unregisterAll()
console.log(globalShortcut.isRegistered('F2'))
const ret = globalShortcut.register('F2', () => {
    changeState();
  })
})



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
  }
})
