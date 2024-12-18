import React, { useEffect, useRef } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/python/python";
import "codemirror/mode/go/go";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/theme/dracula.css";
import "./CodeEditor.css";


function CodeEditor({ warpLanguage, setWarpLanguage, currentMode }) {
    const editorRef = useRef(null);

    useEffect(() => {
        // Синхронизация внешнего состояния с редактором только при смене warpLanguage
        if (editorRef.current) {
            const editor = editorRef.current.editor;
            if (editor.getValue() !== warpLanguage) {
                editor.setValue(warpLanguage);
            }
        }
    }, [warpLanguage]);

    return (
        <CodeMirror
            editorDidMount={(editor) => {
                editorRef.current = { editor };
            }}
            options={{
                mode: currentMode,
                theme: "dracula",
                lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
                // Обновляем состояние, только если текст действительно изменился
                if (value !== warpLanguage) {
                    setWarpLanguage(value);
                }
            }}
        />
    );
}

export default CodeEditor;
