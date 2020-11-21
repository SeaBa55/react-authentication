import React from "react";
import { useAuth } from "../../components/UserAuth";
import history from "../../utils/history";
import useSound from 'use-sound';
import soundEnums from '../../SpriteEnums.js';
import { useSfx } from "../../components/SoundSuite/index";

function Rules() {

    let auth = useAuth();
    const sfx = useSfx();

    const userAuthState = () => {
        auth.signinGuest(() => { history.push("/game") });
    };
    
    return (
        <>
            <div className="display-4 mb-1">
                Rules
            </div>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    sfx.sfxSound('pop');
                    history.push("/login");
                }}
            >
                Login
            </button>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    sfx.sfxSound('pop');
                    history.push("/signup");
                }}
            >
                Sign Up
            </button>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    sfx.sfxSound('pop');
                    userAuthState();
                }}
            >
                Guest
            </button>
        </>
    );
};
  
export default Rules