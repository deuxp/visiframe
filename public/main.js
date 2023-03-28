const { app, BrowserWindow, ipcMain, net } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    useContentSize: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      webviewTag: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // moved to listener..
  // Denies access to clickable links that appear in the iframe
  // mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  //   return {
  //     action: "deny",
  //   };
  // });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
};

app.enableSandbox(); // enabled globally
app.whenReady().then(() => {
  createWindow();

  // session
  //   .fromPartition("")
  //   .setPermissionRequestHandler((webContents, permission, callback) => {
  //     return callback(false);
  //   });

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

/////////////////////////
// Security listeners //
///////////////////////

// if a new webview is loaded: prevent event
app.on("web-contents-created", (event, contents) => {
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;

    // prevent the event
    event.preventDefault();
  });
});

// listens for page navigation & stops
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    event.preventDefault();
  });
});

app.on("web-contents-created", (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    event.preventDefault();
    return { action: "deny" };
  });
});

////////////////////////////
// helper: handleRequest //
//////////////////////////

// function validateSender(frame) {
//   // Value the host of the URL using an actual URL parser and an allowlist
//   if (new URL(frame.url).host === "https://visii-api-production.up.railway.app")
//     return true;
//   return false;
// }

function handleRequest(url, cb) {
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
  request.on("error", () => {
    console.log("Something went wrong with the internet");
    cb(null);
  });
  request.end();
}

/////////////////////////////
// GET: inital menu items //
///////////////////////////
let checklist; // conditional check for menu select
ipcMain.handle("getMenuItems", () => {
  const url = "http://localhost:8080/api/projects";
  // const url = `https://visii-api-production.up.railway.app/api/login/projects`;
  try {
    handleRequest(url, response => {
      if (response.includes("<")) {
        console.log("404");
        mainWindow.webContents.send("sendMenuItems", "{ null }");
        return;
      }
      const data = JSON.parse(response);
      checklist = data?.map(video => video.uri);
      mainWindow.webContents.send("sendMenuItems", response);
    });
  } catch (error) {
    console.log({ error: error.message });
    mainWindow.webContents.send("sendMenuItems", "{ null }");
  }
});

///////////////////////////////////
// GET: Selection of Embedded Videos //
/////////////////////////////////

ipcMain.handle("getEmbeds", (event, select) => {
  if (checklist.includes(select)) {
    // console.log({ senderFrame: event.senderFrame.url }); // >>>  { senderFrame: 'http://localhost:3000/' }
    const url = `http://localhost:8080/api/projects/videos/${select}`;
    // const url = `https://visii-api-production.up.railway.app/api/login/videos/${select}`;
    handleRequest(url, response => {
      // console.log({ response });
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
