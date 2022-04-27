import React, {useMemo} from 'react';

const Modal = ({gameState, restart}) => {

    const winnerText = useMemo(() => {
        if (!gameState) {
            return;
        }

        switch (gameState.winners.length) {
            case 0:
                return 'Nobody win!';

            case 1:
                return `${gameState.winners[0].name} win!`;

            default:
                return `Draw!`
        }
    }, [gameState]);

    const modalStyles = useMemo(() => {
        if (!gameState) {
            return;
        }

        return gameState.isEndGame ? {display: 'block'} : {display: 'none'}
    }, [gameState]);

    return (
        <div className="modal" style={modalStyles}>
            <div className="modal__dialog">
                <div className="modal__content">
                    <h2 className="modal__winner">{winnerText}</h2>
                    <button className="modal__btn" onClick={restart}>Play again</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;