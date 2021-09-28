import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { SettingsContext } from "../../SettingsContext";
import Balance from "./Balance";
import EventFeed from "./EventFeed";
import PlayerList from "./PlayerList";

const Game = () => {
    const { socket } = useContext(SettingsContext);
    const history = useHistory();

    return (
        <div className="page">
            <EventFeed></EventFeed>
            <Balance></Balance>
            <PlayerList></PlayerList>
        </div>
    );
}

export default Game;