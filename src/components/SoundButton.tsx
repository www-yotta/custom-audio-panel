import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import styles from "./SoundButton.module.scss";

type SoundButtonProps = {
  name?: string;
};
export const SoundButton: FC<SoundButtonProps> = ({ name: strageName }) => {
  const { register, unregister, setValue, watch } = useForm();
  const fileData = watch("sound");
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());
  console.log("audio", audio);
  const [name, setName] = useState<string>("");
  const onDrop = useCallback((droppedFiles) => {
    console.log("droppedFiles", droppedFiles);
    setName(droppedFiles[0].name);
    readFile(droppedFiles[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "",
  });

  useEffect(() => {
    if (!strageName) return;
    const audioData = localStorage.getItem(strageName);
    console.log("audioData", audioData);
    if (audioData) setAudio(new Audio(audioData));
  }, []);

  useEffect(() => {
    register("sound");
    return () => {
      unregister("sound");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = () => audio.play();

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileBinary = reader.result;
      // TODO: ここの設定を見直したい
      if (typeof fileBinary !== "string") return;
      setAudio(new Audio(fileBinary));
      // console.log("read file", fileBinary);
      if (strageName) {
        localStorage.setItem(strageName, fileBinary);
      }
      setValue("sound", fileBinary, { shouldValidate: true });
    };
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");

    // base64で読み込む
    reader.readAsDataURL(file);
  };

  return (
    <>
      {audio.src ? (
        <div className={styles.root} onClick={play}>
          <p>{name}</p>
        </div>
      ) : (
        <div className={styles.root} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>音声を登録する</p>
        </div>
      )}
    </>
  );
};
