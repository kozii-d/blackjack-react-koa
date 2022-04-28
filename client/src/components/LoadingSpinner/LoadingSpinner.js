import React from 'react';

const LoadingSpinner = ({visible}) => {

    return (
        <div className="lds-ring__wrapper" style={{display: visible ? 'flex' : 'none' }}>
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