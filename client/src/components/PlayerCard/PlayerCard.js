import React, {useMemo} from 'react';

const PlayerCard = ({name, suit}) => {

    const redColor = useMemo(() => {
        return suit === '♥' || suit === '♦' ? {color: 'red'} : null
    }, [suit]);

    return (
        <div className="card" style={redColor}>
            <div className="card__info">
                <p className="card__name">{name}</p>
                <p className="card__suit">{suit}</p>
            </div>
            <div className="card__info_bottom">
                <p className="card__name">{name}</p>
                <p className="card__suit">{suit}</p>
            </div>
        </div>
    );
};

export default PlayerCard;