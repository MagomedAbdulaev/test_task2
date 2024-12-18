import React, {useEffect, useState} from 'react';
import axios from "axios";
import HostBackend from "../../main.jsx";
import {Link} from "react-router-dom";
import './Home.css'


function Home(props) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        axios.get(`${HostBackend}tasks_list/`, )
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Ошибка запроса", error);
            });
    }, []);

    return (
        <>
            <table className="tasks__list">
                <thead className="list__header">
                    <tr className='list__item'>
                        <th className="header__item">Название</th>
                        <th className="header__item">Сложность</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item) => (
                        <tr className="list__item" key={item.id}>
                            <td>
                                <Link to={`task/${item.id}`} className="item__link item__name">
                                    {item.name}
                                </Link>
                            </td>
                            <td>
                                <span className={`link__difficulty difficulty--${item.difficulty_class}`}>{item.difficulty}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;