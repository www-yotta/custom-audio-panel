import { FC, useState, createContext } from "react";
import { SoundButton } from "./components/SoundButton";
import styles from "./App.module.scss";
import "./App.css";
import { FaCog, FaTrashAlt, FaStop } from "react-icons/fa";
import { audioKey } from "./utils/audioKeyBind";
import { KeyBackground } from "./components/KeyBackground";

type SettingContextProps = {
  isSetting: boolean;
  isAllDelete: boolean;
  isStopAudio: boolean;
};
export const SettingContext = createContext<SettingContextProps>({
  isSetting: false,
  isAllDelete: false,
  isStopAudio: false,
});

export const App: FC = () => {
  const AUDIO_PANEL_COUNT = 20;
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [isAllDelete, setIsAllDelete] = useState<boolean>(false);
  const [isStopAudio, setIsStopAudio] = useState<boolean>(false);
  const handleSettingToggle = () => setIsSetting(!isSetting);
  const deleteAllAudio = () => {
    localStorage.clear();
    setIsAllDelete(!isAllDelete);
  };
  const handleStopAudio = () => setIsStopAudio(!isStopAudio);
  const handleKeyDownStop = (event: any) => {
    if (event.keyCode === audioKey["stop"]) {
      setIsStopAudio(!isStopAudio);
    }
  };
  document.addEventListener("keydown", handleKeyDownStop);

  return (
    <SettingContext.Provider value={{ isSetting, isAllDelete, isStopAudio }}>
      <div className={styles.root}>
        <h1>カスタムオーディオパネル</h1>
        <div className={styles.houToUse}>
          <h2>使い方</h2>
          <ul>
            <li>・登録パネルをクリックして音声ファイルをアップできます</li>
            <li>・アップできたらクリックで音声がなります</li>
            <li>
              ・
              最大で20個の音声を登録できますが、容量が大きいと登録ができないかもしれません
            </li>
            <li>
              ・歯車アイコンを押すとアップロードした音声ファイルの変更や削除ができます
            </li>
            <li>
              ・再生はキーボードにも対応しています。(各パネルの左上に記載)
            </li>
          </ul>
        </div>
        <div className={styles.area}>
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
          <div>
            <div className={styles.panel}>
              {Array(AUDIO_PANEL_COUNT)
                .fill(null)
                .map((_, i) => (
                  <SoundButton name={`audio${i + 1}`} key={`audio${i + 1}`} />
                ))}
            </div>
            <div className={styles.stopButton} onClick={handleStopAudio}>
              <div className={styles.icon}>
                <FaStop size={30} />
              </div>
              <p>停止</p>
              <KeyBackground name="stop" />
            </div>
          </div>
        </div>
        <p className={styles.footer}>
          <a href="https://twitter.com/www_yotta">作者Twitter</a>
        </p>
        <p className={styles.footer}>&copy;www.yotta</p>
      </div>
    </SettingContext.Provider>
  );
};
