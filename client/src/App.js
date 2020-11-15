import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import UserAuth from "./components/UserAuth/index"
import PrivateRoute from "./components/PrivateRoute/index"
import PreventReverse from "./components/PreventReverse/index";
import history from "./utils/history";
import Rules from "./pages/Rules/index"
import Login from "./pages/Login/index";
import SignUp from "./pages/SignUp/index";
import Game from "./pages/Game/index";

function App() {

  return (
    <UserAuth>
      <div className="container h-100 d-flex justify-content-center">
        <div className="jumbotron my-auto">
            <Router history={history}>
              <Switch>
                
                <PreventReverse path="/" exact>
                  <Rules/>
                </PreventReverse>

                <PreventReverse path="/login">
                  <Login />
                </PreventReverse>

                <PreventReverse path="/signup">
                  <SignUp />
                </PreventReverse>

                <PrivateRoute path="/game">
                  <Game />
                </PrivateRoute>

              </Switch>
            </Router>
        </div>
      </div>
    </UserAuth>
  );
}

export default App;
