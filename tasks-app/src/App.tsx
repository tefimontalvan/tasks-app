import React from "react";
import { Provider } from "react-redux";
import TaksPage from "./pages/tasks/TaksPage";
import EditTaskPage from "./pages/tasks/EditTaskPage";
import store from "./store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <Switch>
              <Route exact path="/" component={TaksPage} />
              <Route exact path="/task/:id" component={EditTaskPage} />
            </Switch>
          </div>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
