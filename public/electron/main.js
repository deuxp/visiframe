const { app, BrowserWindow, ipcMain, net, session } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const axios = require("axios");
const { deployBase, refresh, access, login } = require("./api-urls");

const { setCookie } = require("./cookies");
const { log } = require("console");

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    useContentSize: true,
    title: "VisualizerX",
    icon: "src/icons/win/icon.ico", // windows
    // icon: "src/icons/png/512x512.png", // linux
    // icon: "src/icons/mac/icon.icns", // darwin
    frame: true,
    backgroundColor: "#000",
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      webviewTag: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
};

let sesh;
app.enableSandbox(); // enabled globally
app
  .whenReady()
  .then(() => {
    createWindow();
  })
  .then(() => {
    sesh = session.defaultSession;
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/////////////////////////
// Security listeners //
///////////////////////

app.on("web-contents-created", (event, contents) => {
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    delete webPreferences.preload;
    webPreferences.nodeIntegration = false;
    event.preventDefault();
  });
});

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

//////////////
// HELPERS //
////////////

function validateSenderFrame(frame) {
  if (isDev) {
    const host = "localhost:3000";
    const frameSender = new URL(frame).host;
    return frameSender === host;
  }
  const ext = ".html";
  const name = "index";
  const file = path.parse(frame);
  return file.name === name && file.ext === ext;
}

function handleRequest(options, cb) {
  try {
    const request = net.request(options);
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
    request.on("error", err => {
      // this likely happens when there is no connection to the internet
      console.log("wifi is not connected");
      console.log("handleRequest ERROR::::::::::::::");
      console.log(err);
      cb("Server error");
    });
    request.end();
  } catch (error) {
    console.log("handleRequest: ", error);
    cb(null);
  }
}

async function postLoginCredentials(url, email) {
  try {
    const res = await axios.post(
      url,
      {
        email,
      },
      { withCredentials: true }
    );
    // array of 2 raw cookie dough
    const cookies = res.headers["set-cookie"];
    setCookie(sesh, deployBase, cookies[0]);
    setCookie(sesh, deployBase, cookies[1]);

    console.log(res.data);
    const data = JSON.stringify(res.data);
    return data;
  } catch (error) {
    console.log("login request: ", error.message);
    return '{"login": false}';
  }
}
////////////
// LOGIN //
//////////

ipcMain.handle("login", async (event, email) => {
  console.log(email);
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;
  // const url = "http://localhost:8888/api/user/login";
  const loginStatus = await postLoginCredentials(login, email);
  mainWindow.webContents.send("renderLogin", loginStatus);
});

////////////// //////
// REFRESH ACCESS //
////////////// ////

ipcMain.handle("refreshAccess", async event => {
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;

  const refreshOptions = {
    url: refresh,
    method: "GET",
    credentials: "include",
    session: sesh,
  };
  handleRequest(refreshOptions, response => {
    console.log(response);
    mainWindow.webContents.send("renderRefreshAccess", response);
  });
});

////////////// //////
// VERIFY ACCESS //
////////////// ////

ipcMain.handle("verifyAccess", async event => {
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;
  const getOptions = {
    url: access,
    method: "GET",
    credentials: "include",
    session: sesh,
  };
  handleRequest(getOptions, response => {
    console.log(response);
    mainWindow.webContents.send("renderAccess", response);
  });
});

/////////////////////////////
// GET: inital menu items //
///////////////////////////
ipcMain.handle("getMenuItems", () => {
  const getOptions = {
    url: `${deployBase}/api/projects`,
    method: "GET",
    credentials: "include",
    session: sesh,
  };
  try {
    handleRequest(getOptions, response => {
      // TODO: what is the correct response status property
      log({ response_status: response });

      // if (response === 501) {
      // }

      mainWindow.webContents.send("sendMenuItems", response);
    });
  } catch (error) {
    console.log({ error: error.message });
    mainWindow.webContents.send("sendMenuItems", "null");
  }
});

////////////////////////////////////////
// GET: Selection of Embedded Videos //
//////////////////////////////////////

ipcMain.handle("getEmbeds", (_e, select) => {
  const getOptions = {
    url: `${deployBase}/api/projects/videos/${select}`,
    method: "GET",
    credentials: "include",
    session: sesh,
  };
  handleRequest(getOptions, response => {
    mainWindow.webContents.send("embeddedVideoList", response);
  });
  // }
});

/////////////////////////////
// RESIZE: Browser Window //
///////////////////////////

ipcMain.handle("resizeWindow", (_e, data) => {
  const { width, height } = JSON.parse(data);
  mainWindow.setSize(width, height);
  mainWindow.center();
});

ipcMain.handle("kiosk", (_e, flag) => {
  mainWindow.kiosk(flag);
});
