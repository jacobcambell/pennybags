import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { SettingsContext } from "../../SettingsContext";
import Balance from "./Balance";
import EventFeed from "./EventFeed";
import PlayerList from "./PlayerList";

const Game = () => {
    const { socket } = useContext(SettingsContext);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('player_name') === null || localStorage.getItem('room_name') === null) {
            history.push('/');
        }
    }, []);

    return (
        <div className="page">
            <EventFeed></EventFeed>
            <Balance></Balance>
            <PlayerList></PlayerList>
        </div>
    );
}

export default Game;