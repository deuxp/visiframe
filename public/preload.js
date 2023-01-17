const { contextBridge, ipcRenderer } = require("electron");

const indexBridge = {
  greet: cb => {
    ipcRenderer.invoke("getGreet");
    const listener = ipcRenderer.on("sendGreet", (event, response) => {
      console.log("invoked greet");
      cb(response);
      listener.removeAllListeners("sendGreet");
    });
  },
  getEmbeds: (selection, cb) => {
    ipcRenderer.invoke("getEmbeds", selection);
    const listener = ipcRenderer.on("embeddedVideoList", (event, response) => {
      const data = JSON.parse(response);
      cb(data);
      listener.removeAllListeners("embeddedVideoList");
    });
  },
  getMenuItems: cb => {
    ipcRenderer.invoke("getMenuItems");
    const listener = ipcRenderer.on("sendMenuItems", (e, response) => {
      const json = JSON.parse(response);
      cb(json);
      listener.removeAllListeners("sendMenuItems");
    });
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("bridge", indexBridge);
});
