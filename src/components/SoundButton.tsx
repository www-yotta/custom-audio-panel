import { FC, useCallback, useEffect, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./SoundButton.module.scss";
import { SettingContext } from "../App";
import { FaRegTimesCircle } from "react-icons/fa";
import { audioKey } from "../utils/audioKeyBind";

type SoundButtonProps = {
  name?: string;
};
export const SoundButton: FC<SoundButtonProps> = ({ name: strageName }) => {
  const { isSetting, isAllDelete } = useContext(SettingContext);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [name, setName] = useState<string>("");
  // ファイルが選択された時
  const onDrop = useCallback((droppedFiles, e) => {
    setName(droppedFiles[0].name);
    readFile(droppedFiles[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    if (!strageName) return;
    const audioData = localStorage.getItem(strageName);
    if (audioData) {
      setAudio(new Audio(JSON.parse(audioData).audio));
      setName(JSON.parse(audioData).name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useCallback(() => {
    if (!audio) return;
    audio.load();
    audio.play();
  }, [audio]);

  const deleteAudio = () => {
    if (!strageName) return;
    localStorage.removeItem(strageName);
    setAudio(null);
    setName("");
  };

  useEffect(() => {
    setAudio(null);
    setName("");
  }, [isAllDelete]);

  const handleKeyDownPlay = useCallback(
    (event: any) => {
      if (!strageName || !audio || !audio.src) return;
      if (event.keyCode === audioKey[strageName]) {
        play();
      }
    },
    [audio, play, strageName]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownPlay);
    return () => {
      document.removeEventListener("keydown", handleKeyDownPlay);
    };
  }, [handleKeyDownPlay]);

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileBinary = reader.result;
      // TODO: ここの設定を見直したい
      if (typeof fileBinary !== "string") return;
      setAudio(new Audio(fileBinary));
      if (strageName) {
        const tmp = {
          name: file.name,
          audio: fileBinary,
        };
        localStorage.setItem(strageName, JSON.stringify(tmp));
      }
    };
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");

    // base64で読み込む
    reader.readAsDataURL(file);
  };

  return (
    <>
      {audio && audio.src ? (
        <div className={styles.root}>
          <div
            // TODO: 見直したい
            className={styles.clickArea + (isSetting ? " " + styles.edit : "")}
            onClick={play}
          >
            {name}
          </div>
          {isSetting && (
            <>
              <p className={styles.changeButton} {...getRootProps()}>
                <input {...getInputProps()} />
                変更
              </p>
              <FaRegTimesCircle
                // TODO: themeを作成して管理したい
                fill="#333"
                size={20}
                className={styles.deleteIcon}
                onClick={deleteAudio}
              />
            </>
          )}
        </div>
      ) : (
        <div className={styles.root} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>登録する</p>
        </div>
      )}
    </>
  );
};
