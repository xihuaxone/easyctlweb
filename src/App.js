import './App.css';
import "./constants/defaultStyles.css";

import RouterConfig from "./router/router";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={"imgs/rem.jpg"} className="App-logo" alt="logo" />*/}
      {/*</header>*/}
      <RouterConfig></RouterConfig>
    </div>
  );
}

export default App;
