import React, { useState, useRef, useEffect } from 'react';
import DropDownArrowImage from "../assets/icons/arrow_down.png";
import './CodeEditor.css';
import './LanguageSelector.css';


function LanguageSelector({ languages, currentLanguage, setCurrentLanguage, setWarpLanguage }) {

    const [modalOpen, setModalOpen] = useState(false);
    const menuRef = useRef(null);

    // Закрытие выпадающего списка при клике вне него
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (language) => {
        setCurrentLanguage(language.name.toLowerCase());
        setWarpLanguage(language.warp);
        setModalOpen(false);
    };

    return (
        <menu className="dropdown__menu" ref={menuRef}>
            <article className="menu__article" onClick={() => setModalOpen(!modalOpen)}>
                <span className="menu__title">{currentLanguage}</span>
                <img
                    src={DropDownArrowImage}
                    alt="Раскрыть список"
                    className={modalOpen ? 'dropdown__arrow dropdown__arrow--active' : 'dropdown__arrow'}
                    width="15"
                />
            </article>

            {modalOpen && (
                <ul className="menu__list">
                    {languages.map((language) => (
                        <li
                            key={language.id}
                            className="list__item"
                            onClick={() => handleLanguageChange(language)}
                        >
                            {language.name}
                        </li>
                    ))}
                </ul>
            )}
        </menu>
    );
}

export default LanguageSelector;