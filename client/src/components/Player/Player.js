import React, {useMemo} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";

const Player = ({id, acitvePlayerId, name, score, cardsState, isLose}) => {

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
    const isActive = useMemo(() => acitvePlayerId === id,[acitvePlayerId]);
    const playerActiveClasses = useMemo(() => isActive ? 'player player_active' : 'player', [acitvePlayerId]);
    const playerClasses = useMemo(() => isLose ? 'player player_lose' : playerActiveClasses, [acitvePlayerId]);

    return (
        <div className={playerClasses}>
            <div className="player__info">
                <p className="player__name">{name}</p>
                <p className="player__score">{score}</p>
            </div>
            <div className="cards">{cards}</div>
        </div>
    );
};

export default Player;