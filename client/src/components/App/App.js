import React, {Fragment, useEffect} from 'react';
import {useNavigate, Route, Routes} from "react-router-dom";

import GameField from "../GameField";
import GameMenu from "../GameMenu";
import Modal from "../Modal";
import LoginPage from "../LoginPage";

const App = ({token}) => {

    let navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate('/game');
        } else {
            navigate('/login');
        }
    }, [token])

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <GameField/>
                        <GameMenu/>
                        <Modal/>
                    </Fragment>
                }/>
                <Route path="/game" element={
                    <Fragment>
                        <GameField/>
                        <GameMenu/>
                        <Modal/>
                    </Fragment>
                }/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </Fragment>

    )
}

export default App;