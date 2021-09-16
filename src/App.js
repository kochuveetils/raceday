import "./App.css";
import Home from "./components/HomeComponent";

import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
