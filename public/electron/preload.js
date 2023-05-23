const { contextBridge, ipcRenderer } = require("electron");

const indexBridge = {
  getEmbeds: (channel, selection, cb) => {
    let validChannel = ["embeddedVideoList"];
    ipcRenderer.invoke("getEmbeds", selection);
    if (validChannel.includes(channel)) {
      const listener = ipcRenderer.on("embeddedVideoList", (_e, response) => {
        try {
          const json = JSON.parse(response);
          cb(json);
          listener.removeAllListeners("embeddedVideoList");
        } catch (error) {
          cb([]);
          listener.removeAllListeners("embeddedVideoList");
        }
      });
    }
  },
  getMenuItems: (channel, cb) => {
    let validChannel = ["sendMenuItems"];
    if (validChannel.includes(channel)) {
      ipcRenderer.invoke("getMenuItems");
      const listener = ipcRenderer.on("sendMenuItems", (_e, response) => {
        const json = JSON.parse(response);
        cb(json);
        listener.removeAllListeners("sendMenuItems");
      });
    }
  },

  kioskMode: (flag) => {
    ipcRenderer.invoke("kiosk", flag);
  },

  setWindowsize: (size) => {
    ipcRenderer.invoke("resizeWindow", size);
  },

  login: (email, callback) => {
    ipcRenderer.invoke("login", email);
    const listener = ipcRenderer.on("renderLogin", (_e, res) => {
      const data = JSON.parse(res);
      callback(data);
      listener.removeAllListeners("renderLogin");
    });
  },
  refreshAccess: () => {
    return new Promise((resolve, _reject) => {
      ipcRenderer.invoke("refreshAccess");
      const listener = ipcRenderer.on("renderRefreshAccess", (_e, res) => {
        const data = JSON.parse(res);
        listener.removeAllListeners("renderRefreshAccess");
        resolve(data);
      });
    });
  },
  verifyAccess: () => {
    return new Promise((resolve, _reject) => {
      ipcRenderer.invoke("verifyAccess");
      const listener = ipcRenderer.on("renderAccess", (_e, res) => {
        const data = JSON.parse(res);
        listener.removeAllListeners("renderAccess");
        resolve(data);
      });
    });
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("bridge", indexBridge);
});
