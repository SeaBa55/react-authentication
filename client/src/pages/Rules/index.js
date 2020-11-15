import React from "react";
import { useAuth } from "../../components/UserAuth";
import history from "../../utils/history";

function Rules() {

    let auth = useAuth()

    const userAuthState = () => {
        auth.signinGuest(() => { history.push("/game") })
    };

    return (
        <>
            <div className="display-4 mb-1">
                Rules
            </div>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={() => {
                    history.push("/login");
                }}
            >
                Login
            </button>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={() => {
                    history.push("/signup");
                }}
            >
                Sign Up
            </button>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={userAuthState}
            >
                Guest
            </button>
        </>
    );
};
  
export default Rules