import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HostBackend from "../../main.jsx";
import TaskInfo from "./TaskInfo.jsx";
import LanguageSelector from "../../ui/LanguageSelector.jsx";
import CodeEditor from "../../ui/CodeEditor.jsx";
import './Task.css';


function Task() {

    const navigate = useNavigate();
    const { task_id } = useParams();

    const [task, setTask] = useState({});
    const [languages, setLanguages] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState('go'); // Текущий язык
    const [warpLanguage, setWarpLanguage] = useState('');         // Код для текущего языка
    const [result, setResult] = useState('');                     // Результат выполнения кода

    // Загружаем данные о задаче и доступных языках
    useEffect(() => {
        axios.get(`${HostBackend}task_detail/`, { params: { task_id } })
            .then(response => {
                if (response.data.status === 'error') {
                    navigate('/');
                    return;
                }
                const { task, languages } = response.data;
                setTask(task);
                setLanguages(languages);
                setWarpLanguage(languages[0]?.warp || '');
                setCurrentLanguage(languages[0].name.toLowerCase());
            })
            .catch(error => {
                console.error("Ошибка запроса", error);
            });
    }, [task_id, navigate]);

    const handleSubmit = () => {
        axios.get(`${HostBackend}code_complete/`, { params: { warpLanguage, currentLanguage } })
            .then(response => {
                if (response.data.status === 'error') {
                    setResult(response.data.error_text);
                    return;
                }
                setResult(response.data.result);
            })
            .catch(error => {
                console.error("Ошибка запроса", error);
            });
    };

    return (
        <div className="task">
            {/* Информация о задаче */}
            <TaskInfo task={task} />

            {/* Секция для редактирования кода */}
            <div className="task__code">
                <button className="code__run" onClick={handleSubmit}>Run</button>

                {/* Выбор языка */}
                <LanguageSelector
                    languages={languages}
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={setCurrentLanguage}
                    setWarpLanguage={setWarpLanguage}
                />

                {/* Редактор кода */}
                <CodeEditor
                    warpLanguage={warpLanguage}
                    setWarpLanguage={setWarpLanguage}
                    currentMode={currentLanguage}
                />

                <section className='result'>
                    {result}
                </section>
            </div>
        </div>
    );
}

export default Task;