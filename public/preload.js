const { contextBridge, ipcRenderer } = require("electron");

const indexBridge = {
  getEmbeds: (selection, cb) => {
    ipcRenderer.invoke("getEmbeds", selection);
    const listener = ipcRenderer.on("embeddedVideoList", (event, response) => {
      const json = JSON.parse(response);
      // console.log({ json });
      cb(json);
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
