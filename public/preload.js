const { contextBridge, ipcRenderer } = require("electron");

const indexBridge = {
  greet: async cb => {
    const trig = await ipcRenderer.invoke("getGreet");
    ipcRenderer.on("sendGreet", (event, response) => {
      console.log(response);
      cb(response);
    });
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electron", indexBridge);
});
