import { useContext, useEffect } from "react";
import { SettingsContext } from "../../SettingsContext";
import EventFeed from "./EventFeed";

const Game = () => {
    const { settings, setSettings } = useContext(SettingsContext);

    useEffect(() => {
        console.log(settings)
    }, []);

    return (
        <div className="page">
            <EventFeed></EventFeed>
        </div>
     );
}

export default Game;