import useWifiConnect from "../../hooks/useWifiConnect";
import style from "./WifiConnect.module.css";

function WifiConnect({ setIsConnecting, isConnected, setIsConnected }) {
  const {
    submit,
    handleChange,
    netSelect,
    password,
    setPassword,
    ssidList,
    message,
    setMessage,
  } = useWifiConnect(toggleLoading);

  function toggleLoading(toggle) {
    setIsConnecting(toggle);
  }

  async function handleClick() {
    const res = await submit(); // connects the wifi: { data: bool, message: string}
    if (res.data) {
      console.log("ok! ->", res.message);
    }
    if (!res.data) {
      console.log("error: ", res.message);
      setMessage(res.message);
    }
  }

  function handleReload() {
    window.api.reload();
  }

  return (
    <div className={style.container}>
      <div className={style.title}>Wifi Networks</div>
      <select
        className={style.select}
        defaultValue={netSelect}
        onChange={handleChange}
      >
        {ssidList}
      </select>
      <input
        className={style.password}
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
      />

      <div className={style.button_container}>
        <button className={style.button} onClick={handleClick}>
          connect
        </button>
        <button
          id={style.reload}
          className={style.button}
          onClick={handleReload}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.181a.75.75 0 0 1 1.177-.616l4.432 3.068a.75.75 0 0 1 0 1.234l-4.432 3.068A.75.75 0 0 1 12 8.32V6a7 7 0 1 0 7 7 1 1 0 1 1 2 0 9 9 0 1 1-9-9V2.181z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
      <div className={style.message}>{message}</div>
    </div>
  );
}

export default WifiConnect;
