import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { SettingsContext } from "../../SettingsContext";
import Balance from "./Balance";
import EventFeed from "./EventFeed";

const Game = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const history = useHistory();

    useEffect(() => {
        if (
            settings.player_name === null ||
            settings.room_name === null
        ) {
            history.push('/');
        }
    }, []);

    return (
        <div className="page">
            <EventFeed></EventFeed>
            <Balance></Balance>
        </div>
    );
}

export default Game;