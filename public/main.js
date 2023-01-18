const { app, BrowserWindow, ipcMain, net } = require("electron");
const path = require("path");

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    useContentSize: true,
    frame: false,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
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

  // Automatically open Chrome's DevTools in development mode.
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

ipcMain.handle("getMenuItems", () => {
  // const url = "http://127.0.0.1:8080/api/login/projects";
  // handleRequest(url, response => {
  //   console.log(response);
  //   mainWindow.webContents.send("sendMenuItems", response);
  // });
  const data = [
    {
      name: "sphere",
      uri: "14509091",
    },
    {
      name: "maze",
      uri: "14509087",
    },
  ];
  const mockData = JSON.stringify(data);
  mainWindow.webContents.send("sendMenuItems", mockData);
});

///////////////////////////////////
// GET: list of Embedded Videos //
/////////////////////////////////

ipcMain.handle("getEmbeds", (event, select) => {
  const url = `http://127.0.0.1:8080/api/login/videos/${select}`;
  handleRequest(url, response => {
    // console.log(response);
    mainWindow.webContents.send("embeddedVideoList", response);
  });
});

// TODO:
// when getting the intial list of vids, populate a list here that is
// the checklist, for what is allowed to be passed
// then make a conditional guard clause checking that one of the valid values are true
