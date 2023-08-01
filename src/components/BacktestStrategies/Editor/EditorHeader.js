import React from "react";
import { useSelector } from "react-redux";

import styles from "./BaktestEditor.module.css";

function EditorHeader({ openFiles, handleHeaderFileClick, handleCloseFile }) {
  const { currentStrategy } = useSelector((state) => state.backtest);

  return (
    <header className={styles.editor__editor_files}>
      <ul>
        {openFiles.map((item) => (
          <li
            style={{
              backgroundColor: `${
                currentStrategy.id === item.id ? "#181A24" : ""
              }`,
            }}
          >
            <span onClick={() => handleHeaderFileClick(item)}>
              {item?.fileName}
            </span>
            <span
              className={styles.editor__editor_closeFile}
              onClick={() => handleCloseFile(item)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default EditorHeader;
