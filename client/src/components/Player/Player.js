import React, {useMemo} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";
const classNames = require('classnames');

const Player = ({active, name, score, cardsState, isLose}) => {

    const cards = useMemo(() => {
        const cardsArray = [];
        for (let i = 0; i < cardsState.length; i++) {
            cardsArray.push(<PlayerCard
                key={i}
                name={cardsState[i].name}
                suit={cardsState[i].suit}
            />)
        }
        return cardsArray;
    },[cardsState]);

    return (
        <div className={classNames('player', {player_active: active, player_lose: isLose})}>
            <div className="player__info">
                <p className="player__name">{name}</p>
                <p className="player__score">{score}</p>
            </div>
            <div className="cards">{cards}</div>
        </div>
    );
};

export default Player;