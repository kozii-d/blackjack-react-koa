import React, {Fragment} from 'react';

import GameField from "../GameField";
import GameMenu from "../GameMenu";
import Modal from "../Modal";

const App = () => {

    return (
        <Fragment>
            <GameField/>
            <GameMenu/>
            <Modal/>
        </Fragment>
    )
}

export default App;