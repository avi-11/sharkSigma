import React from 'react';
import styles from './BaktestEditor.module.css'

function EditorOutput({showOutput}) {
    return (
        <div className={styles.editor__output} style={{width: `${showOutput ? "20%": ""}`}}>
          <header className={styles.editor__editor_files}>
              <ul>
                <li><span>Console</span> <span className={styles.editor__editor_closeFile}>x</span></li>
                <li><span>Result</span> <span className={styles.editor__editor_closeFile}>x</span></li>
              </ul>
            </header>
            <div style={{paddingTop: "1rem", paddingLeft: "10px", textAlign: "left"}} id="output" className=""></div>
        </div>
    )
}

export default EditorOutput;