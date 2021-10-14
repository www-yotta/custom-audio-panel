import { FC } from "react";
import { SoundButton } from "./components/SoundButton";
import styles from "./App.module.scss";

export const App: FC = () => {
  return (
    <div className={styles.root}>
      <SoundButton name="audio1" />
      <SoundButton name="audio2" />
      <SoundButton />
    </div>
  );
};
