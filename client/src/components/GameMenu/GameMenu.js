import React from 'react';

const GameMenu = ({hit, stand}) => {

    return (
        <aside className="game-menu">
            <div className="game-menu__card"></div>
            <button className="game-menu__btn" id="hit" onClick={hit}>Hit</button>
            <button className="game-menu__btn" id="stand" onClick={stand}>Stand</button>
        </aside>
    );
};

export default GameMenu;