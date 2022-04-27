import React, {useEffect, useMemo} from 'react';
import Player from "../Player/Player";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const GameField = ({gameState, updateGame}) => {

    const getGameAndUpdateState = () => {
        axios.get('/game')
            .then(response => {
                updateGame(response.data)
            });
    }

    useEffect(() => {
        // updateGame()
        getGameAndUpdateState();
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

    return (
        <main className="game-field">
            {players ? players : <LoadingSpinner/>}
        </main>
    );
};

export default GameField;