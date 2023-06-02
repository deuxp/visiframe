const { contextBridge, ipcRenderer } = require("electron");

const indexBridge = {
  getEmbeds: (channel, selection, cb) => {
    let validChannel = ["embeddedVideoList"];
    ipcRenderer.invoke("getEmbeds", selection);
    if (validChannel.includes(channel)) {
      const listener = ipcRenderer.on(
        "embeddedVideoList",
        (event, response) => {
          try {
            const json = JSON.parse(response);
            cb(json);
            listener.removeAllListeners("embeddedVideoList");
          } catch (error) {
            cb([]);
            listener.removeAllListeners("embeddedVideoList");
          }
        }
      );
    }
  },
  getMenuItems: (channel, cb) => {
    let validChannel = ["sendMenuItems"];
    if (validChannel.includes(channel)) {
      ipcRenderer.invoke("getMenuItems");
      const listener = ipcRenderer.on("sendMenuItems", (e, response) => {
        const json = JSON.parse(response);
        cb(json);
        listener.removeAllListeners("sendMenuItems");
      });
    }
  },

  setWindowsize: size => {
    ipcRenderer.invoke("resizeWindow", size);
  },

  login: (email, callback) => {
    ipcRenderer.invoke("login", email);
    const listener = ipcRenderer.on("renderLogin", (event, res) => {
      const data = JSON.parse(res);
      callback(data);
      listener.removeAllListeners("renderLogin");
    });
  },
  refreshAccess: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer.invoke("refreshAccess");
      const listener = ipcRenderer.on("renderRefreshAccess", (event, res) => {
        const data = JSON.parse(res);
        listener.removeAllListeners("renderRefreshAccess");
        resolve(data);
      });
    });
  },
  verifyAccess: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer.invoke("verifyAccess");
      const listener = ipcRenderer.on("renderAccess", (event, res) => {
        const data = JSON.parse(res);
        listener.removeAllListeners("renderAccess");
        resolve(data);
      });
    });
  },
  setKiosk: () => {
    ipcRenderer.invoke("kiosk");
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("bridge", indexBridge);
});
