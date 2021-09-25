import { useContext, useEffect } from "react";
import { SettingsContext } from "../../SettingsContext";

const Game = () => {
    const { settings, setSettings } = useContext(SettingsContext);

    useEffect(() => {
        console.log(settings)
    }, []);
    return (
        <div className="page">
            game
        </div>
     );
}

export default Game;