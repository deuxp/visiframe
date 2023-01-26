const { app, BrowserWindow, ipcMain, net } = require("electron");
const path = require("path");

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    useContentSize: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      webviewTag: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Denies access to clickable links that appear in the iframe
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: "deny",
    };
  });

  const appURL = "http://localhost:3000";
  mainWindow.loadURL(appURL);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("getGreet", () => {
  mainWindow.webContents.send("sendGreet", "hello from main");
});

////////////////////////////
// helper: handleRequest //
//////////////////////////

const handleRequest = (url, cb) => {
  const request = net.request(url);
  request.on("response", response => {
    const data = [];
    response.on("data", chunk => {
      data.push(chunk);
    });
    response.on("end", () => {
      const json = Buffer.concat(data).toString();
      cb(json);
    });
  });
  request.end();
};

/////////////////////////////
// GET: inital menu items //
///////////////////////////
let checklist; // conditional check for menu select
ipcMain.handle("getMenuItems", () => {
  const url = `https://visii-api-production.up.railway.app/api/login/projects`;
  handleRequest(url, response => {
    try {
      const data = JSON.parse(response);
      checklist = data.map(video => video.uri);
      mainWindow.webContents.send("sendMenuItems", response);
    } catch (error) {
      console.log(error);
      mainWindow.webContents.send("sendMenuItems", "[]");
    }
  });
});

///////////////////////////////////
// GET: list of Embedded Videos //
/////////////////////////////////

ipcMain.handle("getEmbeds", (event, select) => {
  if (checklist.includes(select)) {
    const url = `https://visii-api-production.up.railway.app/api/login/videos/${select}`;
    handleRequest(url, response => {
      mainWindow.webContents.send("embeddedVideoList", response);
    });
  }
});

/////////////////////////////
// RESIZE: Browser Window //
///////////////////////////

ipcMain.handle("resizeWindow", (event, data) => {
  const { width, height } = JSON.parse(data);
  mainWindow.setSize(width, height);
  mainWindow.center();
});

// TODO:
// when getting the intial list of vids, populate a list here that is
// the checklist, for what is allowed to be passed
// then make a conditional guard clause checking that one of the valid values are true
