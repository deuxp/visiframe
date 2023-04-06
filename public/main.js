const { app, BrowserWindow, ipcMain, net, session } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const axios = require("axios");

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    useContentSize: true,
    title: "Utopics Visualizer",
    icon: "src/icons/win/icon.ico", // windows
    // icon: "src/icons/png/512x512.png", // linux
    // icon: "src/icons/mac/icon.icns", // darwin
    frame: false,
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
      : `file://${path.join(__dirname, "../build/index.html")}`
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

///////////////
// API URLS //
/////////////

const deployBase = "https://visualizer-server-production.up.railway.app";
// const deployBase = "http://localhost:8080";

const refresh = `${deployBase}/api/access/refresh`;
const access = `${deployBase}/api/access`;
const login = `${deployBase}/api/user/login`;
const register = `${deployBase}/api/user/register`;
const reset = `${deployBase}/api/reset`;
const newPassword = `${deployBase}/api/reset/new-password`;

//////////////////////
// Session-cookies //
////////////////////

function splitCookie(string) {
  let partition = string.indexOf("=");
  let end = string.indexOf(";");
  let name = string.slice(0, partition);
  let value = string.slice(partition + 1, end);

  return { name, value };
}

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
function setCookie(rawCookie) {
  const { name, value } = splitCookie(rawCookie);
  const cookie = {
    url: deployBase,
    name,
    value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    expirationDate: 1742054595000,
  };
  sesh.cookies.set(cookie).then(
    () => {
      console.log(`\n${name} cookie is set\n`);
    },
    error => {
      console.error(error);
    }
  );
}

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
    request.on("error", () => {
      console.log("Something went wrong with the internet");
      cb(null);
    });
    request.end();
  } catch (error) {
    console.log("handleRequest: ", error);
    cb(null);
  }
}

async function postLoginCredentials(url, credentials) {
  try {
    const res = await axios.post(
      url,
      {
        email: credentials?.email,
        password: credentials?.password,
      },
      { withCredentials: true }
    );
    // array of 2 raw cookie dough
    const cookies = res.headers["set-cookie"];
    setCookie(cookies[0]);
    setCookie(cookies[1]);

    console.log(res.data);
    const data = JSON.stringify(res.data);
    return data;
  } catch (error) {
    console.log("login request: ", error.message);
    return '{"login": false}';
  }
}

async function registerNewUser(url, credentials) {
  try {
    const res = await axios.post(
      url,
      {
        email: credentials?.email,
        password: credentials?.password,
        password_confirm: credentials?.password_confirm,
        name: credentials?.name,
      },
      { withCredentials: true }
    );
    const data = JSON.stringify(res.data);
    return data;
  } catch (error) {
    console.log("New user not registered: ", error.message);
    return '{"register": false}';
  }
}

async function resetPassword(url, email) {
  try {
    const res = await axios.post(
      url,
      {
        email,
      },
      { withCredentials: true }
    );
    const data = JSON.stringify(res.data);
    return data;
  } catch (error) {
    console.log(
      "Main::problem resetting password, server error?: ",
      error.message
    );
    return '{"reset": false}';
  }
}

async function postNewPassword(url, credentials) {
  const { email, password, password_confirm } = credentials;
  // console.log(credentials);
  try {
    const res = await axios.post(
      url,
      {
        email,
        password,
        password_confirm,
      },
      { withCredentials: true }
    );
    const data = JSON.stringify(res.data);
    return data;
  } catch (error) {
    console.log(
      "Main::problem posting new password, server error?: ",
      error.message
    );
    return '{"update": false}';
  }
}

////////////
// LOGIN //
//////////

ipcMain.handle("login", async (event, credentials) => {
  credentials = JSON.parse(credentials);
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;
  const loginStatus = await postLoginCredentials(login, credentials);
  mainWindow.webContents.send("renderLogin", loginStatus);
});

//////////////
// REGISTER //
//////////////

ipcMain.handle("register", async (event, credentials) => {
  credentials = JSON.parse(credentials);
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;
  const registerStatus = await registerNewUser(register, credentials);
  mainWindow.webContents.send("renderRegister", registerStatus);
});

////////////// ///////
// RESET PASSWORD  //
////////////// /////

ipcMain.handle("resetPassword", async (event, email) => {
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;
  // POST options function
  const newPassword = await resetPassword(reset, email);
  console.log(newPassword);
  mainWindow.webContents.send("renderResetPassword", newPassword);
});

////////////// /////////
// POST NEW PASSWORD //
////////////// ///////

ipcMain.handle("postNewPassword", async (event, credentials) => {
  credentials = JSON.parse(credentials);
  const senderFrame = event.senderFrame.url;
  if (!validateSenderFrame(senderFrame)) return;
  const postPassword = await postNewPassword(newPassword, credentials);
  mainWindow.webContents.send("renderNewPassword", postPassword);
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
  // const url = "http://localhost:8080/api/projects";
  const getOptions = {
    url: `${deployBase}/api/projects`,
    method: "GET",
    credentials: "include",
    session: sesh,
  };
  try {
    handleRequest(getOptions, response => {
      if (response.includes("<")) {
        console.log("404");
        return mainWindow.webContents.send("sendMenuItems", "null");
      }
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

ipcMain.handle("getEmbeds", (event, select) => {
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

ipcMain.handle("resizeWindow", (event, data) => {
  const { width, height } = JSON.parse(data);
  mainWindow.setSize(width, height);
  mainWindow.center();
});
