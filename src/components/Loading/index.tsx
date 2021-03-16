import { Spin } from "antd";
import { SpinProps } from "antd/lib/spin";
import React from "react";
import styles from "./index.module.scss";

interface Props {
  type?: "global" | "local";
  size?: SpinProps["size"];
}

export const Loading: React.FC<Props> = (props) => {
  switch (props.type) {
    case "local":
      return (
        <div className={styles.localWrapper}>
          <Spin size={props.size}>{props.children}</Spin>
        </div>
      );
    default:
    case "global":
      return (
        <div className={styles.globalWrapper}>
          <Spin size={props.size}>{props.children}</Spin>
        </div>
      );
  }
};

Loading.defaultProps = {
  type: "global",
  size: "large",
};
