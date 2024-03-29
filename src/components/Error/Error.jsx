import React from "react";
import style from "./Error.module.css";

function Error() {
  const { message, container, rings_container, page, rings, connect } = style;

  return (
    <div className={page}>
      <div className={container}>
        {/* rings svg */}

        <div className={rings_container}>
          <svg
            className={rings}
            width="45"
            height="45"
            viewBox="0 0 45 45"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000"
          >
            <g
              fill="none"
              fillRule="evenodd"
              transform="translate(1 1)"
              strokeWidth="2"
            >
              <circle cx="22" cy="22" r="6" strokeOpacity="0">
                <animate
                  attributeName="r"
                  begin="1.5s"
                  dur="3s"
                  values="6;22"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="1.5s"
                  dur="3s"
                  values="1;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-width"
                  begin="1.5s"
                  dur="3s"
                  values="2;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="22" cy="22" r="6" strokeOpacity="0">
                <animate
                  attributeName="r"
                  begin="3s"
                  dur="3s"
                  values="6;22"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="3s"
                  dur="3s"
                  values="1;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-width"
                  begin="3s"
                  dur="3s"
                  values="2;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="22" cy="22" r="8">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="1.5s"
                  values="6;1;2;3;4;5;6"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>
        {/* data transfer svg */}

        <svg
          className={connect}
          width="45"
          height="45"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_403_3564)">
            <path d="M9 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3L0 9H5V11H3V13H9V11H7V9H12V3C12 2.20435 11.6839 1.44129 11.1213 0.87868C10.5587 0.31607 9.79565 0 9 0V0ZM10 7H2V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H9C9.26522 2 9.51957 2.10536 9.70711 2.29289C9.89464 2.48043 10 2.73478 10 3V7ZM21 11H17C16.2044 11 15.4413 11.3161 14.8787 11.8787C14.3161 12.4413 14 13.2044 14 14V24H24V14C24 13.2044 23.6839 12.4413 23.1213 11.8787C22.5587 11.3161 21.7956 11 21 11ZM22 22H16V14C16 13.7348 16.1054 13.4804 16.2929 13.2929C16.4804 13.1054 16.7348 13 17 13H21C21.2652 13 21.5196 13.1054 21.7071 13.2929C21.8946 13.4804 22 13.7348 22 14V22ZM17 5H14V3H17C17.7956 3 18.5587 3.31607 19.1213 3.87868C19.6839 4.44129 20 5.20435 20 6V9H18V6C18 5.73478 17.8946 5.48043 17.7071 5.29289C17.5196 5.10536 17.2652 5 17 5ZM8 19H12V21H8C7.20435 21 6.44129 20.6839 5.87868 20.1213C5.31607 19.5587 5 18.7956 5 18V15H7V18C7 18.2652 7.10536 18.5196 7.29289 18.7071C7.48043 18.8946 7.73478 19 8 19ZM20 20C20 20.1978 19.9414 20.3911 19.8315 20.5556C19.7216 20.72 19.5654 20.8482 19.3827 20.9239C19.2 20.9996 18.9989 21.0194 18.8049 20.9808C18.6109 20.9422 18.4327 20.847 18.2929 20.7071C18.153 20.5673 18.0578 20.3891 18.0192 20.1951C17.9806 20.0011 18.0004 19.8 18.0761 19.6173C18.1518 19.4346 18.28 19.2784 18.4444 19.1685C18.6089 19.0586 18.8022 19 19 19C19.2652 19 19.5196 19.1054 19.7071 19.2929C19.8946 19.4804 20 19.7348 20 20Z" />
          </g>
          <defs>
            <clipPath id="clip0_403_3564">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className={message}>Please log into Wifi</div>
      </div>
    </div>
  );
}

export default Error;
