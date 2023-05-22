const wifi = require("node-wifi");
wifi.init({ iface: null });

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

async function getNetworks() {
  await sleep(1000);
  try {
    let res = await wifi.scan();

    if (res?.length === 0) {
      await sleep(1000);
      console.log("loop");
      res = await wifi.scan();
    }
    if (res?.length === 0) {
      return { data: res, message: "Error: enable wifi module" };
    }
    return { data: res, message: "node-wifi.scan" };
  } catch (error) {
    return { data: null, message: "error: refresh wifi" };
  }
}

async function connectWifi(ssid, password) {
  try {
    const res = await wifi.connect({ ssid, password });
    console.log("...connecting -->", res);
    const connection = await wifi.getCurrentConnections();
    const network = connection[0]?.ssid;

    if (!network) {
      return { data: false, message: "connection failed: check password" };
    }
    return { data: true, message: `connected to: ${network}` };
  } catch (error) {
    return { data: false, message: "connection failed: node-wifi error" };
  }
}

module.exports = { getNetworks, connectWifi, sleep };
