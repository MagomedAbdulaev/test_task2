import React from 'react';

function TaskInfo({ task }) {
    return (
        <section className="task__info">
            <h1 className="task__title">{task.name}</h1>
            <span className={`difficulty difficulty--${task.difficulty_class}`}>{task.difficulty}</span>
            <p className="task__description">{task.description}</p>
        </section>
    );
}

export default TaskInfo;