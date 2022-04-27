import React, {useEffect, useMemo} from 'react';
import Player from "../Player/Player";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const GameField = ({gameState, getGameState}) => {

    useEffect(() => {
        getGameState()
    }, []);

    const players = useMemo(() => {
        if (!gameState) {
            return;
        }
        const playersArray = [];
        const playersState = gameState.players;
        const acitvePlayerId = gameState.acitvePlayerId
        for (let i = 0; i < playersState.length; i++) {
            playersArray.push(<Player
                key={playersState[i].id}
                id={playersState[i].id}
                cardsState={playersState[i].cards}
                name={playersState[i].name}
                score={playersState[i].score}
                isLose={playersState[i].isLose}
                acitvePlayerId={acitvePlayerId}
            />)
        }
        return playersArray;
    }, [gameState])

    const spinnerView = useMemo(() => players ? {display: 'none'} : {display: 'flex'}, [players]);

    return (
        <main className="game-field">
            <LoadingSpinner diplay={spinnerView}/>
            {players}
        </main>
    );
};

export default GameField;