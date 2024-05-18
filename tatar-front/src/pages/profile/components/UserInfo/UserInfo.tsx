import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
// import camera from "../../../../assets/svg/camera.svg";

const UserInfo = ({ item }: any) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfo__avatar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M19.3337 5.33337H12.667L9.33366 9.33337H5.33366C4.62641 9.33337 3.94814 9.61433 3.44804 10.1144C2.94794 10.6145 2.66699 11.2928 2.66699 12V24C2.66699 24.7073 2.94794 25.3856 3.44804 25.8857C3.94814 26.3858 4.62641 26.6667 5.33366 26.6667H26.667C27.3742 26.6667 28.0525 26.3858 28.5526 25.8857C29.0527 25.3856 29.3337 24.7073 29.3337 24V12C29.3337 11.2928 29.0527 10.6145 28.5526 10.1144C28.0525 9.61433 27.3742 9.33337 26.667 9.33337H22.667L19.3337 5.33337Z"
            stroke="#3A3A3A"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 21.3334C18.2091 21.3334 20 19.5425 20 17.3334C20 15.1242 18.2091 13.3334 16 13.3334C13.7909 13.3334 12 15.1242 12 17.3334C12 19.5425 13.7909 21.3334 16 21.3334Z"
            stroke="#3A3A3A"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className={styles.userInfo__data}>
        <p>{item?.name}</p>
        <a href="#">{item?.email}</a>
      </div>
    </div>
  );
};

export { UserInfo };
