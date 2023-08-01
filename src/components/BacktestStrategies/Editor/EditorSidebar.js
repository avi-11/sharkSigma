import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./BaktestEditor.module.css";
import sidebarstyles from "./EditorSidebar.module.css";
import AddFile from "../assets/addFile.svg";
import Folder from "../assets/folder.svg";
import VerticalMenu from "../assets/verticalMenu.svg";

import EditorFileMenu from "./EditorFileMenu";

function EditorSidebar({
  createNewFile,
  handleSideBarFileClick,
  setFileMenuOpen,
  handleFileCreation,
  displayForm,
  setNewFileName,
  fileNameInput,
  newFileName,
  fileMenuOpen,
  setdisplayForm,
  deleteFile,
  setParameterModalOpen,
  renameFile,
  fileToRename,
  setFileToRename,
}) {
  const [renamedFile, setRenamedFile] = useState(fileToRename);
  const [fileMenuRef, setFileMenuRef] = useState([]);

  const { backtestData, currentStrategy } = useSelector(
    (state) => state.backtest
  );

  return (
    <div className={styles.editor__sidebar}>
      <div className={styles.editor__sidebar_header}>
        <h6>WORKSPACE</h6>
      </div>

      <div className={styles.editor__sidebar_fileMenu}>
        <div>Files</div>

        <div className={styles.editor__sidebar_fileIcons}>
          <img src={AddFile} alt="Add File" onClick={createNewFile} />
          <img src={Folder} alt="Add Folder" />
          <img src={VerticalMenu} alt="Vertical Menu" />
        </div>
      </div>

      <ul>
        {backtestData.map((item, index) => (
          <li
            style={{
              backgroundColor: `${
                currentStrategy.id === item.id ? "#181A24" : ""
              }`,
              position: "relative",
              wordBreak: "break-word",
            }}
            onClick={() => {
              handleSideBarFileClick(item);
            }}
          >
            {fileToRename === item.fileName ? (
              <form
                onSubmit={(e) => {
                  renameFile(e, renamedFile);
                  setRenamedFile("");
                }}
              >
                <input
                  type="text"
                  value={renamedFile}
                  onChange={(e) => setRenamedFile(e.target.value)}
                  onBlur={(e) => {
                    renameFile(e, renamedFile);
                    setRenamedFile("");
                  }}
                  onSubmit={(e) => {
                    renameFile(e, renamedFile);
                    setRenamedFile("");
                  }}
                  className={sidebarstyles.renameFileInput}
                />
              </form>
            ) : (
              <>
                <div className={styles.editor_fileName}>
                  <p style={{ margin: "0" }}>{item.fileName}</p>
                </div>
                <div>
                  <img
                    src={VerticalMenu}
                    alt=""
                    onClick={() => setFileMenuOpen(item.fileName)}
                  />
                  <EditorFileMenu
                    fileMenuOpen={fileMenuOpen}
                    item={item}
                    deleteFile={deleteFile}
                    setFileMenuOpen={setFileMenuOpen}
                    setParameterModalOpen={setParameterModalOpen}
                    setFileToRename={setFileToRename}
                    setRenamedFile={setRenamedFile}
                  />
                </div>
              </>
            )}
          </li>
        ))}

        <form
          onSubmit={handleFileCreation}
          style={{ display: displayForm ? "" : "none" }}
          className={styles.fileCreationForm}
        >
          <input
            type="text"
            placeholder="File name..."
            onChange={(e) => setNewFileName(e.target.value)}
            ref={fileNameInput}
            value={newFileName}
          />
          <span
            className={sidebarstyles.closeFormBtn}
            onClick={() => {
              setdisplayForm(false);
              setNewFileName("");
            }}
          >
            X
          </span>
        </form>
      </ul>
    </div>
  );
}

export default EditorSidebar;
