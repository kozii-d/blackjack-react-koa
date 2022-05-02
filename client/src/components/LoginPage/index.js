import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import LoginPage from "./LoginPage";
import {gameState, token} from "../../store/game/selectors";
import {getGameState, getToken} from "../../store/game/actions";

const mapDispatchToProps = {
    getGameState,
    getToken
}

const mapStateToProps = createStructuredSelector({
    gameState,
    token
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);