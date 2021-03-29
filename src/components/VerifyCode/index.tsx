import UserService from "@/api/user";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";

export const VerifyCode: React.FC<{ width?: number; height?: number; userName: string }> = (
  props
) => {
  const [img, setImg] = useState("");
  const refreshImgFunc = useDebounce(() => {
    console.log("get response");
    UserService.getVerifyCodeImg({ userName: props.userName, t: Date.now() }).then((res) => {
      setImg(
        `data:image/png;base64,${btoa(
          new Uint8Array(res as any).reduce(
            (data_2, byte) => data_2 + String.fromCharCode(byte),
            ""
          )
        )}`
      );
    });
  });

  useEffect(() => {
    console.log(123132);
    refreshImgFunc();
  }, [props.userName, refreshImgFunc]);

  return (
    <div className={styles.verifyCode}>
      <img
        onClick={refreshImgFunc}
        style={{ width: props.width || 88.89 + "px", height: props.height || 32 + "px" }}
        src={img}
        alt="验证码"
      />
    </div>
  );
};