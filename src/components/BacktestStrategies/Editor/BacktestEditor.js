import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./BaktestEditor.module.css";

import EditorSidebar from "./EditorSidebar";
import EditorHeader from "./EditorHeader";
import EditorOutput from "./EditorOutput";
import ParameterModal from "./ParameterModal";
import { createNewStrategy, updateUserStrategy } from "../apis/api";
import {
  addNewBacktestFile,
  deleteBacktestFile,
  openBacktestFile,
  updateBacktestStrategy,
  reset,
} from "../services/slices/backtestSlice";

function BacktestEditor({ strategyData, strategyUpdate }) {
  const [code] = useState(strategyData); // Stores all the files user has created with the required details
  const [openFiles, setOpenFiles] = useState([code[0]]); // Stores the names of currently opened files on the header section

  const [file] = useState(code[0]); // Stores the code and other information of the file in the code editor

  const [displayForm, setdisplayForm] = useState(false); // Changes to true when user clicks on create new file button
  const [newFileName, setNewFileName] = useState(""); // Stores the name of new file user wants to create.
  const [fileMenuOpen, setFileMenuOpen] = useState(""); // Opens the file menu for respective file when user clicks on the file menu icon

  const [alertClose, setAlertClose] = useState(true); // Pops up an alert when value is false if user does something unacceptable
  const [alertMessage, setAlertMessage] = useState(""); // Stores the message to be displayed in the alert popup
  const [fileToRename, setFileToRename] = useState(""); // Stores the file to be renamed

  const [parameterModalOpen, setParameterModalOpen] = useState(false); // Stores the state of the parameter modal

  const fileNameInput = useRef(null);
  const parameterModalRef = useRef(null);
  const editorRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { backtestData, currentStrategy } = useSelector(
    (state) => state.backtest
  );

  useEffect(() => {
    // Closes the modals once user clicks outside them...
    function handleClickOutside(event) {
      event.stopPropagation();
      if (
        fileNameInput.current &&
        !fileNameInput.current.contains(event.target)
      ) {
        if (displayForm) {
          setdisplayForm(false);
          console.log("click out");
        }
      }

      if (
        parameterModalRef.current &&
        !parameterModalRef.current.contains(event.target)
      ) {
        if (parameterModalOpen) {
          setParameterModalOpen(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    fileNameInput,
    displayForm,
    // fileMenuRef,
    fileMenuOpen,
    file,
    parameterModalOpen,
  ]);

  const createNewFile = () => {
    // Opens the Form to create a new file
    setdisplayForm(true);
    fileNameInput.current.focus();
  };
  const handleFileCreation = (e) => {
    // Handles the file creation.
    // Called when the user submits the form opened by createNewFile()
    e.preventDefault();

    let error = false;

    if (newFileName === "") {
      setAlertClose(false);
      setAlertMessage("Invalid File Name");
      setdisplayForm(false);
      error = true;
    }

    backtestData.forEach((item) => {
      if (item.fileName === newFileName) {
        setAlertClose(false);
        setdisplayForm(false);
        error = true;
      }
    });

    if (error) {
      setNewFileName("");
      return;
    }

    dispatch(
      addNewBacktestFile({
        id: -1 - backtestData.length,
        fileName: newFileName,
        language: "python",
        code: "",
      })
    );

    setOpenFiles((files) => [
      ...files,
      {
        id: -1 - backtestData.length,
        fileName: newFileName,
        language: "python",
        code: "",
      },
    ]);
    setNewFileName("");
    setdisplayForm(false);
  };

  const deleteFile = (item) => {
    if (item.fileName === "main.py") {
      setAlertClose(false);
      setAlertMessage("Cannot perform delete operation on 'main.py' file");
      setFileMenuOpen("");
      return;
    } else if (backtestData.length < 2) {
      setFileMenuOpen("");
      setAlertClose(false);
      setAlertMessage("Cannot perform delete operation on single file");
      return;
    }

    for (let i in backtestData) {
      if (backtestData[i].id === item.id) {
        if (i > 0) {
          dispatch(openBacktestFile(backtestData[0].id));
        } else {
          dispatch(openBacktestFile(backtestData[1].id));
        }
        dispatch(deleteBacktestFile(item.id));
        break;
      }
    }

    setOpenFiles((files) => files.filter((file) => file.id !== item.id));
  };

  const handleChange = (value) => {
    // Updates the code of respective file.
    dispatch(
      updateBacktestStrategy({
        type: "UPDATE_CODE",
        data: {
          value,
          id: currentStrategy.id,
        },
      })
    );
  };
  const renameFile = (e, item) => {
    e.preventDefault();
    if (item === "" || item === " ") {
      alert("Filename cannot be empty");
      setFileToRename("");
      return;
    }
    for (let i in backtestData) {
      if (
        item === backtestData[i].fileName &&
        item !== currentStrategy.fileName
      ) {
        alert("Filename already exists");
        return;
      }
    }

    dispatch(
      updateBacktestStrategy({
        type: "UPDATE_FILENAME",
        data: {
          id: currentStrategy.id,
          fileName: item,
        },
      })
    );

    setOpenFiles((openFiles) =>
      openFiles.map((file) => {
        if (file.id === currentStrategy.id) {
          return {
            ...file,
            fileName: item,
          };
        }
        return file;
      })
    );
  };

  const handleSideBarFileClick = (item) => {
    // Adds file to header of editor
    // Opens the content of new editor
    let change = true;
    dispatch(openBacktestFile(item.id));

    openFiles.forEach((file) => {
      if (file.id === item.id) {
        change = false;
      }
    });

    if (change) setOpenFiles([...openFiles, item]);
  };
  const handleHeaderFileClick = (item) => {
    // Handles the event of clicking the file tab on header
    dispatch(openBacktestFile(item.id));
  };

  const handleCloseFile = (file) => {
    // Handles the close of file from header
    if (openFiles.length < 2) {
      return;
    }

    setOpenFiles((openFile) => openFile.filter((item) => item.id !== file.id));
    dispatch(openBacktestFile(openFiles[0].id));
  };

  const createStrategy = async () => {
    let body = {
      user_id: "",
      strategy_name: "",
      strategy_link: "",
      strategy_setting_id: "",
    };

    body.user_id = document.cookie.split("; ")[1].split("=")[1];
    body.strategy_name = currentStrategy.fileName.split(".")[0];
    body.strategy_link = Buffer.from(currentStrategy.content).toString(
      "base64"
    );
    body.strategy_setting_id = currentStrategy.settingId;

    const resData = await createNewStrategy(body);

    const errorMessage = resData["error-message"];
    const message = resData.message;

    if (errorMessage) {
      toast(errorMessage[0]);
    } else {
      toast(message);
      setTimeout(() => history.push("strategies/strategyVault"), 2000);
      dispatch(reset());
    }
  };

  const updateStrategy = async () => {
    const body = {};
    body.strategy_setting_id = currentStrategy.settingId;
    body.strategy_name = currentStrategy.fileName.split(".")[0];
    body.strategy_link = Buffer.from(currentStrategy.content).toString(
      "base64"
    );
    body.user_id = document.cookie.split("; ")[1].split("=")[1];
    body.strategy_id = currentStrategy.strategyId;

    try {
      const resData = updateUserStrategy(body);
      if (resData["error-message"]) toast(resData["error-message"]);
      else toast("Strategy Updated Successfully");
    } catch (err) {
      toast(err);
    }
  };

  return (
    <div>
      <Alert
        variant="filled"
        severity="error"
        style={{
          display: `${alertClose ? "none" : ""}`,
          position: "absolute",
          left: "42%",
        }}
        onClose={() => {
          setAlertClose(true);
        }}
      >
        {alertMessage}
      </Alert>

      <ToastContainer />

      <div className={styles.editor}>
        {parameterModalOpen ? (
          <ParameterModal
            setParameterModalOpen={setParameterModalOpen}
            parameterModalRef={parameterModalRef}
            file={file}
            settingId={file.settingId}
          />
        ) : (
          <></>
        )}

        <EditorSidebar
          createNewFile={createNewFile}
          handleSideBarFileClick={handleSideBarFileClick}
          setFileMenuOpen={setFileMenuOpen}
          handleFileCreation={handleFileCreation}
          displayForm={displayForm}
          setNewFileName={setNewFileName}
          fileNameInput={fileNameInput}
          newFileName={newFileName}
          fileMenuOpen={fileMenuOpen}
          setdisplayForm={setdisplayForm}
          deleteFile={deleteFile}
          setParameterModalOpen={setParameterModalOpen}
          renameFile={renameFile}
          fileToRename={fileToRename}
          setFileToRename={setFileToRename}
        />

        <div className={styles.editor__editor} style={{ width: `68.5%` }}>
          <EditorHeader
            openFiles={openFiles}
            handleHeaderFileClick={handleHeaderFileClick}
            handleCloseFile={handleCloseFile}
          />

          {currentStrategy ? (
            <Editor
              height="72.5vh"
              theme="vs-dark"
              path={currentStrategy.fileName}
              defaultLanguage={currentStrategy.language}
              value={currentStrategy.content}
              onChange={handleChange}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
              }}
              style={{ padding: "1rem" }}
            />
          ) : (
            <div
              style={{
                height: "72.5vh",
                backgroundColor: "#1e1e1e",
                width: "100%",
              }}
            ></div>
          )}
        </div>

        <EditorOutput />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          id="editor_show"
          style={{
            marginRight: "1rem",
            display: `${strategyUpdate ? "none" : ""}`,
          }}
          onClick={createStrategy}
        >
          <strong>Save Code</strong>
        </button>
        <button
          id="editor_show"
          style={{
            marginRight: "1rem",
            display: `${strategyUpdate ? "" : "none"}`,
          }}
          onClick={() => updateStrategy()}
        >
          <strong>Update Code</strong>
        </button>
        <button id="editor_show">
          <strong>Debug Code</strong>
        </button>
      </div>
    </div>
  );
}

export default BacktestEditor;
