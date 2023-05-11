import { useEffect, useState } from "react";

export default function useWifiConnect(toggleLoading) {
  const [password, setPassword] = useState("");
  const [netSelect, setNetSelect] = useState("");
  const [message, setMessage] = useState("");
  const [ssidList, setSsidList] = useState([]);

  function clearForm() {
    setPassword("");
    setMessage("");
    setMessage("");
  }

  async function getData() {
    return new Promise(async (resolve, reject) => {
      const res = await window.bridge.wifiModule("get/networks");
      if (res.data) {
        console.log("set the networks");
        toggleLoading(false);
      }
      if (!res.data) {
        toggleLoading(false);
        setMessage(res.message);
        reject(res);
      }
      resolve(res.data);
    });
  }

  useEffect(() => {
    getData().then(networks => {
      const newList = networkNames(networks);
      setSsidList(newList);
    });
  }, []);

  /**
   * @param {:Array} netArr array of wifi objects
   * @returns array of ssid names & pushes blank selector as first item
   */
  const networkNames = netArr => {
    let list;
    if (netArr) {
      list = netArr.map((net, idx) => {
        return (
          <option key={idx + 1} value={net.ssid}>
            {net.ssid}
          </option>
        );
      });
      const defaultOption = <option key={0}> -- select a network -- </option>;
      return [defaultOption, ...list];
    }
    return [];
  };

  const handleChange = e => {
    const select = e.target.value;
    setNetSelect(select);
  };

  const submit = async () => {
    clearForm();
    toggleLoading(true);
    const res = await window.bridge.wifiModule("connect/wifi", {
      ssid: netSelect,
      password,
    });
    return res;
  };

  return {
    submit,
    handleChange,
    netSelect,
    password,
    setPassword,
    ssidList,
    message,
    setMessage,
  };
}
