import React from "react";
import { useAuth } from "../../components/UserAuth";
import API from "../../utils/API"
import history from "../../utils/history";

function Game() {
    
    let auth = useAuth()

    const username = auth.user.data === null ? auth.user.auth : auth.user.data.username;
    const isGuest = auth.user.data === null ? true : false;
    
    const userLogout = (event) => {
        event.preventDefault();
        auth.logout(() => { history.push("/") })
    };

    const handleDelete = (event) => {
        event.preventDefault();
        const id = auth.user.data._id;
        API.deleteUser(id)
            .then((res) => {
              console.log(res.data)
              auth.logout(() => { history.push("/") })
            })
    };

    return (
        <>
            <div className="display-4 mb-1">
                Game Page: { username }
            </div>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={userLogout}
            >
                {auth.user.auth === "user" ? "Exit" : "Exit without Save" }
            </button>

            <button
                className="btn btn-info btn-block"
                type="button"
            >
                Save
            </button>

            <button
                className="btn btn-info btn-block"
                type="button"
                onClick={handleDelete}
                disabled={isGuest}
            >
                Delete Account
            </button>
        </>
    );
}
  
export default Game;