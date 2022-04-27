import React from 'react';

const LoadingSpinner = ({diplay}) => {
    return (
        <div className="lds-ring__wrapper" style={diplay}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default LoadingSpinner;