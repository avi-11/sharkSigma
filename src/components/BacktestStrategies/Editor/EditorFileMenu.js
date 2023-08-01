import styles from "./EditorSidebar.module.css";

const EditorFileMenu = ({
  fileMenuOpen,
  item,
  deleteFile,
  setFileMenuOpen,
  setParameterModalOpen,
  setFileToRename,
  setRenamedFile,
}) => {
  return (
    <div>
      <div
        className={styles.editorSidebar__fileMenu}
        style={{
          display: `${fileMenuOpen === item.fileName ? "" : "none"}`,
        }}
      >
        <div
          className={styles.editorSidebar__overlay}
          onClick={() => setFileMenuOpen("")}
        ></div>
        <ul>
          <li
            onClick={() => {
              deleteFile(item);
              setFileMenuOpen("");
            }}
          >
            Delete
          </li>
          <li
            onClick={() => {
              setParameterModalOpen(true);
              setFileMenuOpen("");
            }}
          >
            Settings
          </li>

          <li
            onClick={() => {
              setFileToRename(item.fileName);
              setRenamedFile(item.fileName);
              setFileMenuOpen("");
            }}
          >
            Rename
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditorFileMenu;
