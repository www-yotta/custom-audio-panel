import { FC } from "react";
import { keyBackGround } from "../utils/audioKeyBind";
import styles from "./KeyBackground.module.scss";

type KeyBackgroundProps = {
  name: string;
};
export const KeyBackground: FC<KeyBackgroundProps> = ({ name }) => {
  return (
    <div className={styles.root}>
      <span>{keyBackGround[name]}</span>
    </div>
  );
};
