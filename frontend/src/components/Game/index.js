import { useContext, useEffect } from "react";
import { SettingsContext } from "../../SettingsContext";
import Balance from "./Balance";
import EventFeed from "./EventFeed";

const Game = () => {
    const { settings, setSettings } = useContext(SettingsContext);

    return (
        <div className="page">
            <EventFeed></EventFeed>
            <Balance></Balance>
        </div>
     );
}

export default Game;