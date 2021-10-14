import { FC, useState, createContext } from "react";
import { SoundButton } from "./components/SoundButton";
import styles from "./App.module.scss";
import "./App.css";

export const SettingContext = createContext<boolean>(false);

export const App: FC = () => {
  const [isSetting, setSetting] = useState<boolean>(false);
  const handleSettingToggle = () => setSetting(!isSetting);

  return (
    <SettingContext.Provider value={isSetting}>
      <div className={styles.root}>
        <div className={styles.setting} onClick={handleSettingToggle}>
          設
        </div>
        <div className={styles.panel}>
          <SoundButton name="audio1" />
          <SoundButton name="audio2" />
          <SoundButton name="audio3" />
          <SoundButton name="audio4" />
          <SoundButton name="audio5" />
          <SoundButton name="audio6" />
          <SoundButton name="audio7" />
          <SoundButton name="audio8" />
          <SoundButton name="audio9" />
          <SoundButton name="audio10" />
          <SoundButton name="audio11" />
          <SoundButton name="audio12" />
          <SoundButton name="audio13" />
          <SoundButton name="audio14" />
          <SoundButton name="audio15" />
          <SoundButton />
          <SoundButton />
          <SoundButton />
          <SoundButton />
          <SoundButton />
        </div>
      </div>
    </SettingContext.Provider>
  );
};
