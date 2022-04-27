import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import GameField from "./GameField";
import {gameState} from "../../store/game/selectors";
import {getGameState} from "../../store/game/actions";

const mapDispatchToProps = {
    getGameState
}

const mapStateToProps = createStructuredSelector({
    gameState
});

export default connect(mapStateToProps, mapDispatchToProps)(GameField);