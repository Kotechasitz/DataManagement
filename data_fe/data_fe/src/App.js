import "./App.css";
import SignUp from "./Pages/Signup";
import Main from "./Pages/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import EditPage from "./Pages/EditPage";
import { ToastProvider } from "react-toast-notifications";
import Signin from "./Pages/Signin";

function App() {

  return (
    <ToastProvider placement="top-center" autoDismiss autoDismissTimeout={3000}>
      <BrowserRouter>
        <Switch>
          <Router>
            <Route
              path="/"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} exact>
                    <Signin />
                  </Route>
                  <Route path={`${url}signup`}>
                    <SignUp />
                  </Route>
                </>
              )}
            ></Route>
            <Route
              path="/main"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} exact>
                    <Main />
                  </Route>
                  <Route path={`${url}/create`}>
                    <CreatePage />
                  </Route>
                  <Route path={`${url}/edit/:id`}>
                    <EditPage />
                  </Route>
                </>
              )}
            ></Route>
          </Router>
        </Switch>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
