import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import Modal from "./Modal";
import {gameState} from "../../store/game/selectors";
import {updateGame} from "../../store/game/actions";

const mapDispatchToProps = {
    updateGame
}

const mapStateToProps = createStructuredSelector({
    gameState
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);