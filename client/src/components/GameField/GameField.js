import React, {useEffect} from 'react';
import Player from "../Player/Player";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const GameField = ({gameState, getGameState}) => {

    useEffect(() => {
        getGameState()
    }, []);


    return (
        <main className="game-field">
            <LoadingSpinner visible={!gameState}/>
            {gameState && gameState.players.map((player) => (
                <Player
                    key={player.id}
                    cardsState={player.cards}
                    name={player.name}
                    score={player.score}
                    isLose={player.isLose}
                    active={gameState.acitvePlayerId === player.id}
                />
            ))}
        </main>
    );
};

export default GameField;