import React, {useMemo} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";

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
    const playerActiveClasses = useMemo(() => active ? 'player player_active' : 'player', [active, isLose]);
    const playerClasses = useMemo(() => isLose ? 'player player_lose' : playerActiveClasses, [active, isLose]);

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