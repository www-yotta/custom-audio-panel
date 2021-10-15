import { FC, useState, createContext } from "react";
import { SoundButton } from "./components/SoundButton";
import styles from "./App.module.scss";
import "./App.css";
import { FaCog, FaTrashAlt } from "react-icons/fa";

type SettingContextProps = {
  isSetting: boolean;
  isAllDelete: boolean;
};
export const SettingContext = createContext<SettingContextProps>({
  isSetting: false,
  isAllDelete: false,
});

export const App: FC = () => {
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [isAllDelete, setIsAllDelete] = useState<boolean>(false);
  const handleSettingToggle = () => setIsSetting(!isSetting);
  const deleteAllAudio = () => {
    localStorage.clear();
    setIsAllDelete(true);
  };

  return (
    <SettingContext.Provider value={{ isSetting, isAllDelete }}>
      <div className={styles.root}>
        <div className={styles.setting}>
          <div className={styles.icon} onClick={handleSettingToggle}>
            <FaCog size={30} />
          </div>
          {isSetting && (
            <div
              className={styles.icon + " " + styles.subIcon}
              onClick={deleteAllAudio}
            >
              <FaTrashAlt size={30} className={styles.deleteIcon} />
            </div>
          )}
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
