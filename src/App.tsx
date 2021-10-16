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
  const AUDIO_PANEL_COUNT = 20;
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [isAllDelete, setIsAllDelete] = useState<boolean>(false);
  const handleSettingToggle = () => setIsSetting(!isSetting);
  const deleteAllAudio = () => {
    localStorage.clear();
    setIsAllDelete(!isAllDelete);
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
          {Array(AUDIO_PANEL_COUNT)
            .fill(null)
            .map((_, i) => (
              <SoundButton name={`audio${i + 1}`} key={`audio${i + 1}`} />
            ))}
        </div>
      </div>
    </SettingContext.Provider>
  );
};
