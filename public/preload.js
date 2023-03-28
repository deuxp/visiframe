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
        console.log(json);
        cb(json);
        listener.removeAllListeners("sendMenuItems");
      });
    }
  },
  setWindowsize: size => {
    ipcRenderer.invoke("resizeWindow", size);
  },
  login: (credentials, callback) => {
    const creds = JSON.stringify(credentials);
    ipcRenderer.invoke("login", creds);
    const listener = ipcRenderer.on("renderLogin", (event, res) => {
      const data = JSON.parse(res);
      // >>> { login: true }
      console.log(data);
      callback(data);
      listener.removeAllListeners("renderLogin");
    });
  },
  register: (credentials, callback) => {
    const creds = JSON.stringify(credentials);
    ipcRenderer.invoke("register", creds);
    const listener = ipcRenderer.on("renderRegister", (event, res) => {
      const data = JSON.parse(res);
      console.log(data);
      callback(data);
      listener.removeAllListeners("renderRegister");
    });
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("bridge", indexBridge);
});
